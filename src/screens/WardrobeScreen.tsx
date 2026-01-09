import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Footprints, Shirt } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  View,
} from 'react-native';
import Container from '../components/Container';
import { JeansIcon, ShirtIcon } from '../components/icons/ClothingIcons';
import {
  CategoryChip,
  ClothingCard,
  EmptyWardrobe,
  UploadOptionsSheet,
  WardrobeHeader,
} from '../components/wardrobe';
import WardrobeScreenSkeleton from '../components/wardrobe/WardrobeScreenSkeleton';
import { RootStackParamList } from '../navigation/types';
import apiService from '../services/api.service';
import { ClothingItem } from '../types/api.types';
import { showErrorToast } from '../utils/toast';

type WardrobeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ClothingDetails'
>;

const CATEGORIES = [
  { id: 'all', label: 'All', icon: undefined },
  { id: 'shirt', label: 'Shirts', icon: ShirtIcon },
  { id: 't-shirts', label: 'T-Shirts', icon: Shirt },
  { id: 'jeans', label: 'Jeans', icon: JeansIcon },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
];

const WardrobeScreen = () => {
  const navigation = useNavigation<WardrobeScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadSheetVisible, setUploadSheetVisible] = useState(false);

  // API state
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch clothes from API
  const fetchClothes = useCallback(
    async (page: number = 1, refresh: boolean = false) => {
      try {
        if (refresh) {
          setIsRefreshing(true);
        } else if (page === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const params: any = {
          page,
          limit: 20,
          sort: 'createdAt',
          order: 'desc' as 'desc',
        };

        // Add category filter if not 'all'
        if (selectedCategory !== 'all') {
          params.type = selectedCategory;
        }

        console.log('📡 Fetching clothes with params:', params);
        const response = await apiService.getClothes(params);
        console.log('✅ Fetched clothes:', response.data);

        if (refresh || page === 1) {
          setClothingItems(response.data.items);
        } else {
          // Append for pagination
          setClothingItems(prev => [...prev, ...response.data.items]);
        }

        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setHasNextPage(response.data.hasNextPage);
        setTotalItems(response.data.total);
      } catch (error: any) {
        console.error('❌ Error fetching clothes:', error);
        showErrorToast(
          'Error',
          error.userMessage || 'Failed to load wardrobe items',
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
        setIsLoadingMore(false);
      }
    },
    [selectedCategory],
  );

  // Initial load
  useEffect(() => {
    fetchClothes(1);
  }, [fetchClothes, selectedCategory]);

  // Refresh handler
  const handleRefresh = useCallback(() => {
    fetchClothes(1, true);
  }, [fetchClothes]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasNextPage) {
      fetchClothes(currentPage + 1);
    }
  }, [isLoadingMore, hasNextPage, currentPage, fetchClothes]);

  const handleTakePhoto = useCallback(() => {
    console.log('Take photo');
    setUploadSheetVisible(false);
    // TODO: Implement camera functionality
  }, []);

  const handleUploadPhoto = useCallback(() => {
    console.log('Upload photo');
    setUploadSheetVisible(false);
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
          id={item._id}
          name={item.type}
          category={item.type}
          imageUrl={item.filePath}
          lastWorn={item.isDirty ? 'Needs wash' : 'Clean'}
          tags={item.tags}
          onPress={() => handleClothingPress(item._id)}
          onLongPress={() => console.log('Long press:', item._id)}
        />
      </View>
    ),
    [handleClothingPress],
  );

  const keyExtractor = useCallback((item: ClothingItem) => item._id, []);
  const categoryKeyExtractor = useCallback(
    (item: (typeof CATEGORIES)[0]) => item.id,
    [],
  );

  const renderListHeader = useCallback(
    () => (
      <>
        {/* Header */}
        <WardrobeHeader
          itemCount={totalItems}
          onAddPress={() => setUploadSheetVisible(true)}
        />

        {/* {clothingItems.length > 0 && ( */}

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
        {/* )} */}
      </>
    ),
    [totalItems, renderCategoryChip, categoryKeyExtractor],
  );

  const renderEmptyComponent = useCallback(() => {
    if (isLoading) {
      return null;
    }
    return <EmptyWardrobe />;
  }, [isLoading]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#a3e635" />
      </View>
    );
  }, [isLoadingMore]);

  // Show skeleton on initial load
  if (isLoading && !isRefreshing) {
    return (
      <Container pt={10}>
        <WardrobeScreenSkeleton />
      </Container>
    );
  }

  return (
    <Container pt={10}>
      <View className="flex-1">
        <FlatList
          data={clothingItems}
          renderItem={renderClothingItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          numColumns={2}
          columnWrapperStyle={
            clothingItems.length > 0 ? { paddingHorizontal: 20 } : undefined
          }
          contentContainerStyle={{
            paddingBottom: 96,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#a3e635']}
              tintColor="#a3e635"
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
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
