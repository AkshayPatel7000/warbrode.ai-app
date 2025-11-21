import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {MotiView} from 'moti';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500 active:bg-primary-600';
      case 'secondary':
        return 'bg-secondary-500 active:bg-secondary-600';
      case 'outline':
        return 'bg-transparent border-2 border-primary-500';
      default:
        return 'bg-primary-500';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
        return 'text-primary-500';
      default:
        return 'text-white';
    }
  };

  return (
    <MotiView
      from={{scale: 1}}
      animate={{scale: disabled ? 0.95 : 1}}
      transition={{type: 'timing', duration: 200}}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        className={`px-6 py-4 rounded-xl items-center justify-center ${getVariantStyles()} ${
          disabled ? 'opacity-50' : ''
        }`}>
        {loading ? (
          <ActivityIndicator
            color={variant === 'outline' ? '#0ea5e9' : '#ffffff'}
          />
        ) : (
          <Text className={`text-base font-semibold ${getTextStyles()}`}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </MotiView>
  );
};

export default Button;
