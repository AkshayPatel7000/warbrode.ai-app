import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { getFullImageUrl } from '../../utils/helpers';

interface OutfitCardProps {
  outfitImage?: string;
  outfitTitle?: string;
  onViewOutfit?: () => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({
  outfitImage,
  outfitTitle = 'Casual Day Out',
  onViewOutfit,
}) => {
  return (
    <View className="bg-white rounded-3xl p-5 shadow-lg shadow-slate-200/50 mx-5 mt-2">
      {/* Outfit Image */}
      <View className="w-full aspect-[4/3] rounded-2xl bg-slate-100 items-center justify-center mb-4 overflow-hidden">
        {outfitImage ? (
          <Image
            source={{ uri: getFullImageUrl(outfitImage) }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-lime-100 items-center justify-center mb-3">
              <Sparkles size={40} color="#a3e635" />
            </View>
            <Text className="text-sm text-slate-400">
              No outfit generated yet
            </Text>
          </View>
        )}
      </View>

      {/* AI Recommendation Badge */}
      <View className="flex-row items-center mb-2">
        <Sparkles size={16} color="#a3e635" />
        <Text className="text-xs text-slate-500 ml-1">
          AI picked this for you
        </Text>
      </View>

      {/* Outfit Title */}
      <Text className="text-xl font-bold text-slate-900 mb-4">
        {outfitTitle}
      </Text>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={onViewOutfit}
        className="bg-lime-400 rounded-2xl py-3 items-center"
        activeOpacity={0.7}
      >
        <Text className="text-base font-semibold text-slate-900">
          View Outfit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OutfitCard;
