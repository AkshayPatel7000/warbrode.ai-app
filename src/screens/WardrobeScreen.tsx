import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import {
  Footprints,
  Shirt,
} from 'lucide-react-native';
import {
  WardrobeHeader,
  CategoryChip,
  ClothingCard,
  UploadOptionsSheet,
  EmptyWardrobe,
} from '../components/wardrobe';
import Container from '../components/Container';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WardrobeStackParamList } from '../navigation/types';
import { ShirtIcon, TShirtIcon, JeansIcon } from '../components/icons/ClothingIcons';

type Props = NativeStackScreenProps<WardrobeStackParamList, 'WardrobeMain'>;

// Mock data - replace with actual data from Redux/API
const MOCK_CLOTHING_ITEMS = [
  {
    id: '1',
    name: 'Green Casual Shirt',
    category: 'Shirts',
    imageUrl: undefined,
    lastWorn: '3 days ago',
    tags: ['Casual', 'Summer'],
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Jeans',
    imageUrl: undefined,
    lastWorn: '1 week ago',
    tags: ['Casual'],
  },
  {
    id: '3',
    name: 'White T-Shirt',
    category: 'T-Shirts',
    imageUrl: undefined,
    lastWorn: 'Yesterday',
    tags: ['Casual', 'Basic'],
  },
  {
    id: '4',
    name: 'Black Sneakers',
    category: 'Shoes',
    imageUrl: undefined,
    lastWorn: '2 days ago',
    tags: ['Sport'],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: undefined },
  { id: 'shirts', label: 'Shirts', icon: ShirtIcon },
  { id: 't-shirts', label: 'T-Shirts', icon: Shirt },
  { id: 'jeans', label: 'Jeans', icon: JeansIcon },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
];

const WardrobeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadSheetVisible, setUploadSheetVisible] = useState(false);
  
  // For demo purposes, set to empty array to show empty state
  // Change to MOCK_CLOTHING_ITEMS to see the grid
  const [clothingItems] = useState(MOCK_CLOTHING_ITEMS);

  const filteredItems =
    selectedCategory === 'all'
      ? clothingItems
      : clothingItems.filter(
          item => item.category.toLowerCase() === selectedCategory
        );

  const handleTakePhoto = () => {
    console.log('Take photo');
    // TODO: Implement camera functionality
  };

  const handleUploadPhoto = () => {
    console.log('Upload photo');
    // TODO: Implement gallery picker
  };

  const handleClothingPress = (id: string) => {
    navigation.navigate('ClothingDetails', { itemId: id });
  };

  return (
    <Container pt={0}>
      <View className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <WardrobeHeader
            itemCount={clothingItems.length}
            onAddPress={() => setUploadSheetVisible(true)}
          />

          {clothingItems.length === 0 ? (
            /* Empty State */
            <EmptyWardrobe />
          ) : (
            <>
              {/* Category Chips */}
              <View className="mb-4">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="px-5"
                  contentContainerStyle={{ paddingRight: 20 }}>
                  {CATEGORIES.map(category => (
                    <CategoryChip
                      key={category.id}
                      label={category.label}
                      icon={category.icon}
                      isSelected={selectedCategory === category.id}
                      onPress={() => setSelectedCategory(category.id)}
                    />
                  ))}
                </ScrollView>
              </View>

              {/* Clothing Grid */}
              <View className="px-5">
                <View className="flex-row flex-wrap justify-between">
                  {filteredItems.map(item => (
                    <View key={item.id} className="w-[48%]">
                      <ClothingCard
                        id={item.id}
                        name={item.name}
                        category={item.category}
                        imageUrl={item.imageUrl}
                        lastWorn={item.lastWorn}
                        tags={item.tags}
                        onPress={() => handleClothingPress(item.id)}
                        onLongPress={() =>
                          console.log('Long press:', item.id)
                        }
                      />
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Bottom Padding for Tab Bar */}
          <View className="h-24" />
        </ScrollView>
      </View>

      {/* Upload Options Sheet */}
      <UploadOptionsSheet
        visible={uploadSheetVisible}
        onClose={() => setUploadSheetVisible(false)}
        onTakePhoto={handleTakePhoto}
        onUploadPhoto={handleUploadPhoto}
      />
    </Container>
  );
};

export default WardrobeScreen;
