import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { X, Check, Trash2 } from 'lucide-react-native';
import Container from '../components/Container';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CreateStackParamList, 'ReviewClothing'>;

const CLOTHING_TYPES = [
  'Shirt',
  'T-Shirt',
  'Jeans',
  'Jacket',
  'Dress',
  'Shoes',
  'Accessories',
];
const PATTERNS = ['Solid', 'Striped', 'Checked', 'Floral', 'Printed'];
const STYLE_TAGS = [
  'Casual',
  'Formal',
  'Summer',
  'Winter',
  'Office',
  'Party',
  'Sport',
  'Street',
];

const ReviewClothingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId, data, imageUri } = route.params;

  const [itemName, setItemName] = useState(data.name);
  const [selectedType, setSelectedType] = useState(data.type);
  const [selectedPattern, setSelectedPattern] = useState(data.pattern);
  const [selectedColor] = useState(data.color);
  const [selectedTags, setSelectedTags] = useState<string[]>(data.tags);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    // TODO: Update item in backend
    console.log('Updating item:', {
      id: itemId,
      name: itemName,
      type: selectedType,
      pattern: selectedPattern,
      tags: selectedTags,
    });

    Alert.alert('Success', 'Item updated successfully', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('CreateMain'),
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          // TODO: Delete from backend
          navigation.navigate('CreateMain');
        },
      },
    ]);
  };

  return (
    <Container pt={10}>
      <View className="flex-1 pt-12">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm shadow-slate-200/50"
            >
              <X size={20} color="#0f172a" />
            </TouchableOpacity>
            <Text className="text-base font-semibold text-slate-900">
              Review & Edit
            </Text>
            <TouchableOpacity
              onPress={handleDelete}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm shadow-slate-200/50"
            >
              <Trash2 size={18} color="#ef4444" />
            </TouchableOpacity>
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
                  <Text className="text-5xl">👕</Text>
                )}
              </View>
            </View>
          </View>

          {/* Item Name */}
          <View className="px-5 mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-2">
              Item Name
            </Text>
            <TextInput
              value={itemName}
              onChangeText={setItemName}
              placeholder="Enter item name"
              placeholderTextColor="#94a3b8"
              className="bg-white rounded-2xl px-4 py-3 text-base text-slate-900 border border-slate-200"
            />
          </View>

          {/* Item Type */}
          <View className="px-5 mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-3">
              Type
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {CLOTHING_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full mr-2 ${
                    selectedType === type
                      ? 'bg-lime-400'
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedType === type
                        ? 'text-slate-900'
                        : 'text-slate-600'
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Pattern */}
          <View className="px-5 mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-3">
              Pattern
            </Text>
            <View className="flex-row flex-wrap">
              {PATTERNS.map(pattern => (
                <TouchableOpacity
                  key={pattern}
                  onPress={() => setSelectedPattern(pattern)}
                  className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
                    selectedPattern === pattern
                      ? 'bg-lime-400'
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedPattern === pattern
                        ? 'text-slate-900'
                        : 'text-slate-600'
                    }`}
                  >
                    {pattern}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color */}
          <View className="px-5 mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-3">
              Color
            </Text>
            <View className="flex-row items-center bg-white rounded-2xl p-4 border border-slate-200">
              <View
                className="w-10 h-10 rounded-full border-2 border-slate-200 mr-3"
                style={{ backgroundColor: selectedColor }}
              />
              <Text className="text-base font-semibold text-slate-900">
                {selectedColor}
              </Text>
            </View>
          </View>

          {/* Style Tags */}
          <View className="px-5 mb-6">
            <Text className="text-sm font-semibold text-slate-700 mb-3">
              Style Tags
            </Text>
            <View className="flex-row flex-wrap">
              {STYLE_TAGS.map(tag => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
                    selectedTags.includes(tag)
                      ? 'bg-lime-100'
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedTags.includes(tag)
                        ? 'text-lime-800'
                        : 'text-slate-600'
                    }`}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Padding */}
          <View className="h-32" />
        </ScrollView>

        {/* Action Bar */}
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-4 pb-8 ">
          <TouchableOpacity
            onPress={handleSave}
            className="bg-lime-400 rounded-2xl py-3 flex-row items-center justify-center"
          >
            <Check size={20} color="#0f172a" style={{ marginRight: 6 }} />
            <Text className="text-base font-bold text-slate-900">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default ReviewClothingScreen;
