import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  User,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  Edit2,
  HelpCircle,
  Mail,
  Shield,
  FileText,
  Trash2,
} from 'lucide-react-native';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { logout } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/Container';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { currentUser } = useAppSelector(state => state.user);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ],
      { cancelable: true },
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
            console.log('Delete account');
          },
        },
      ],
      { cancelable: true },
    );
  };

  const navigateToSettings = () => {
    // @ts-ignore - Navigation will be properly typed after adding to RootNavigator
    navigation.navigate('Settings');
  };

  const navigateToWardrobe = () => {
    // @ts-ignore
    navigation.navigate('Wardrobe');
  };

  const navigateToEditProfile = () => {
    // @ts-ignore
    navigation.navigate('EditProfile');
  };

  return (
    <Container pt={60}>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <Text className="text-3xl font-bold text-slate-900">Profile</Text>
            <Text className="text-sm text-slate-500 mt-1">
              Manage your account and preferences
            </Text>
          </View>

          {/* User Identity Card */}
          <View className="mx-6 mb-6">
            <View className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-900/5">
              <View className="items-center">
                {/* Avatar with Edit Icon */}
                <View className="relative mb-4">
                  <View className="w-24 h-24 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full items-center justify-center shadow-lg shadow-lime-400/30">
                    <User color="#0f172a" size={48} strokeWidth={2} />
                  </View>
                  <TouchableOpacity
                    className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 rounded-full items-center justify-center shadow-md"
                    activeOpacity={0.7}
                  >
                    <Edit2 size={14} color="#a3e635" />
                  </TouchableOpacity>
                </View>

                {/* User Info */}
                <Text className="text-2xl font-bold text-slate-900 mb-1">
                  {currentUser?.name || 'Guest User'}
                </Text>
                <Text className="text-slate-500 mb-2">
                  {currentUser?.email || 'guest@example.com'}
                </Text>
                <Text className="text-xs text-slate-400">
                  Member since January 2025
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="px-6 mb-6">
            <Text className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
              Quick Actions
            </Text>
            <View className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-slate-100"
                activeOpacity={0.7}
                onPress={navigateToEditProfile}
              >
                <View className="w-10 h-10 bg-lime-100 rounded-full items-center justify-center">
                  <Edit2 size={18} color="#84cc16" />
                </View>
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  Edit Profile
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-slate-100"
                activeOpacity={0.7}
                onPress={navigateToWardrobe}
              >
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                  <ShoppingBag size={18} color="#3b82f6" />
                </View>
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  Manage Wardrobe
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4"
                activeOpacity={0.7}
              >
                <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                  <Sparkles size={18} color="#a855f7" />
                </View>
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  View My Outfits
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Preferences */}
          <View className="px-6 mb-6">
            <Text className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
              App Preferences
            </Text>
            <View className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center p-4"
                activeOpacity={0.7}
                onPress={navigateToSettings}
              >
                <Settings size={20} color="#64748b" />
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  Settings
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support */}
          <View className="px-6 mb-6">
            <Text className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
              Support
            </Text>
            <View className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-slate-100"
                activeOpacity={0.7}
              >
                <HelpCircle size={20} color="#64748b" />
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  Help & FAQ
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-slate-100"
                activeOpacity={0.7}
              >
                <Mail size={20} color="#64748b" />
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  Contact Support
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-slate-100"
                activeOpacity={0.7}
              >
                <Shield size={20} color="#64748b" />
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  Privacy Policy
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4"
                activeOpacity={0.7}
              >
                <FileText size={20} color="#64748b" />
                <Text className="text-slate-900 font-medium ml-3 flex-1">
                  Terms & Conditions
                </Text>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Actions */}
          <View className="px-6 mb-6">
            <Text className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
              Account
            </Text>
            <View className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-slate-100"
                activeOpacity={0.7}
                onPress={handleDeleteAccount}
              >
                <Trash2 size={20} color="#ef4444" />
                <Text className="text-red-500 font-medium ml-3 flex-1">
                  Delete Account
                </Text>
                <ChevronRight size={20} color="#ef4444" />
              </TouchableOpacity>

              {isAuthenticated && (
                <TouchableOpacity
                  className="flex-row items-center p-4"
                  activeOpacity={0.7}
                  onPress={handleLogout}
                >
                  <LogOut size={20} color="#ef4444" />
                  <Text className="text-red-500 font-medium ml-3 flex-1">
                    Logout
                  </Text>
                  <ChevronRight size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* App Version */}
          <View className="px-6 mb-6">
            <Text className="text-center text-xs text-slate-400">
              WardrobeAI v1.0.0
            </Text>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default ProfileScreen;
