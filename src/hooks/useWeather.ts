import { useState, useEffect } from 'react';
import { Platform, PermissionStatus } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  location?: string;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  permissionStatus: 'granted' | 'denied' | 'not-determined';
  requestPermission: () => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'not-determined'>('not-determined');

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const { PermissionsAndroid } = require('react-native');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'WardrobeAI needs access to your location to provide weather-based outfit recommendations.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionStatus('granted');
          fetchWeather();
        } else {
          setPermissionStatus('denied');
          setError('Location permission denied');
          setLoading(false);
        }
      } else {
        // iOS - request permission through Geolocation
        Geolocation.requestAuthorization(
          () => {
            setPermissionStatus('granted');
            fetchWeather();
          },
          (error) => {
            setPermissionStatus('denied');
            setError('Location permission denied');
            setLoading(false);
          }
        );
      }
    } catch (err) {
      setError('Failed to request location permission');
      setLoading(false);
    }
  };

  const fetchWeather = () => {
    setLoading(true);
    setError(null);

    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // TODO: Replace with actual weather API call
          // For now, using mock data
          const mockWeather: WeatherData = {
            temperature: 21,
            condition: 'sunny',
            location: 'Current Location',
          };

          setWeather(mockWeather);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch weather data');
          setLoading(false);
        }
      },
      (error) => {
        setError('Failed to get location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    // Check initial permission status and fetch weather if already granted
    if (Platform.OS === 'android') {
      const { PermissionsAndroid } = require('react-native');
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((granted: boolean) => {
          if (granted) {
            setPermissionStatus('granted');
            fetchWeather();
          } else {
            setLoading(false);
          }
        });
    } else {
      // For iOS, try to get location and handle permission in callback
      Geolocation.getCurrentPosition(
        () => {
          setPermissionStatus('granted');
          fetchWeather();
        },
        () => {
          setLoading(false);
        },
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  }, []);

  return {
    weather,
    loading,
    error,
    permissionStatus,
    requestPermission,
  };
};
