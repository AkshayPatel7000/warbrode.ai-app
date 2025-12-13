import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import clsx from 'clsx';

interface SocialButtonProps {
  provider: 'google';
  label?: string;
  onPress: () => void;
  className?: string;
  loading?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  label = 'Continue with Google',
  onPress,
  className = 'flex-row ',
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={clsx(
        'flex-row items-center justify-center h-12 rounded-2xl bg-white border border-slate-200 shadow-sm',
        loading && 'opacity-60',
        className,
      )}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        {loading ? (
          <ActivityIndicator size="small" color="#4285F4" className="mr-2" />
        ) : (
          /* Google Icon - Using a simple colored circle as placeholder */
          <View className="w-5 h-5 rounded-full bg-[#4285F4] items-center justify-center mr-2">
            <Text className="text-white text-xs font-bold">G</Text>
          </View>
        )}
        <Text className="text-sm font-medium text-slate-800">
          {loading ? 'Signing in...' : label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
