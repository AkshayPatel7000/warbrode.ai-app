import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Heart, RefreshCw, Sparkles, ThumbsDown } from 'lucide-react-native';
import Container from '../components/Container';

// Mock data for demonstration
const MOCK_OUTFIT = {
  id: '1',
  name: "Today's Outfit",
  imageUri: 'https://via.placeholder.com/400x500',
  weather: { temp: 21, condition: 'Sunny' },
  colorScore: 87,
  style: 'Casual',
  aiScore: 92,
  reasoning:
    "Neutral sneakers balance the bold top, and the jeans match today's mild weather.",
  items: [
    {
      id: '1',
      type: 'T-Shirt',
      color: 'Navy',
      thumbnail: 'https://via.placeholder.com/60',
    },
    {
      id: '2',
      type: 'Jeans',
      color: 'Blue',
      thumbnail: 'https://via.placeholder.com/60',
    },
    {
      id: '3',
      type: 'Sneakers',
      color: 'White',
      thumbnail: 'https://via.placeholder.com/60',
    },
  ],
};

const OutfitGeneratorScreen = () => {
  const [outfit, setOutfit] = useState(MOCK_OUTFIT);
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleShuffle = () => {
    setIsLoading(true);
    setLiked(null);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, update with new outfit from API
    }, 1000);
  };

  const handleLike = () => {
    setLiked(liked === true ? null : true);
  };

  const handleDislike = () => {
    setLiked(liked === false ? null : false);
  };

  const handleWearToday = () => {
    setIsSelected(true);
    // Call API to mark outfit as selected
  };

  return (
    <Container pt={10}>
      <View className="flex-1 ">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-6 pt-16 pb-6">
            <Text className="text-3xl font-bold text-slate-900">
              Outfit Generator
            </Text>
            <Text className="text-sm text-slate-500 mt-1">
              Based on your wardrobe and today's weather
            </Text>
          </View>

          {/* Outfit Preview Card */}
          <View className="mx-6 mb-4">
            <View className="bg-white rounded-3xl shadow-lg shadow-slate-900/5 overflow-hidden">
              {isLoading ? (
                <View className="aspect-[4/3] items-center justify-center bg-slate-100">
                  <ActivityIndicator size="large" color="#a3e635" />
                  <Text className="text-slate-500 mt-4">
                    Generating outfit...
                  </Text>
                </View>
              ) : (
                <>
                  <Image
                    source={{ uri: outfit.imageUri }}
                    className="w-full aspect-[4/3]"
                    resizeMode="cover"
                  />
                  {isSelected && (
                    <View className="absolute top-4 right-4 bg-lime-400 px-3 py-1.5 rounded-full">
                      <Text className="text-slate-900 text-xs font-semibold">
                        Selected for today
                      </Text>
                    </View>
                  )}
                  <View className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex-row items-center">
                    <Sparkles size={14} color="#a3e635" />
                    <Text className="text-white text-xs font-medium ml-1">
                      AI Generated
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Meta Chips Row */}
          {!isLoading && (
            <View className="mx-6 mb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row gap-2"
              >
                {/* Weather Chip */}
                <View className="bg-white px-4 py-2.5 rounded-full shadow-sm shadow-slate-900/5 flex-row items-center">
                  <Text className="text-slate-700 text-sm font-medium">
                    {outfit.weather.temp}°C • {outfit.weather.condition}
                  </Text>
                </View>

                {/* Color Score Chip */}
                <View className="bg-white px-4 py-2.5 rounded-full shadow-sm shadow-slate-900/5 flex-row items-center">
                  <Text className="text-slate-700 text-sm font-medium">
                    Color match: {outfit.colorScore}/100
                  </Text>
                </View>

                {/* Style Chip */}
                <View className="bg-white px-4 py-2.5 rounded-full shadow-sm shadow-slate-900/5 flex-row items-center">
                  <Text className="text-slate-700 text-sm font-medium">
                    {outfit.style}
                  </Text>
                </View>

                {/* AI Score Chip */}
                <View className="bg-white px-4 py-2.5 rounded-full shadow-sm shadow-slate-900/5 flex-row items-center">
                  <Text className="text-slate-700 text-sm font-medium">
                    AI score: {outfit.aiScore}
                  </Text>
                </View>
              </ScrollView>
            </View>
          )}

          {/* AI Explanation Section */}
          {!isLoading && (
            <View className="mx-6 mb-4">
              <View className="bg-white rounded-2xl p-5 shadow-sm shadow-slate-900/5">
                <View className="flex-row items-center mb-2">
                  <Sparkles size={16} color="#a3e635" />
                  <Text className="text-slate-900 font-semibold ml-2">
                    Why this outfit?
                  </Text>
                </View>
                <Text className="text-slate-600 text-sm leading-5">
                  {outfit.reasoning}
                </Text>
              </View>
            </View>
          )}

          {/* Interaction Row */}
          {!isLoading && (
            <View className="mx-6 mb-4">
              <View className="flex-row items-center justify-between mb-3">
                {/* Like Button */}
                <TouchableOpacity
                  onPress={handleLike}
                  className={`flex-1 mr-2 py-3.5 rounded-2xl border-2 flex-row items-center justify-center ${
                    liked === true
                      ? 'bg-lime-400 border-lime-400'
                      : 'bg-white border-slate-200'
                  }`}
                  activeOpacity={0.7}
                >
                  <Heart
                    size={20}
                    color={liked === true ? '#0f172a' : '#64748b'}
                    fill={liked === true ? '#0f172a' : 'transparent'}
                  />
                  <Text
                    className={`ml-2 font-semibold ${
                      liked === true ? 'text-slate-900' : 'text-slate-600'
                    }`}
                  >
                    Like
                  </Text>
                </TouchableOpacity>

                {/* Dislike Button */}
                <TouchableOpacity
                  onPress={handleDislike}
                  className={`flex-1 ml-2 py-3.5 rounded-2xl border-2 flex-row items-center justify-center ${
                    liked === false
                      ? 'bg-slate-200 border-slate-300'
                      : 'bg-white border-slate-200'
                  }`}
                  activeOpacity={0.7}
                >
                  <ThumbsDown
                    size={20}
                    color={liked === false ? '#0f172a' : '#64748b'}
                    fill={liked === false ? '#0f172a' : 'transparent'}
                  />
                  <Text
                    className={`ml-2 font-semibold ${
                      liked === false ? 'text-slate-900' : 'text-slate-600'
                    }`}
                  >
                    Dislike
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between">
                {/* Shuffle Button */}
                <TouchableOpacity
                  onPress={handleShuffle}
                  className="flex-1 mr-2 py-3.5 rounded-2xl bg-white border-2 border-slate-200 flex-row items-center justify-center"
                  activeOpacity={0.7}
                >
                  <RefreshCw size={20} color="#64748b" />
                  <Text className="ml-2 font-semibold text-slate-600">
                    Shuffle
                  </Text>
                </TouchableOpacity>

                {/* Wear Today Button */}
                <TouchableOpacity
                  onPress={handleWearToday}
                  className="flex-1 ml-2 py-3.5 rounded-2xl bg-lime-400 flex-row items-center justify-center shadow-lg shadow-lime-400/30"
                  activeOpacity={0.7}
                >
                  <Text className="font-bold text-slate-900">
                    {isSelected ? 'Selected ✓' : 'Wear Today'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Outfit Items List */}
          {!isLoading && (
            <View className="mx-6 mb-24">
              <Text className="text-slate-900 font-semibold mb-3">
                Items in this outfit
              </Text>
              {outfit.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  className="bg-white rounded-2xl p-4 mb-2 flex-row items-center shadow-sm shadow-slate-900/5"
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    className="w-14 h-14 rounded-xl bg-slate-100"
                  />
                  <View className="ml-4 flex-1">
                    <Text className="text-slate-900 font-semibold">
                      {item.type}
                    </Text>
                    <Text className="text-slate-500 text-sm">{item.color}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default OutfitGeneratorScreen;
