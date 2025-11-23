import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ListRenderItem,
} from 'react-native';
import { Footprints, Shirt } from 'lucide-react-native';
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
import {
  ShirtIcon,
  TShirtIcon,
  JeansIcon,
} from '../components/icons/ClothingIcons';

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  lastWorn: string;
  tags: string[];
}

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

const WardrobeScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadSheetVisible, setUploadSheetVisible] = useState(false);

  // For demo purposes, set to empty array to show empty state
  // Change to MOCK_CLOTHING_ITEMS to see the grid
  const [clothingItems] = useState<ClothingItem[]>(MOCK_CLOTHING_ITEMS);

  const filteredItems = useMemo(
    () =>
      selectedCategory === 'all'
        ? clothingItems
        : clothingItems.filter(
            item => item.category.toLowerCase() === selectedCategory,
          ),
    [selectedCategory, clothingItems],
  );

  const handleTakePhoto = useCallback(() => {
    console.log('Take photo');
    // TODO: Implement camera functionality
  }, []);

  const handleUploadPhoto = useCallback(() => {
    console.log('Upload photo');
    // TODO: Implement gallery picker
  }, []);

  const handleClothingPress = useCallback(
    (id: string) => {
      navigation.navigate('ClothingDetails', { itemId: id });
    },
    [navigation],
  );

  const renderCategoryChip = useCallback(
    ({ item: category }: { item: (typeof CATEGORIES)[0] }) => (
      <CategoryChip
        label={category.label}
        icon={category.icon}
        isSelected={selectedCategory === category.id}
        onPress={() => setSelectedCategory(category.id)}
      />
    ),
    [selectedCategory],
  );

  const renderClothingItem: ListRenderItem<ClothingItem> = useCallback(
    ({ item, index }) => (
      <View
        className="w-[48%]"
        style={{ marginBottom: 12, marginRight: index % 2 === 0 ? 12 : 0 }}
      >
        <ClothingCard
          id={item.id}
          name={item.name}
          category={item.category}
          imageUrl={item.imageUrl}
          lastWorn={item.lastWorn}
          tags={item.tags}
          onPress={() => handleClothingPress(item.id)}
          onLongPress={() => console.log('Long press:', item.id)}
        />
      </View>
    ),
    [handleClothingPress],
  );

  const keyExtractor = useCallback((item: ClothingItem) => item.id, []);
  const categoryKeyExtractor = useCallback(
    (item: (typeof CATEGORIES)[0]) => item.id,
    [],
  );

  const renderListHeader = useCallback(
    () => (
      <>
        {/* Header */}
        <WardrobeHeader
          itemCount={clothingItems.length}
          onAddPress={() => setUploadSheetVisible(true)}
        />

        {clothingItems.length > 0 && (
          /* Category Chips */
          <View className="mb-4">
            <FlatList
              horizontal
              data={CATEGORIES}
              renderItem={renderCategoryChip}
              keyExtractor={categoryKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingRight: 40,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            />
          </View>
        )}
      </>
    ),
    [clothingItems.length, renderCategoryChip, categoryKeyExtractor],
  );

  const renderEmptyComponent = useCallback(() => <EmptyWardrobe />, []);

  return (
    <Container pt={10}>
      <View className="flex-1">
        <FlatList
          data={clothingItems.length === 0 ? [] : filteredItems}
          renderItem={renderClothingItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyComponent}
          numColumns={2}
          columnWrapperStyle={
            clothingItems.length > 0 ? { paddingHorizontal: 20 } : undefined
          }
          contentContainerStyle={{
            paddingBottom: 96,
          }}
          showsVerticalScrollIndicator={false}
        />
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
