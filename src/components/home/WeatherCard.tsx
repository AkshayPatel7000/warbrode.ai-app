import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, ChevronRight, MapPin } from 'lucide-react-native';

interface WeatherCardProps {
  temperature?: number;
  condition?: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  onPress?: () => void;
  permissionDenied?: boolean;
  onRequestPermission?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature = 21,
  condition = 'sunny',
  onPress,
  permissionDenied = false,
  onRequestPermission,
}) => {
  const getWeatherIcon = () => {
    const iconProps = { size: 32, color: '#0f172a' };
    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} />;
      case 'cloudy':
        return <Cloud {...iconProps} />;
      case 'rainy':
        return <CloudRain {...iconProps} />;
      case 'snowy':
        return <CloudSnow {...iconProps} />;
      case 'windy':
        return <Wind {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  const getConditionText = () => {
    return condition.charAt(0).toUpperCase() + condition.slice(1);
  };

  if (permissionDenied) {
    return (
      <TouchableOpacity
        onPress={onRequestPermission}
        className="bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/50 mx-5 mt-4"
        activeOpacity={0.7}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="w-14 h-14 rounded-full bg-orange-100 items-center justify-center mr-3">
              <MapPin size={32} color="#f97316" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-slate-900">Enable Location</Text>
              <Text className="text-xs text-slate-500 mt-1">
                Get weather-based outfit recommendations
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color="#64748b" />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/50 mx-5 mt-4"
      activeOpacity={0.7}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {/* Weather Icon */}
          <View className="w-14 h-14 rounded-full bg-lime-100 items-center justify-center mr-3">
            {getWeatherIcon()}
          </View>

          {/* Weather Info */}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-slate-900">
              {temperature}°C & {getConditionText()}
            </Text>
            <Text className="text-xs text-slate-500 mt-1">Weather applied to outfit</Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <ChevronRight size={20} color="#64748b" />
      </View>
    </TouchableOpacity>
  );
};

export default WeatherCard;
