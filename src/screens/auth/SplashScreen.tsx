import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { Sparkles } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../../hooks/useRedux';
import Container from '../../components/Container';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    // Simulate token check and navigate after 2 seconds
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('Onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 800 }}
        style={styles.content}
      >
        {/* Logo Circle with Gradient */}
        <LinearGradient
          colors={['#d9f99d', '#a3e635']} // lime-200 to lime-400
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoCircle}
        >
          <Sparkles size={40} color="#ffffff" />
        </LinearGradient>

        <Text style={styles.appName}>WardrobeAI</Text>
        <Text style={styles.subtitle}>Your AI-powered fashion assistant</Text>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f8fafc', // slate-50
  },
  content: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  appName: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a', // slate-900
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748b', // slate-500
  },
});

export default SplashScreen;
