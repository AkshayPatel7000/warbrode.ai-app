import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthButton, AuthInput, AuthCard, SocialButton } from '../../components/auth';
import { AuthStackParamList } from '../../navigation/types';

import LinearGradient from 'react-native-linear-gradient';
import Container from '../../components/Container';

import { MotiView } from 'moti';

type AuthMode = 'login' | 'signup';

const AuthScreen = () => {
  // Safe navigation hook - handle case where context might not be available
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const [mode, setMode] = useState('login');
  const [toggleWidth, setToggleWidth] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Memoize mode change to prevent navigation issues
  const handleModeChange = useCallback((newMode: AuthMode) => {
    setMode(newMode);
    setErrors({}); // Clear errors when switching modes
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (mode === 'signup' && !name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (!navigation) return;
      try {
        // @ts-ignore - Navigate to root stack
        navigation.getParent()?.replace('MainTabs');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
  };

  const handleForgotPassword = () => {
    try {
      navigation.navigate('ForgotPassword');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <Container>
      <SafeAreaView className="flex-1 ">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={0}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>





            {/* Content */}
            <View className="flex-1 px-5">
              <Text className="text-2xl font-bold text-slate-900">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </Text>
              <Text className="mt-1 text-sm text-slate-600">
                {mode === 'login'
                  ? 'Sign in to continue to your wardrobe'
                  : 'Sign up to get started with WardrobeAI'}
              </Text>
              {/* Auth Card */}
              <View className="mt-4 bg-white rounded-3xl p-5 shadow-lg space-y-4 gap-4">
                {/* Toggle Pills */}
                <View
                  className="flex-row bg-slate-100 rounded-full p-1 relative"
                  onLayout={(e) => setToggleWidth(e.nativeEvent.layout.width)}
                >
                  {toggleWidth > 0 && (
                    <MotiView
                      from={{ translateX: 0 }}
                      animate={{
                        translateX: mode === 'login' ? 0 : (toggleWidth - 8) / 2
                      }}
                      transition={{ type: 'timing', duration: 250 }}
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        width: (toggleWidth - 8) / 2,
                        height: '100%',
                        backgroundColor: 'white',
                        borderRadius: 9999,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                      }}
                    />
                  )}
                  <TouchableOpacity
                    className="flex-1 py-2 rounded-full items-center z-10"
                    onPress={() => handleModeChange('login')}>
                    <Text
                      className={mode === 'login' ? 'text-sm text-slate-900 font-medium' : 'text-sm text-slate-500'}>
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 py-2 rounded-full items-center z-10"
                    onPress={() => handleModeChange('signup')}>
                    <Text
                      className={mode === 'signup' ? 'text-sm text-slate-900 font-medium' : 'text-sm text-slate-500'}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Form Fields */}
                <View className="space-y-3 gap-4">
                  {mode === 'signup' && (
                    <AuthInput
                      label="Name"
                      placeholder="John Doe"
                      value={name}
                      onChangeText={setName}
                      error={errors.name}
                    />
                  )}

                  <AuthInput
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    error={errors.email}
                  />

                  <AuthInput
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secure
                    error={errors.password}
                  />

                  {mode === 'signup' && (
                    <AuthInput
                      label="Confirm Password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secure
                      error={errors.confirmPassword}
                    />
                  )}

                  {mode === 'login' && (
                    <TouchableOpacity
                      onPress={handleForgotPassword}
                      className="self-end">
                      <Text className="text-xs text-slate-500">
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Submit Button */}
                <View className="mt-2">
                  <AuthButton
                    variant="primary"
                    label={mode === 'login' ? 'Login' : 'Sign Up'}
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>

                {/* Divider */}
                <View className="flex-row items-center my-3">
                  <View className="flex-1 h-px bg-slate-200" />
                  <Text className="mx-2 text-xs text-slate-400">
                    or continue with
                  </Text>
                  <View className="flex-1 h-px bg-slate-200" />
                </View>

                {/* Social Login */}
                <SocialButton
                  provider="google"
                  label="Continue with Google"
                  onPress={handleGoogleSignIn}
                />
              </View>

              {/* Bottom Link */}
              <TouchableOpacity
                onPress={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}
                className="mt-3 items-center pb-6 ">

                <Text className="text-xs text-slate-500">
                  {mode === 'login'
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <Text className="font-semibold text-slate-900">
                    {mode === 'login' ? 'Sign up' : 'Login'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

    </Container>

  );
};

export default AuthScreen;
