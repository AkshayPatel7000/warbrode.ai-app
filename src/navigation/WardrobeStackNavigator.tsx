import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WardrobeStackParamList } from './types';
import WardrobeScreen from '../screens/WardrobeScreen';
import ClothingDetailsScreen from '../screens/ClothingDetailsScreen';

const Stack = createNativeStackNavigator<WardrobeStackParamList>();

const WardrobeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WardrobeMain" component={WardrobeScreen} />
      <Stack.Screen name="ClothingDetails" component={ClothingDetailsScreen} />
    </Stack.Navigator>
  );
};

export default WardrobeStackNavigator;
