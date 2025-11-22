import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sparkles, Trash2 } from 'lucide-react-native';

interface ActionButtonRowProps {
  isClean: boolean;
  onToggleClean: () => void;
  onUseInOutfit: () => void;
  onDelete: () => void;
}

const ActionButtonRow: React.FC<ActionButtonRowProps> = ({
  isClean,
  onToggleClean,
  onUseInOutfit,
  onDelete,
}) => {
  return (
    <View className="px-5 mb-6">
      {/* Primary Actions */}
      <View className="flex-row gap-3 mb-3">
        {/* Toggle Clean/Dirty */}
        <TouchableOpacity
          onPress={onToggleClean}
          className="flex-1"
          activeOpacity={0.8}>
          <View
            className={`rounded-2xl py-4 items-center ${
              isClean ? 'bg-orange-100' : 'bg-green-100'
            }`}>
            <Text
              className={`text-base font-bold ${
                isClean ? 'text-orange-800' : 'text-green-800'
              }`}>
              Mark {isClean ? 'Dirty' : 'Clean'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Use in Outfit */}
        <TouchableOpacity
          onPress={onUseInOutfit}
          className="flex-1"
          activeOpacity={0.8}>
          <View className="rounded-2xl py-4 bg-lime-400 flex-row items-center justify-center">
            <Sparkles size={18} color="#0f172a" style={{ marginRight: 6 }} />
            <Text className="text-base font-bold text-slate-900">
              Use in Outfit
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={onDelete}
        className="bg-white border border-red-200 rounded-2xl py-3 flex-row items-center justify-center"
        activeOpacity={0.7}>
        <Trash2 size={18} color="#dc2626" style={{ marginRight: 6 }} />
        <Text className="text-base font-semibold text-red-600">
          Delete Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtonRow;
