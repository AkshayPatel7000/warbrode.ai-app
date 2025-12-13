import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '../config/firebase.config';

/**
 * Firebase Authentication Service
 * Handles Google Sign-In and Firestore operations
 */
class FirebaseAuthService {
  private initialized = false;

  /**
   * Initialize Google Sign-In
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
      });

      this.initialized = true;
      console.log('✅ Firebase Auth initialized');
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
      throw error;
    }
  }

  /**
   * Sign in with Google
   * Returns Firebase user and ID token
   */
  async signInWithGoogle(): Promise<{
    user: FirebaseAuthTypes.User;
    idToken: string;
  }> {
    try {
      await this.initialize();

      // Check Google Play Services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Sign in with Google
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token received from Google');
      }

      // Create Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase
      const userCredential =
        await auth().signInWithCredential(googleCredential);

      // Get Firebase ID token
      const firebaseIdToken = await userCredential.user.getIdToken();

      console.log('✅ Google Sign-In successful:', userCredential.user.email);

      return {
        user: userCredential.user,
        idToken: firebaseIdToken,
      };
    } catch (error: any) {
      console.error('❌ Google Sign-In error:', error);

      if (error.code === 'auth/account-exists-with-different-credential') {
        throw new Error('Account exists with different sign-in method');
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid credentials');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Google Sign-In is not enabled');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('User account has been disabled');
      } else if (error.code === '12501') {
        // User cancelled the sign-in
        throw new Error('Sign-in cancelled');
      }

      throw error;
    }
  }

  /**
   * Sign out from Firebase and Google
   */
  async signOut(): Promise<void> {
    try {
      await auth().signOut();

      // Always try to sign out from Google (it's safe even if not signed in)
      try {
        await GoogleSignin.signOut();
      } catch (googleSignOutError) {
        // Ignore error if user wasn't signed in with Google
        console.log('Google sign out skipped (not signed in)');
      }

      console.log('✅ Sign out successful');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      throw error;
    }
  }

  /**
   * Get current Firebase user
   */
  getCurrentUser(): FirebaseAuthTypes.User | null {
    return auth().currentUser;
  }

  /**
   * Get current user's ID token
   */
  async getCurrentUserIdToken(): Promise<string | null> {
    const user = this.getCurrentUser();
    if (!user) {
      return null;
    }
    return await user.getIdToken();
  }

  /**
   * Create or update user in Firestore
   */
  async saveUserToFirestore(
    userId: string,
    data: {
      email: string;
      name?: string;
      photoURL?: string;
      provider: 'google' | 'email';
    },
  ): Promise<void> {
    try {
      const userRef = firestore().collection('users').doc(userId);

      // Use set with merge to create or update
      await userRef.set(
        {
          ...data,
          updatedAt: firestore.FieldValue.serverTimestamp(),
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      console.log('✅ User saved to Firestore');
    } catch (error) {
      console.error('❌ Firestore error:', error);
      throw error;
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChanged(
    callback: (user: FirebaseAuthTypes.User | null) => void,
  ): () => void {
    return auth().onAuthStateChanged(callback);
  }
}

export default new FirebaseAuthService();
