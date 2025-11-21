import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Search} from 'lucide-react-native';

const ExploreScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center mb-2">
          <Search color="#0ea5e9" size={28} />
          <Text className="text-3xl font-bold ml-3 text-gray-900">Explore</Text>
        </View>
        <Text className="text-base text-gray-600">
          Discover new fashion trends
        </Text>
      </View>

      <View className="px-6 py-4">
        <View className="bg-gray-50 rounded-xl p-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Trending Now
          </Text>
          <Text className="text-gray-600">
            Explore the latest fashion trends and styles
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;
