import React from 'react';
import { View, Text } from 'react-native';

interface TagChipRowProps {
  tags: string[];
}

const TagChipRow: React.FC<TagChipRowProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <View className="mx-5 mb-6">
      <Text className="text-base font-bold text-slate-900 mb-3">Tags</Text>
      <View className="flex-row flex-wrap">
        {tags.map((tag, index) => (
          <View
            key={index}
            className="bg-lime-100 rounded-full px-3 py-1.5 mr-2 mb-2">
            <Text className="text-sm font-medium text-lime-800">{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TagChipRow;
