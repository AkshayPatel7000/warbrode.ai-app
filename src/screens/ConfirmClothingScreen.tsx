import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { X, Check } from 'lucide-react-native';
import Container from '../components/Container';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// This will need to be added to navigation types
type Props = any; // Replace with proper navigation types

interface AITag {
  label: string;
  selected: boolean;
}

const CLOTHING_TYPES = ['Shirt', 'T-Shirt', 'Jeans', 'Jacket', 'Dress', 'Shoes', 'Accessories'];
const PATTERNS = ['Solid', 'Striped', 'Checked', 'Floral', 'Printed'];
const STYLE_TAGS = ['Casual', 'Formal', 'Summer', 'Winter', 'Office', 'Party', 'Sport', 'Street'];

const ConfirmClothingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { imageUri } = route?.params || {};
  
  const [itemName, setItemName] = useState('');
  const [selectedType, setSelectedType] = useState('Shirt');
  const [selectedPattern, setSelectedPattern] = useState('Solid');
  const [selectedColor, setSelectedColor] = useState('#22c55e');
  const [colorName, setColorName] = useState('Green');
  const [styleTags, setStyleTags] = useState<AITag[]>(
    STYLE_TAGS.map(tag => ({ label: tag, selected: tag === 'Casual' }))
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleStyleTag = (index: number) => {
    const newTags = [...styleTags];
    newTags[index].selected = !newTags[index].selected;
    setStyleTags(newTags);
  };

  const handleSave = () => {
    const selectedStyles = styleTags.filter(tag => tag.selected).map(tag => tag.label);
    
    // TODO: Save to backend/Redux
    console.log('Saving item:', {
      name: itemName || `${colorName} ${selectedType}`,
      type: selectedType,
      pattern: selectedPattern,
      color: selectedColor,
      colorName,
      tags: selectedStyles,
      imageUri,
    });

    // Show success and navigate back
    Alert.alert('Success', 'Added to your wardrobe', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Wardrobe'),
      },
    ]);
  };

  const handleDiscard = () => {
    Alert.alert(
      'Discard Item',
      'Are you sure you want to discard this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <Container pt={10}>
      <View className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
            <TouchableOpacity
              onPress={handleDiscard}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm shadow-slate-200/50">
              <X size={20} color="#0f172a" />
            </TouchableOpacity>
            <Text className="text-base font-semibold text-slate-900">
              New Item
            </Text>
            <View className="w-10" />
          </View>

          {/* Image Preview */}
          <View className="mx-5 mb-6">
            <View className="bg-white rounded-3xl shadow-md shadow-slate-200/50 overflow-hidden">
              <View className="w-full aspect-square bg-slate-100 items-center justify-center">
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="items-center">
                    <Text className="text-5xl mb-2">👕</Text>
                    <Text className="text-sm text-slate-400">No Image</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* AI Analyzing Banner */}
          {isAnalyzing && (
            <View className="mx-5 mb-4 bg-lime-100 rounded-2xl p-3 flex-row items-center">
              <View className="w-6 h-6 rounded-full bg-lime-400 mr-3" />
              <Text className="text-sm font-medium text-lime-900">
                Analyzing your item...
              </Text>
            </View>
          )}

          {/* Item Name */}
          <View className="px-5 mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-2">
              Item Name (Optional)
            </Text>
            <TextInput
              value={itemName}
              onChangeText={setItemName}
              placeholder={`${colorName} ${selectedType}`}
              placeholderTextColor="#94a3b8"
              className="bg-white rounded-2xl px-4 py-3 text-base text-slate-900 border border-slate-200"
            />
          </View>

          {/* Item Type */}
          <View className="px-5 mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-3">
              Item Type
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}>
              {CLOTHING_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full mr-2 ${
                    selectedType === type
                      ? 'bg-lime-400'
                      : 'bg-white border border-slate-200'
                  }`}>
                  <Text
                    className={`text-sm font-semibold ${
                      selectedType === type ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* AI Details Section */}
          <View className="mx-5 mb-6 bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/50">
            <Text className="text-base font-bold text-slate-900 mb-4">
              AI Details
            </Text>

            {/* Color */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-slate-600 mb-2">
                Color
              </Text>
              <View className="flex-row items-center">
                <View
                  className="w-8 h-8 rounded-full border-2 border-slate-200 mr-3"
                  style={{ backgroundColor: selectedColor }}
                />
                <Text className="text-base font-semibold text-slate-900">
                  {colorName}
                </Text>
              </View>
            </View>

            {/* Pattern */}
            <View>
              <Text className="text-sm font-medium text-slate-600 mb-2">
                Pattern
              </Text>
              <View className="flex-row flex-wrap">
                {PATTERNS.map((pattern) => (
                  <TouchableOpacity
                    key={pattern}
                    onPress={() => setSelectedPattern(pattern)}
                    className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
                      selectedPattern === pattern
                        ? 'bg-lime-400'
                        : 'bg-slate-100'
                    }`}>
                    <Text
                      className={`text-sm font-medium ${
                        selectedPattern === pattern
                          ? 'text-slate-900'
                          : 'text-slate-600'
                      }`}>
                      {pattern}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Style Tags */}
          <View className="px-5 mb-6">
            <Text className="text-base font-bold text-slate-900 mb-3">
              Style Tags
            </Text>
            <View className="flex-row flex-wrap">
              {styleTags.map((tag, index) => (
                <TouchableOpacity
                  key={tag.label}
                  onPress={() => toggleStyleTag(index)}
                  className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
                    tag.selected ? 'bg-lime-100' : 'bg-white border border-slate-200'
                  }`}>
                  <Text
                    className={`text-sm font-medium ${
                      tag.selected ? 'text-lime-800' : 'text-slate-600'
                    }`}>
                    {tag.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Padding */}
          <View className="h-32" />
        </ScrollView>

        {/* Action Bar */}
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-4">
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleDiscard}
              className="flex-1 bg-white border border-slate-300 rounded-2xl py-3 items-center">
              <Text className="text-base font-semibold text-slate-700">
                Discard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-lime-400 rounded-2xl py-3 flex-row items-center justify-center">
              <Check size={20} color="#0f172a" style={{ marginRight: 6 }} />
              <Text className="text-base font-bold text-slate-900">
                Save to Wardrobe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ConfirmClothingScreen;
