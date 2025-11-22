import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

interface ClothingCardProps {
  id: string;
  imageUrl?: string;
  name: string;
  category?: string;
  lastWorn?: string;
  tags?: string[];
  onPress?: () => void;
  onLongPress?: () => void;
}

const ClothingCard: React.FC<ClothingCardProps> = ({
  imageUrl,
  name,
  category,
  lastWorn,
  tags,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      className="bg-white rounded-2xl shadow-sm shadow-slate-200/50 overflow-hidden mb-4"
      activeOpacity={0.7}>
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
            <View className="w-16 h-16 rounded-full bg-slate-200 items-center justify-center mb-2">
              <Text className="text-2xl text-slate-400">👕</Text>
            </View>
            <Text className="text-xs text-slate-400">No Image</Text>
          </View>
        )}
      </View>

      {/* Info Container */}
      <View className="p-3">
        <Text className="text-base font-semibold text-slate-900" numberOfLines={1}>
          {name}
        </Text>
        
        {category && (
          <Text className="text-xs text-slate-500 mt-1" numberOfLines={1}>
            {category}
          </Text>
        )}

        {lastWorn && (
          <Text className="text-xs text-slate-400 mt-1" numberOfLines={1}>
            Last worn {lastWorn}
          </Text>
        )}

        {tags && tags.length > 0 && (
          <View className="flex-row flex-wrap mt-2">
            {tags.slice(0, 2).map((tag, index) => (
              <View
                key={index}
                className="bg-lime-100 rounded-full px-2 py-1 mr-1 mb-1">
                <Text className="text-xs text-lime-800">{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ClothingCard;
