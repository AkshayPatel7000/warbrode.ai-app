import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon, ArrowLeft, ChevronLeft } from 'lucide-react-native';

export interface ScreenHeaderProps {
  /**
   * Main title of the screen
   */
  title: string;

  /**
   * Optional subtitle/description text
   */
  subtitle?: string;

  /**
   * Layout variant
   * - 'default': Left-aligned title/subtitle, optional right action
   * - 'center': Center-aligned title, left back button, optional right action
   */
  variant?: 'default' | 'center';

  /**
   * Callback for back button (required for 'center' variant usually)
   */
  onBackPress?: () => void;

  /**
   * Custom icon for back button (default: ArrowLeft)
   */
  BackIcon?: LucideIcon;

  /**
   * Optional action button icon (from lucide-react-native)
   */
  ActionIcon?: LucideIcon;

  /**
   * Callback when action button is pressed
   */
  onActionPress?: () => void;

  /**
   * Optional custom action button component (replaces ActionIcon)
   */
  customAction?: ReactNode;

  /**
   * Custom padding top (default: 16)
   */
  paddingTop?: number;

  /**
   * Custom padding bottom (default: 16)
   */
  paddingBottom?: number;

  /**
   * Custom padding horizontal (default: 24)
   */
  paddingHorizontal?: number;

  /**
   * Title size variant
   */
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Show action button background
   */
  showActionBackground?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  variant = 'default',
  onBackPress,
  BackIcon = ArrowLeft,
  ActionIcon,
  onActionPress,
  customAction,
  paddingTop = 16,
  paddingBottom = 16,
  paddingHorizontal = 24,
  titleSize = 'xl',
  showActionBackground = true,
}) => {
  const getTitleSizeClass = () => {
    switch (titleSize) {
      case 'sm':
        return 'text-lg';
      case 'md':
        return 'text-xl';
      case 'lg':
        return 'text-2xl';
      case 'xl':
        return 'text-3xl';
      default:
        return 'text-3xl';
    }
  };

  if (variant === 'center') {
    return (
      <View
        style={{
          paddingTop,
          paddingBottom,
          paddingHorizontal,
        }}
      >
        <View className="flex-row items-center justify-between">
          {/* Left Action (Back) */}
          <View className="w-10">
            {onBackPress && (
              <TouchableOpacity
                onPress={onBackPress}
                className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm shadow-slate-200/50"
                activeOpacity={0.7}
              >
                <BackIcon size={20} color="#0f172a" />
              </TouchableOpacity>
            )}
          </View>

          {/* Center Title */}
          <View className="flex-1 items-center mx-4">
            <Text
              className={`${getTitleSizeClass()} font-bold text-slate-900 text-center`}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subtitle && (
              <Text className="text-xs text-slate-500 mt-0.5 text-center">
                {subtitle}
              </Text>
            )}
          </View>

          {/* Right Action */}
          <View className="w-10 items-end">
            {customAction ? (
              customAction
            ) : ActionIcon && onActionPress ? (
              <TouchableOpacity
                onPress={onActionPress}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  showActionBackground
                    ? 'bg-white shadow-sm shadow-slate-200/50'
                    : ''
                }`}
                activeOpacity={0.7}
              >
                <ActionIcon size={20} color="#0f172a" />
              </TouchableOpacity>
            ) : (
              <View className="w-10" />
            )}
          </View>
        </View>
      </View>
    );
  }

  // Default Variant (Left Aligned)
  return (
    <View
      style={{
        paddingTop,
        paddingBottom,
        paddingHorizontal,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-4">
          <Text className={`${getTitleSizeClass()} font-bold text-slate-900`}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-slate-500 mt-1">{subtitle}</Text>
          )}
        </View>

        {/* Custom Action or Icon Button */}
        {customAction ? (
          customAction
        ) : ActionIcon && onActionPress ? (
          <TouchableOpacity
            onPress={onActionPress}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              showActionBackground ? 'bg-white/50' : ''
            }`}
            activeOpacity={0.7}
          >
            <ActionIcon size={20} color="#0f172a" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default ScreenHeader;
