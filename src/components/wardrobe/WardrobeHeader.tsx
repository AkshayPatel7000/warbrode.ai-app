import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

interface WardrobeHeaderProps {
  itemCount?: number;
  onAddPress?: () => void;
}

const WardrobeHeader: React.FC<WardrobeHeaderProps> = ({
  itemCount = 0,
  onAddPress,
}) => {
  return (
    <View className="px-5 pt-12 pb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-3xl font-bold text-slate-900">
            My Wardrobe
          </Text>
          <Text className="text-sm text-slate-600 mt-1">
            {itemCount === 0 ? 'No items yet' : `${itemCount} item${itemCount !== 1 ? 's' : ''} total`}
          </Text>
        </View>
<TouchableOpacity
                   onPress={onAddPress}
                    className="w-10 h-10 rounded-full bg-white/50 items-center justify-center">
                    <Plus size={20} color="#0f172a" />
                 
                </TouchableOpacity>
        {/* Add Button */}
        
      </View>
    </View>
  );
};

export default WardrobeHeader;
