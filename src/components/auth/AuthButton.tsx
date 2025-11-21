import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import { MotiView } from 'moti';
import clsx from 'clsx';

interface AuthButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  variant = 'primary',
  label,
  onPress,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  className,
}) => {
  return (
    <MotiView
      from={{ scale: 1 }}
      animate={{ scale: disabled || loading ? 0.95 : 1 }}
      transition={{ type: 'timing', duration: 200 }}
      className={className}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        className={clsx(
          'h-12 px-4 rounded-2xl justify-center items-center',
          variant === 'primary' ? 'bg-lime-500 shadow-lg shadow-lime-400/30' : "items-center",
          variant === 'outline' ? 'bg-white border border-slate-300' : "items-center",
          variant === 'ghost' ? 'bg-transparent' : "items-center",
          (disabled || loading) ? 'opacity-50' : "items-center"
        )}
        activeOpacity={0.7}>
        <View className="flex-row items-center justify-center">
          {loading ? (
            <ActivityIndicator
              color={variant === 'primary' ? '#ffffff' : '#4f46e5'}
            />
          ) : (
            <>
              {iconLeft && <View className="mr-2">{iconLeft}</View>}
              <Text
                className={clsx(
                  'text-sm font-semibold',
                  variant === 'primary' ? 'text-white' : "text-sm",
                  variant === 'outline' ? 'text-slate-900' : "text-sm",
                  variant === 'ghost' ? 'text-slate-700' : "text-sm"
                )}>
                {label}
              </Text>
              {iconRight && <View className="ml-2">{iconRight}</View>}
            </>
          )}
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

export default AuthButton;
