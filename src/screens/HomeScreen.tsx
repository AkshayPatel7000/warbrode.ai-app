import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Sparkles} from 'lucide-react-native';

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center mb-2">
          <Sparkles color="#0ea5e9" size={28} />
          <Text className="text-3xl font-bold ml-3 text-gray-900">
            WardrobeAI
          </Text>
        </View>
        <Text className="text-base text-gray-600">
          Your AI-powered fashion assistant
        </Text>
      </View>

      <View className="px-6 py-8">
        <View className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 mb-6">
          <Text className="text-2xl font-bold text-white mb-2">
            Welcome to Home
          </Text>
          <Text className="text-white opacity-90">
            Start exploring your wardrobe with AI
          </Text>
        </View>

        <View className="bg-gray-50 rounded-xl p-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Quick Stats
          </Text>
          <Text className="text-gray-600">
            Your wardrobe insights will appear here
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
