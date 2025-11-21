import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import clsx from 'clsx';

interface SocialButtonProps {
  provider: 'google';
  label?: string;
  onPress: () => void;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  label = 'Continue with Google',
  onPress,
  className = "flex-row ",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        'flex-row items-center justify-center h-12 rounded-2xl bg-white border border-slate-200 shadow-sm',
        className
      )}
      activeOpacity={0.7}>
      <View className="flex-row items-center">
        {/* Google Icon - Using a simple colored circle as placeholder */}
        <View className="w-5 h-5 rounded-full bg-[#4285F4] items-center justify-center mr-2">
          <Text className="text-white text-xs font-bold">G</Text>
        </View>
        <Text className="text-sm font-medium text-slate-800">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
