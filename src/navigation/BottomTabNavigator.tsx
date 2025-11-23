import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Plus, Sparkles, ShoppingBag, User } from 'lucide-react-native';
import React from 'react';
import CustomTabBar from '../components/CustomTabBar';
import { BottomTabParamList } from './types';

// Import screens
import OutfitGeneratorScreen from '../screens/OutfitGeneratorScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import CreateStackNavigator from './CreateStackNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="OutfitGenerator"
        component={OutfitGeneratorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Sparkles color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Plus color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
