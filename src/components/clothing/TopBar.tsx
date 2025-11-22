import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';

interface TopBarProps {
  title?: string;
  onBackPress: () => void;
  onMorePress?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  title = '',
  onBackPress,
  onMorePress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-5 pt-12 pb-4">
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBackPress}
        className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm shadow-slate-200/50"
        activeOpacity={0.7}>
        <ChevronLeft size={20} color="#0f172a" />
      </TouchableOpacity>

      {/* Title */}
      {title && (
        <Text className="text-base font-semibold text-slate-900">
          {title}
        </Text>
      )}

      {/* More Button */}
      <TouchableOpacity
        onPress={onMorePress}
        className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm shadow-slate-200/50"
        activeOpacity={0.7}>
        <MoreVertical size={20} color="#0f172a" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
