import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import {
  Shirt,
  Footprints,
  Upload,
  Sparkles,
  History,
} from 'lucide-react-native';
import { useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
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
import ApiService from '../services/api.service';
import type { DashboardResponse } from '../types/api.types';
import type { ApiErrorExtended } from '../types/error.types';
import type { RootState } from '../store';
import { showErrorToast } from '../utils/toast';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null,
  );
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState<string>('unknown');

  // Get user from Redux
  const user = useSelector((state: RootState) => state.user.currentUser);

  /**
   * Load dashboard data from API
   */
  const loadDashboard = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      }

      const response = await ApiService.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      const apiError = error as ApiErrorExtended;
      console.error('Failed to load dashboard:', apiError);

      showErrorToast(
        'Failed to Load Dashboard',
        apiError.userMessage || 'Please try again later',
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  /**
   * Check location permission status
   */
  const checkLocationPermission = useCallback(async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) return;

      const result = await check(permission);
      setLocationPermissionStatus(result);

      return result;
    } catch (error) {
      console.error('Error checking location permission:', error);
      return RESULTS.UNAVAILABLE;
    }
  }, []);

  /**
   * Request location permission
   */
  const requestLocationPermission = useCallback(async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        Alert.alert(
          'Error',
          'Location permission not available on this platform',
        );
        return false;
      }

      const result = await request(permission);
      setLocationPermissionStatus(result);

      if (result === RESULTS.GRANTED) {
        // Permission granted, reload dashboard to get weather
        loadDashboard(false);
        return true;
      } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(
          'Location Permission Required',
          'Please enable location permission in your device settings to see weather information.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                // TODO: Open app settings
                console.log('Open settings');
              },
            },
          ],
        );
        return false;
      }

      return false;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert('Error', 'Failed to request location permission');
      return false;
    }
  }, [loadDashboard]);

  /**
   * Handle pull-to-refresh
   */
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadDashboard(false);
  }, [loadDashboard]);

  /**
   * Initial load
   */
  useEffect(() => {
    loadDashboard();
    checkLocationPermission();
  }, [loadDashboard, checkLocationPermission]);

  /**
   * Handle quick actions
   */
  const handleUpload = () => {
    console.log('Navigate to upload screen');
    // TODO: Navigate to upload screen
  };

  const handleGenerate = () => {
    console.log('Navigate to generate outfit screen');
    // TODO: Navigate to generate outfit screen
  };

  const handleHistory = () => {
    console.log('Navigate to history screen');
    // TODO: Navigate to history screen
  };

  const handleViewOutfit = () => {
    if (dashboardData?.todayOutfit) {
      console.log('View outfit:', dashboardData.todayOutfit.id);
      // TODO: Navigate to outfit details
    }
  };

  const handleWeatherPress = () => {
    console.log('View weather details');
    // TODO: Navigate to weather details or show more info
  };

  const handleNotificationPress = () => {
    console.log('Open notifications');
    // TODO: Navigate to notifications screen
  };

  // Show loading skeleton
  if (isLoading) {
    return (
      <Container pt={10}>
        <View className="flex-1">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <HomeScreenSkeleton />
          </ScrollView>
        </View>
      </Container>
    );
  }

  // Check if we have dashboard data
  if (!dashboardData) {
    return (
      <Container pt={10}>
        <View className="flex-1 items-center justify-center">
          {/* TODO: Add error state UI */}
        </View>
      </Container>
    );
  }

  const isLocationPermissionDenied =
    locationPermissionStatus === RESULTS.DENIED ||
    locationPermissionStatus === RESULTS.BLOCKED;

  return (
    <Container pt={10}>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#6366f1"
              colors={['#6366f1']}
            />
          }
        >
          {/* Header Section */}
          <HomeHeader
            userName={dashboardData.user.name}
            userAvatar={dashboardData.user.avatar || undefined}
            onNotificationPress={handleNotificationPress}
            notificationCount={0} // TODO: Get from API or Redux
          />

          {/* Today's Outfit Card */}
          {dashboardData.todayOutfit ? (
            <OutfitCard
              outfitImage={dashboardData.todayOutfit.previewImage}
              outfitTitle="Today's Outfit"
              onViewOutfit={handleViewOutfit}
            />
          ) : (
            <OutfitCard
              outfitTitle="No Outfit Yet"
              onViewOutfit={handleGenerate}
            />
          )}

          {/* Weather Card */}
          <WeatherCard
            temperature={dashboardData.weather?.tempC}
            condition={getWeatherCondition(dashboardData.weather)}
            onPress={handleWeatherPress}
            permissionDenied={isLocationPermissionDenied}
            onRequestPermission={requestLocationPermission}
          />

          {/* Wardrobe Stats Section */}
          <View className="px-5 mt-6">
            <View className="flex-row gap-3">
              <StatCard
                icon={Shirt}
                count={dashboardData.wardrobeStats.tops}
                label="Tops"
                iconBgColor="#fef3c7"
                iconColor="#f59e0b"
              />
              <StatCard
                icon={Shirt}
                count={dashboardData.wardrobeStats.bottoms}
                label="Bottoms"
                iconBgColor="#dbeafe"
                iconColor="#3b82f6"
              />
              <StatCard
                icon={Footprints}
                count={dashboardData.wardrobeStats.footwear}
                label="Footwear"
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
                onPress={handleUpload}
                variant="secondary"
              />
              <QuickActionButton
                icon={Sparkles}
                label="Generate"
                onPress={handleGenerate}
                variant="primary"
              />
              <QuickActionButton
                icon={History}
                label="History"
                onPress={handleHistory}
                variant="secondary"
              />
            </View>
          </View>

          {/* AI Tip Section */}
          <AITipCard tip={dashboardData.aiTip} />

          {/* Bottom Padding for Tab Bar */}
          <View className="h-24" />
        </ScrollView>
      </View>
    </Container>
  );
};

/**
 * Helper function to determine weather condition
 */
const getWeatherCondition = (
  weather: { tempC: number; precipitation: number } | null,
): 'sunny' | 'cloudy' | 'rainy' => {
  if (!weather) return 'sunny';

  if (weather.precipitation > 0) {
    return 'rainy';
  } else if (weather.tempC < 15) {
    return 'cloudy';
  } else {
    return 'sunny';
  }
};

export default HomeScreen;
