import {useAppDispatch, useAppSelector} from './useRedux';
import {setCredentials, logout as logoutAction} from '../store/slices/authSlice';
import {setUser, clearUser} from '../store/slices/userSlice';
import apiService from '../services/api.service';
import {API_ENDPOINTS} from '../constants/api';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  status: 'idle' | 'loading' | 'error' | 'authenticated';
  user: any | null;
  error: string | null;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const {isAuthenticated, error} = useAppSelector(state => state.auth);
  const {currentUser, loading} = useAppSelector(state => state.user);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      const {token, refreshToken, user} = response.data as {
        token: string;
        refreshToken: string;
        user: any;
      };

      dispatch(setCredentials({token, refreshToken}));
      dispatch(setUser(user));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, data);

      const {token, refreshToken, user} = response.data as {
        token: string;
        refreshToken: string;
        user: any;
      };

      dispatch(setCredentials({token, refreshToken}));
      dispatch(setUser(user));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Signup failed');
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Implement Google Sign-In logic here
      // This would typically use @react-native-google-signin/google-signin
      console.log('Google Sign-In not implemented yet');
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Google sign-in failed');
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    dispatch(clearUser());
  };

  const forgotPassword = async (email: string) => {
    try {
      await apiService.post('/auth/forgot-password', {email});
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || 'Password reset request failed',
      );
    }
  };

  const getStatus = (): 'idle' | 'loading' | 'error' | 'authenticated' => {
    if (loading) return 'loading';
    if (error) return 'error';
    if (isAuthenticated) return 'authenticated';
    return 'idle';
  };

  return {
    login,
    signup,
    loginWithGoogle,
    logout,
    forgotPassword,
    status: getStatus(),
    user: currentUser,
    error,
    isAuthenticated,
  };
};
