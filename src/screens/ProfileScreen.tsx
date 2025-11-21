import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {User, Settings, LogOut} from 'lucide-react-native';
import {useAppSelector, useAppDispatch} from '../hooks/useRedux';
import {logout} from '../store/slices/authSlice';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const {currentUser} = useAppSelector(state => state.user);
  const {isAuthenticated} = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center mb-2">
          <User color="#0ea5e9" size={28} />
          <Text className="text-3xl font-bold ml-3 text-gray-900">Profile</Text>
        </View>
        <Text className="text-base text-gray-600">
          Manage your account settings
        </Text>
      </View>

      <View className="px-6 py-4">
        {/* Profile Info */}
        <View className="bg-gray-50 rounded-xl p-6 mb-4">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-primary-500 rounded-full items-center justify-center mb-3">
              <User color="#ffffff" size={40} />
            </View>
            <Text className="text-xl font-bold text-gray-900">
              {currentUser?.name || 'Guest User'}
            </Text>
            <Text className="text-gray-600">
              {currentUser?.email || 'guest@example.com'}
            </Text>
          </View>
        </View>

        {/* Settings Options */}
        <View className="bg-gray-50 rounded-xl overflow-hidden mb-4">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
            <Settings color="#64748b" size={24} />
            <Text className="text-base text-gray-900 ml-3 flex-1">
              Settings
            </Text>
          </TouchableOpacity>

          {isAuthenticated && (
            <TouchableOpacity
              className="flex-row items-center p-4"
              onPress={handleLogout}>
              <LogOut color="#ef4444" size={24} />
              <Text className="text-base text-red-500 ml-3 flex-1">Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
