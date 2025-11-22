import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface CategoryChipProps {
  label: string;
  icon?: LucideIcon;
  isSelected?: boolean;
  onPress?: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  icon: Icon,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-5 py-3 rounded-full mr-2 ${
        isSelected
          ? 'bg-lime-400 shadow-md shadow-lime-400/30'
          : 'bg-white shadow-sm shadow-slate-200/50'
      }`}
      activeOpacity={0.7}>
      {Icon && (
        <Icon
          size={18}
          color={isSelected ? '#0f172a' : '#64748b'}
          style={{ marginRight: 6 }}
        />
      )}
      <Text
        className={`text-sm font-semibold ${
          isSelected ? 'text-slate-900' : 'text-slate-600'
        }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryChip;
