import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Shirt, Footprints, Upload, Sparkles, History } from 'lucide-react-native';
import {
  HomeHeader,
  OutfitCard,
  WeatherCard,
  StatCard,
  QuickActionButton,
  AITipCard,
} from '../components/home';
import { HomeScreenSkeleton } from '../components/home/HomeScreenSkeleton';
import Container from '../components/Container';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherPermissionDenied, setWeatherPermissionDenied] = useState(false);

  // Mock data - replace with actual data from Redux/API
  const wardrobeStats = {
    tops: 124,
    bottoms: 58,
    shoes: 32,
  };

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  const handleRequestWeatherPermission = () => {
    // TODO: Implement actual permission request
    console.log('Request weather permission');
    // For now, just toggle the state
    setWeatherPermissionDenied(false);
  };

  if (isLoading) {
    return (
      <Container pt={0}>
        <View className="flex-1">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <HomeScreenSkeleton />
          </ScrollView>
        </View>
      </Container>
    );
  }

  return (
    <Container pt={0}>
      <View className="flex-1 ">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <HomeHeader
            userName="John"
            onNotificationPress={() => console.log('Notifications')}
            notificationCount={3}
          />

          {/* Today's Outfit Card */}
          <OutfitCard
            outfitTitle="Casual Day Out"
            onViewOutfit={() => console.log('View Outfit')}
          />

          {/* Weather Card */}
          <WeatherCard
            temperature={21}
            condition="sunny"
            onPress={() => console.log('Weather Details')}
            permissionDenied={weatherPermissionDenied}
            onRequestPermission={handleRequestWeatherPermission}
          />

          {/* Wardrobe Stats Section */}
          <View className="px-5 mt-6">
            <View className="flex-row gap-3">
              <StatCard
                icon={Shirt}
                count={wardrobeStats.tops}
                label="Tops"
                iconBgColor="#fef3c7"
                iconColor="#f59e0b"
              />
              <StatCard
                icon={Shirt}
                count={wardrobeStats.bottoms}
                label="Bottoms"
                iconBgColor="#dbeafe"
                iconColor="#3b82f6"
              />
              <StatCard
                icon={Footprints}
                count={wardrobeStats.shoes}
                label="Shoes"
                iconBgColor="#fce7f3"
                iconColor="#ec4899"
              />
            </View>
          </View>

          {/* Quick Action Buttons */}
          <View className="px-5 mt-6">
            <View className="flex-row gap-3">
              <QuickActionButton
                icon={Upload}
                label="Upload"
                onPress={() => console.log('Upload')}
                variant="secondary"
              />
              <QuickActionButton
                icon={Sparkles}
                label="Generate"
                onPress={() => console.log('Generate')}
                variant="primary"
              />
              <QuickActionButton
                icon={History}
                label="History"
                onPress={() => console.log('History')}
                variant="secondary"
              />
            </View>
          </View>

          {/* AI Tip Section */}
          <AITipCard tip="Try mixing your neutral tops with colorful bottoms for a fresh look!" />

          {/* Bottom Padding for Tab Bar */}
          <View className="h-24" />
        </ScrollView>
      </View>
    </Container>

  );
};

export default HomeScreen;


