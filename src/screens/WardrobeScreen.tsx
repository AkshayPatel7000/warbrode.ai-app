import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ShoppingBag} from 'lucide-react-native';

const WardrobeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center mb-2">
          <ShoppingBag color="#0ea5e9" size={28} />
          <Text className="text-3xl font-bold ml-3 text-gray-900">
            My Wardrobe
          </Text>
        </View>
        <Text className="text-base text-gray-600">
          Manage your clothing collection
        </Text>
      </View>

      <View className="px-6 py-4">
        <View className="bg-gray-50 rounded-xl p-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Your Collection
          </Text>
          <Text className="text-gray-600">
            Your wardrobe items will appear here
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default WardrobeScreen;
