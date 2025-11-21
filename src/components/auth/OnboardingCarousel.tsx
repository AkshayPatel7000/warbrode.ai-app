import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import clsx from 'clsx';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  illustration?: string;
}

interface OnboardingCarouselProps {
  slides: Slide[];
  onSkip: () => void;
  onDone: () => void;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  slides,
  onSkip,
  onDone,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      onDone();
    }
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View className="px-5" style={{ width: SCREEN_WIDTH }}>
      <View className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-200/50">
        {/* Illustration placeholder */}
        <View className="h-40 rounded-2xl bg-slate-100 items-center justify-center">
          <Text className="text-6xl">📱</Text>
        </View>
        <Text className="mt-4 text-lg font-semibold text-slate-900">{item.title}</Text>
        <Text className="mt-2 text-sm text-slate-500 leading-5">{item.description}</Text>
      </View>
    </View>
  );

  const renderPaginationDots = () => (
    <View className="flex-row justify-center mt-4 gap-2">
      {slides.map((_, index) => (
        <View
          key={index}
          className={clsx(
            'h-2 rounded-full',
            index === currentIndex ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300'
          )}
        />
      ))}
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setCurrentIndex(index);
        }}
      />

      {renderPaginationDots()}

      <View className="flex-row justify-between items-center mt-6 px-5">
        <TouchableOpacity onPress={onSkip}>
          <Text className="text-sm text-slate-500">Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} className="bg-indigo-600 px-8 py-3 rounded-2xl">
          <Text className="text-white text-sm font-semibold">
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingCarousel;
