import React from 'react';
import { View, Image, Text } from 'react-native';

interface HeroImageCardProps {
  imageUrl?: string;
  isClean?: boolean;
}

const HeroImageCard: React.FC<HeroImageCardProps> = ({
  imageUrl,
  isClean = true,
}) => {
  return (
    <View className="mx-5 mb-4">
      <View className="bg-white rounded-3xl shadow-md shadow-slate-200/50 overflow-hidden">
        {/* Image Container */}
        <View className="w-full aspect-square bg-slate-100 items-center justify-center">
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="items-center justify-center">
              <View className="w-24 h-24 rounded-full bg-slate-200 items-center justify-center mb-3">
                <Text className="text-5xl">👕</Text>
              </View>
              <Text className="text-sm text-slate-400">No Image</Text>
            </View>
          )}
        </View>

        {/* Status Badge */}
        <View className="absolute top-4 right-4">
          <View
            className={`px-3 py-1.5 rounded-full ${
              isClean ? 'bg-green-100' : 'bg-orange-100'
            }`}>
            <Text
              className={`text-xs font-semibold ${
                isClean ? 'text-green-800' : 'text-orange-800'
              }`}>
              {isClean ? 'Clean' : 'Dirty'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeroImageCard;
