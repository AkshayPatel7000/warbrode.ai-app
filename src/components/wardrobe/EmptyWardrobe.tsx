import React from 'react';
import { View, Text } from 'react-native';

const EmptyWardrobe: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      {/* Illustration */}
      <View className="w-32 h-32 rounded-full bg-lime-100 items-center justify-center mb-6">
        <Text className="text-6xl">👔</Text>
      </View>

      {/* Text */}
      <Text className="text-2xl font-bold text-slate-900 text-center mb-2">
        Your wardrobe is empty
      </Text>
      <Text className="text-base text-slate-500 text-center">
        Start building your digital wardrobe by tapping the + button above
      </Text>
    </View>
  );
};

export default EmptyWardrobe;
