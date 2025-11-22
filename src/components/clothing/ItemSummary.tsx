import React from 'react';
import { View, Text } from 'react-native';

interface ItemSummaryProps {
  name: string;
  category: string;
  isClean?: boolean;
  lastWorn?: string;
}

const ItemSummary: React.FC<ItemSummaryProps> = ({
  name,
  category,
  isClean = true,
  lastWorn,
}) => {
  return (
    <View className="px-5 mb-6">
      {/* Item Name */}
      <Text className="text-2xl font-bold text-slate-900 mb-1">
        {name}
      </Text>

      {/* Category */}
      <Text className="text-base text-slate-500 mb-3">
        {category}
      </Text>

      {/* Last Worn */}
      {lastWorn && (
        <Text className="text-sm text-slate-400">
          Last worn: {lastWorn}
        </Text>
      )}
    </View>
  );
};

export default ItemSummary;
