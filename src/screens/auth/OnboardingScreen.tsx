import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import OnboardingCarousel from '../../components/auth/OnboardingCarousel';
import Container from '../../components/Container';

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

  const slides = [
    {
      id: '1',
      title: 'Upload Your Clothes',
      description:
        'Easily add your wardrobe items with photos and let AI organize them for you.',
    },
    {
      id: '2',
      title: 'Get AI Daily Outfits',
      description:
        'Receive personalized outfit suggestions based on weather, occasion, and your style.',
    },
    {
      id: '3',
      title: 'Smart Suggestions',
      description:
        'Allow camera & photos access to get the best experience with AI-powered recommendations.',
    },
  ];

  const handleSkip = () => {
    navigation.replace('Auth');
  };

  const handleDone = () => {
    navigation.replace('Auth');
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        {/* Gradient Header */}


        {/* Content Area */}
        <View style={styles.content} >
          <OnboardingCarousel
            slides={slides}
            onSkip={handleSkip}
            onDone={handleDone}
          />
        </View>
      </SafeAreaView>
    </Container>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 160,
    overflow: 'hidden',
  },
  gradient: {
    height: 160,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    flex: 1,

  },
});

export default OnboardingScreen;
