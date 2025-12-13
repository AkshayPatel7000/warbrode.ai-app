import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAppSettings } from '../hooks/useAppSettings';

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * AppInitializer Component
 * Fetches app settings from Firestore before rendering the app
 */
const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const { settings, loading, error } = useAppSettings();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Settings loaded (success or error with fallback)
      setIsReady(true);
    }
  }, [loading]);

  // Show loading screen while fetching settings
  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text
          style={{
            marginTop: 16,
            fontSize: 14,
            color: '#64748b',
          }}
        >
          Loading app settings...
        </Text>
      </View>
    );
  }

  // Show error if settings failed to load (but still render app with defaults)
  if (error) {
    console.warn('⚠️ Settings loaded with defaults due to error:', error);
  }

  // Render app once settings are loaded
  return <>{children}</>;
};

export default AppInitializer;
