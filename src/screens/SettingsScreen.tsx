import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import {
  ChevronRight,
  Palette,
  Cloud,
  RefreshCw,
  Bell,
  Droplet,
  Trash2,
  Download,
  AlertCircle,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/Container';

const SettingsScreen = () => {
  const navigation = useNavigation();

  // Settings state
  const [useWeather, setUseWeather] = useState(true);
  const [dailyNotification, setDailyNotification] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(false);
  const [noRepeatDays, setNoRepeatDays] = useState(7);
  const [selectedStyles, setSelectedStyles] = useState(['Casual', 'Minimal']);
  const [dislikedColors, setDislikedColors] = useState<string[]>([]);

  const styleOptions = [
    'Casual',
    'Formal',
    'Streetwear',
    'Sport',
    'Minimal',
    'Bohemian',
  ];

  const colorOptions = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Brown', hex: '#92400e' },
  ];

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const toggleColor = (colorName: string) => {
    if (dislikedColors.includes(colorName)) {
      setDislikedColors(dislikedColors.filter(c => c !== colorName));
    } else {
      setDislikedColors([...dislikedColors, colorName]);
    }
  };

  return (
    <Container pt={60}>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <Text className="text-3xl font-bold text-slate-900">Settings</Text>
            <Text className="text-sm text-slate-500 mt-1">
              Customize your outfit experience
            </Text>
          </View>

          {/* Style Preferences Section */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center mb-3">
              <Palette size={20} color="#64748b" />
              <Text className="text-lg font-semibold text-slate-900 ml-2">
                Style Preferences
              </Text>
            </View>
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-slate-900/5">
              <Text className="text-sm text-slate-600 mb-3">
                Select your preferred styles
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {styleOptions.map(style => (
                  <TouchableOpacity
                    key={style}
                    onPress={() => toggleStyle(style)}
                    className={`px-4 py-2 rounded-full border-2 ${
                      selectedStyles.includes(style)
                        ? 'bg-lime-400 border-lime-400'
                        : 'bg-white border-slate-200'
                    }`}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`font-medium ${
                        selectedStyles.includes(style)
                          ? 'text-slate-900'
                          : 'text-slate-600'
                      }`}
                    >
                      {style}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Weather Settings Section */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center mb-3">
              <Cloud size={20} color="#64748b" />
              <Text className="text-lg font-semibold text-slate-900 ml-2">
                Weather Settings
              </Text>
            </View>
            <View className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden">
              <View className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <Text className="text-slate-900 font-medium">
                  Use weather in suggestions
                </Text>
                <Switch
                  value={useWeather}
                  onValueChange={setUseWeather}
                  trackColor={{ false: '#cbd5e1', true: '#a3e635' }}
                  thumbColor="#ffffff"
                />
              </View>
              {useWeather && (
                <TouchableOpacity
                  className="flex-row items-center justify-between p-4"
                  activeOpacity={0.7}
                >
                  <View>
                    <Text className="text-slate-900 font-medium">Location</Text>
                    <Text className="text-sm text-slate-500 mt-0.5">
                      Mumbai, IN
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* No-Repeat Rule Section */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center mb-3">
              <RefreshCw size={20} color="#64748b" />
              <Text className="text-lg font-semibold text-slate-900 ml-2">
                No-Repeat Rule
              </Text>
            </View>
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-slate-900/5">
              <Text className="text-slate-900 font-medium mb-2">
                Avoid repeating items for {noRepeatDays} days
              </Text>
              <Text className="text-xs text-slate-500 mb-3">
                Tap to adjust (1-14 days)
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {[1, 3, 5, 7, 10, 14].map(days => (
                  <TouchableOpacity
                    key={days}
                    onPress={() => setNoRepeatDays(days)}
                    className={`px-4 py-2 rounded-full border-2 ${
                      noRepeatDays === days
                        ? 'bg-lime-400 border-lime-400'
                        : 'bg-white border-slate-200'
                    }`}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`font-medium ${
                        noRepeatDays === days
                          ? 'text-slate-900'
                          : 'text-slate-600'
                      }`}
                    >
                      {days} {days === 1 ? 'day' : 'days'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Notifications Section */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center mb-3">
              <Bell size={20} color="#64748b" />
              <Text className="text-lg font-semibold text-slate-900 ml-2">
                Notifications
              </Text>
            </View>
            <View className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden">
              <View className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <Text className="text-slate-900 font-medium">
                  Daily outfit notification
                </Text>
                <Switch
                  value={dailyNotification}
                  onValueChange={setDailyNotification}
                  trackColor={{ false: '#cbd5e1', true: '#a3e635' }}
                  thumbColor="#ffffff"
                />
              </View>
              {dailyNotification && (
                <TouchableOpacity
                  className="flex-row items-center justify-between p-4 border-b border-slate-100"
                  activeOpacity={0.7}
                >
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Notification time
                    </Text>
                    <Text className="text-sm text-slate-500 mt-0.5">
                      7:00 AM
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </TouchableOpacity>
              )}
              <View className="flex-row items-center justify-between p-4">
                <Text className="text-slate-900 font-medium">
                  Weather alerts
                </Text>
                <Switch
                  value={weatherAlerts}
                  onValueChange={setWeatherAlerts}
                  trackColor={{ false: '#cbd5e1', true: '#a3e635' }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>
          </View>

          {/* Color Preferences Section */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center mb-3">
              <Droplet size={20} color="#64748b" />
              <Text className="text-lg font-semibold text-slate-900 ml-2">
                Color Preferences
              </Text>
            </View>
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-slate-900/5">
              <Text className="text-sm text-slate-600 mb-3">
                Select colors you want to avoid
              </Text>
              <View className="flex-row flex-wrap gap-3">
                {colorOptions.map(color => (
                  <TouchableOpacity
                    key={color.name}
                    onPress={() => toggleColor(color.name)}
                    className={`w-14 h-14 rounded-full items-center justify-center border-4 ${
                      dislikedColors.includes(color.name)
                        ? 'border-red-500'
                        : 'border-transparent'
                    }`}
                    activeOpacity={0.7}
                    style={{ backgroundColor: color.hex }}
                  >
                    {dislikedColors.includes(color.name) && (
                      <View className="w-6 h-6 bg-white rounded-full items-center justify-center">
                        <Text className="text-red-500 font-bold text-xs">
                          ✕
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Data & Privacy Section */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center mb-3">
              <AlertCircle size={20} color="#64748b" />
              <Text className="text-lg font-semibold text-slate-900 ml-2">
                Data & Privacy
              </Text>
            </View>
            <View className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center justify-between p-4 border-b border-slate-100"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <Trash2 size={20} color="#64748b" />
                  <Text className="text-slate-900 font-medium ml-3">
                    Clear AI generated outfits
                  </Text>
                </View>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center justify-between p-4 border-b border-slate-100"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <Trash2 size={20} color="#64748b" />
                  <Text className="text-slate-900 font-medium ml-3">
                    Clear wardrobe cache
                  </Text>
                </View>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center justify-between p-4 border-b border-slate-100"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <Download size={20} color="#64748b" />
                  <Text className="text-slate-900 font-medium ml-3">
                    Export my data
                  </Text>
                </View>
                <ChevronRight size={20} color="#94a3b8" />
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <AlertCircle size={20} color="#ef4444" />
                  <Text className="text-red-500 font-medium ml-3">
                    Delete my account
                  </Text>
                </View>
                <ChevronRight size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default SettingsScreen;
