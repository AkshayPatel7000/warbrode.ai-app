import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';

const SkeletonBox: React.FC<{ width?: string; height?: string; className?: string }> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
}) => {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
      }}
      className={`bg-slate-200 rounded-lg ${width} ${height} ${className}`}
    />
  );
};

export const HomeHeaderSkeleton = () => {
  return (
    <View className="rounded-b-3xl px-5 pt-12 pb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <SkeletonBox width="w-12" height="h-12" className="rounded-full mr-3" />
          <View className="flex-1">
            <SkeletonBox width="w-40" height="h-6" className="mb-2" />
            <SkeletonBox width="w-32" height="h-4" />
          </View>
        </View>
        <SkeletonBox width="w-10" height="h-10" className="rounded-full" />
      </View>
    </View>
  );
};

export const OutfitCardSkeleton = () => {
  return (
    <View className="bg-white rounded-3xl p-5 shadow-lg shadow-slate-200/50 mx-5 mt-2">
      <SkeletonBox width="w-full" className="rounded-2xl mb-4" height='h-60'/>
      <SkeletonBox width="w-full" className="aspect-[4/3] rounded-2xl mb-4" />
      <SkeletonBox width="w-32" height="h-4" className="mb-2" />
      <SkeletonBox width="w-48" height="h-6" className="mb-4" />
      <SkeletonBox width="w-full" height="h-12" className="rounded-2xl" />
    </View>
  );
};

export const WeatherCardSkeleton = () => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/50 mx-5 mt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <SkeletonBox width="w-14" height="h-14" className="rounded-full mr-3" />
          <View className="flex-1">
            <SkeletonBox width="w-40" height="h-6" className="mb-2" />
            <SkeletonBox width="w-32" height="h-3" />
          </View>
        </View>
        <SkeletonBox width="w-5" height="h-5" />
      </View>
    </View>
  );
};

export const StatCardSkeleton = () => {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/50 items-center">
      <SkeletonBox width="w-12" height="h-12" className="rounded-full mb-3" />
      <SkeletonBox width="w-16" height="h-6" className="mb-1" />
      <SkeletonBox width="w-12" height="h-3" />
    </View>
  );
};

export const QuickActionButtonSkeleton = () => {
  return (
    <View className="flex-1 bg-white rounded-2xl py-4 px-3 items-center border border-slate-200">
      <SkeletonBox width="w-10" height="h-10" className="rounded-full mb-2" />
      <SkeletonBox width="w-16" height="h-3" />
    </View>
  );
};

export const HomeScreenSkeleton = () => {
  return (
    <View className="flex-1">
      <HomeHeaderSkeleton />
      <OutfitCardSkeleton />
      <WeatherCardSkeleton />
      
      <View className="px-5 mt-6">
        <View className="flex-row gap-3">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </View>
      </View>

      <View className="px-5 mt-6">
        <View className="flex-row gap-3">
          <QuickActionButtonSkeleton />
          <QuickActionButtonSkeleton />
          <QuickActionButtonSkeleton />
        </View>
      </View>

      <View className="h-24" />
    </View>
  );
};

export default HomeScreenSkeleton;
