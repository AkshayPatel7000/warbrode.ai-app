import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { RefreshCw, CloudOff } from 'lucide-react-native';

interface EmptyStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onRetry,
  isRetrying = false,
}) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isRetrying) {
      // Start rotation animation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      // Reset rotation
      spinValue.setValue(0);
    }
  }, [isRetrying, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 items-center justify-center px-8">
      {/* Icon Container with Gradient Background */}
      <View className="items-center justify-center w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
        <View className="items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-gray-900">
          <CloudOff size={48} color="#9ca3af" strokeWidth={1.5} />
        </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
        No Data Available
      </Text>

      {/* Description */}
      <Text className="text-base text-gray-500 dark:text-gray-400 text-center mb-8 leading-6">
        We couldn't load your dashboard data.{'\n'}
        Please check your connection and try again.
      </Text>

      {/* Retry Button */}
      <TouchableOpacity
        onPress={onRetry}
        disabled={isRetrying}
        className={`flex-row items-center px-8 py-4 rounded-2xl ${
          isRetrying
            ? 'bg-gray-300 dark:bg-gray-700'
            : 'bg-indigo-500 dark:bg-indigo-600'
        }`}
        activeOpacity={0.7}
      >
        <Animated.View
          style={{
            transform: [{ rotate: isRetrying ? spin : '0deg' }],
            marginRight: 8,
          }}
        >
          <RefreshCw size={20} color="white" strokeWidth={2.5} />
        </Animated.View>
        <Text className="text-white font-semibold text-base">
          {isRetrying ? 'Retrying...' : 'Try Again'}
        </Text>
      </TouchableOpacity>

      {/* Help Text */}
      <Text className="text-sm text-gray-400 dark:text-gray-500 text-center mt-6">
        Still having trouble? Pull down to refresh
      </Text>
    </View>
  );
};
