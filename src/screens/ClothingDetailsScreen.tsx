import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  TopBar,
  HeroImageCard,
  ItemSummary,
  AttributeList,
  TagChipRow,
  ActionButtonRow,
} from '../components/clothing';
import Container from '../components/Container';
import { WardrobeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<WardrobeStackParamList, 'ClothingDetails'>;

const ClothingDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId } = route.params;

  // Mock data - replace with actual data from Redux/API
  const [clothingItem, setClothingItem] = useState({
    id: itemId,
    name: 'Green Casual Shirt',
    category: 'Shirts',
    imageUrl: undefined,
    isClean: true,
    lastWorn: '3 days ago',
    attributes: [
      { label: 'Color', value: 'Green', color: '#22c55e' },
      { label: 'Pattern', value: 'Solid' },
      { label: 'Style', value: 'Casual' },
      { label: 'Season', value: 'Summer' },
    ],
    tags: ['Casual', 'Summer', 'Outdoor'],
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMore = () => {
    Alert.alert(
      'Options',
      'Choose an action',
      [
        { text: 'Edit Item', onPress: () => console.log('Edit') },
        { text: 'Duplicate', onPress: () => console.log('Duplicate') },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleToggleClean = () => {
    setClothingItem(prev => ({
      ...prev,
      isClean: !prev.isClean,
    }));
  };

  const handleUseInOutfit = () => {
    console.log('Use in outfit generation');
    // TODO: Navigate to outfit generation screen with this item pre-selected
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Item deleted');
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Container pt={10}>
      <View className="flex-1 pb-10">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Top Bar */}
          <TopBar
            // title="Item details"
            onBackPress={handleBack}
            onMorePress={handleMore}
          />

          {/* Hero Image */}
          <HeroImageCard
            imageUrl={clothingItem.imageUrl}
            isClean={clothingItem.isClean}
          />

          {/* Item Summary */}
          <ItemSummary
            name={clothingItem.name}
            category={clothingItem.category}
            isClean={clothingItem.isClean}
            lastWorn={clothingItem.lastWorn}
          />

          {/* Attributes */}
          <AttributeList attributes={clothingItem.attributes} />

          {/* Tags */}
          <TagChipRow tags={clothingItem.tags} />

          {/* Action Buttons */}
          <ActionButtonRow
            isClean={clothingItem.isClean}
            onToggleClean={handleToggleClean}
            onUseInOutfit={handleUseInOutfit}
            onDelete={handleDelete}
          />

          {/* Bottom Padding */}
          <View className="h-8" />
        </ScrollView>
      </View>
    </Container>
  );
};

export default ClothingDetailsScreen;
