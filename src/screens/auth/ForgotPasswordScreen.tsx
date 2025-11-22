import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthButton, AuthInput, AuthCard } from '../../components/auth';
import Container from '../../components/Container';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendResetLink = async () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleResend = () => {
    setSuccess(false);
    setEmail('');
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            {success
              ? 'Check your email for a reset link'
              : 'Enter your email to receive a password reset link'}
          </Text>

          <AuthCard className={"mt-6 gap-4"}>
            {!success ? (
              <View className='gap-3'>
                <AuthInput
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  error={error}
                />
                <AuthButton
                  variant="primary"
                  label="Send reset link"
                  onPress={handleSendResetLink}
                  loading={loading}
                />
              </View>
            ) : (
              <View style={styles.successContent}>
                <Text style={styles.successText}>
                  We've sent a password reset link to{' '}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>
                <Text style={styles.checkEmailText}>
                  Please check your email and follow the instructions to reset
                  your password.
                </Text>

                <View style={styles.successButtons}>
                  <AuthButton
                    variant="outline"
                    label="Resend"
                    onPress={handleResend}
                  />
                  <AuthButton
                    variant="primary"
                    label="Back to login"
                    onPress={handleBackToLogin}
                  />
                </View>
              </View>
            )}
          </AuthCard>
        </View>
      </SafeAreaView>
    </Container>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a', // slate-900
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748b', // slate-500
  },
  card: {
    marginTop: 16,
    gap: 16,
  },
  successContent: {
    gap: 12,
  },
  successText: {
    fontSize: 14,
    color: '#0f172a', // slate-900
    lineHeight: 20,
  },
  emailText: {
    fontWeight: '600',
    color: '#4f46e5', // indigo-600
  },
  checkEmailText: {
    fontSize: 13,
    color: '#64748b', // slate-500
    lineHeight: 18,
  },
  successButtons: {
    marginTop: 8,
    gap: 12,
  },
});

export default ForgotPasswordScreen;
