import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

const WardrobeScreenSkeleton = () => {
  return (
    <View className="flex-1">
      {/* Header Skeleton */}
      <View className="px-5 pt-12 pb-4">
        <Skeleton colorMode="light" width="60%" height={32} radius={8} />
        <View className="h-2" />
        <Skeleton colorMode="light" width="40%" height={16} radius={8} />
      </View>

      {/* Category Chips Skeleton */}
      <View className="px-5 mb-4">
        <View className="flex-row gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton
              key={i}
              colorMode="light"
              width={80}
              height={40}
              radius={20}
            />
          ))}
        </View>
      </View>

      {/* Upload Button Skeleton */}
      <View className="px-5 mb-4">
        <Skeleton colorMode="light" width="100%" height={56} radius={16} />
      </View>

      {/* Grid Skeleton */}
      <View className="px-5">
        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <View key={i} className="w-[48%] mb-4">
              <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                  loop: true,
                }}>
                <View className="bg-slate-100 rounded-2xl overflow-hidden">
                  <Skeleton
                    colorMode="light"
                    width="100%"
                    height={180}
                    radius={0}
                  />
                  <View className="p-3">
                    <Skeleton
                      colorMode="light"
                      width="80%"
                      height={16}
                      radius={8}
                    />
                    <View className="h-2" />
                    <Skeleton
                      colorMode="light"
                      width="60%"
                      height={12}
                      radius={8}
                    />
                  </View>
                </View>
              </MotiView>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default WardrobeScreenSkeleton;
