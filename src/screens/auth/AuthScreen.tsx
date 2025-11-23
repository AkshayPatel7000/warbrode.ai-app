import React, { useState, useCallback } from 'react';
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
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MotiView } from 'moti';

import { AuthButton, AuthInput, SocialButton } from '../../components/auth';
import { AuthStackParamList } from '../../navigation/types';
import Container from '../../components/Container';
import { showSuccessToast, showErrorToast } from '../../utils/toast';

type AuthMode = 'login' | 'signup';

// Validation Schemas
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const AuthScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [mode, setMode] = useState<AuthMode>('login');
  const [toggleWidth, setToggleWidth] = useState(0);

  const handleModeChange = useCallback((newMode: AuthMode) => {
    setMode(newMode);
  }, []);

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
    // TODO: Implement Google Sign-In
  };

  const handleForgotPassword = () => {
    try {
      navigation.navigate('ForgotPassword');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleAuthSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'login') {
        showSuccessToast('Welcome back!', 'Successfully logged in');
      } else {
        showSuccessToast('Account Created', 'Welcome to WardrobeAI!');
      }

      // Navigate to main app
      if (navigation) {
        // @ts-ignore - Navigate to root stack
        navigation.getParent()?.replace('MainTabs');
      }
    } catch (error) {
      showErrorToast(
        'Authentication Failed',
        'Please check your credentials and try again',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={0}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
                  onLayout={e => setToggleWidth(e.nativeEvent.layout.width)}
                >
                  {toggleWidth > 0 && (
                    <MotiView
                      from={{ translateX: 0 }}
                      animate={{
                        translateX:
                          mode === 'login' ? 0 : (toggleWidth - 8) / 2,
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
                    onPress={() => handleModeChange('login')}
                  >
                    <Text
                      className={
                        mode === 'login'
                          ? 'text-sm text-slate-900 font-medium'
                          : 'text-sm text-slate-500'
                      }
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 py-2 rounded-full items-center z-10"
                    onPress={() => handleModeChange('signup')}
                  >
                    <Text
                      className={
                        mode === 'signup'
                          ? 'text-sm text-slate-900 font-medium'
                          : 'text-sm text-slate-500'
                      }
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Formik Form */}
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={
                    mode === 'login' ? loginSchema : signupSchema
                  }
                  onSubmit={handleAuthSubmit}
                  key={mode} // Reset form when mode changes
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <>
                      {/* Form Fields */}
                      <View className="space-y-3 gap-4">
                        {mode === 'signup' && (
                          <AuthInput
                            label="Name"
                            placeholder="John Doe"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            error={
                              touched.name && errors.name
                                ? errors.name
                                : undefined
                            }
                          />
                        )}

                        <AuthInput
                          label="Email"
                          placeholder="you@example.com"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          keyboardType="email-address"
                          error={
                            touched.email && errors.email
                              ? errors.email
                              : undefined
                          }
                        />

                        <AuthInput
                          label="Password"
                          placeholder="••••••••"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          secure
                          error={
                            touched.password && errors.password
                              ? errors.password
                              : undefined
                          }
                        />

                        {mode === 'signup' && (
                          <AuthInput
                            label="Confirm Password"
                            placeholder="••••••••"
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            secure
                            error={
                              touched.confirmPassword && errors.confirmPassword
                                ? errors.confirmPassword
                                : undefined
                            }
                          />
                        )}

                        {mode === 'login' && (
                          <TouchableOpacity
                            onPress={handleForgotPassword}
                            className="self-end"
                          >
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
                          onPress={() => handleSubmit()}
                          loading={isSubmitting}
                        />
                      </View>
                    </>
                  )}
                </Formik>

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
                onPress={() =>
                  handleModeChange(mode === 'login' ? 'signup' : 'login')
                }
                className="mt-3 items-center pb-6 "
              >
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
