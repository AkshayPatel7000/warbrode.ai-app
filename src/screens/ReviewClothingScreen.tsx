import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { X, Check, Trash2 } from 'lucide-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import Container from '../components/Container';
import ScreenHeader from '../components/common/ScreenHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from '../utils/toast';
import apiService from '../services/api.service';

type Props = NativeStackScreenProps<RootStackParamList, 'ReviewClothing'>;

const ReviewClothingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId, data, imageUri } = route.params;
  const gender = data.gender;
  console.log('🚀 ~ ReviewClothingScreen ~ route.params:', gender);

  const [isDeleting, setIsDeleting] = useState(false);
  const [clothingTypes, setClothingTypes] = useState<string[]>([]);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [styleTags, setStyleTags] = useState<string[]>([]);
  const [isLoadingAttributes, setIsLoadingAttributes] = useState(true);

  // Fetch clothing attributes from backend
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        setIsLoadingAttributes(true);
        const response = await apiService.getClothingAttributes(gender);
        console.log('🚀 ~ fetchAttributes ~ response:', response);

        const backendTypes = response.data.data.types || [];
        const backendPatterns = response.data.data.patterns || [];
        const backendTags = response.data.data.tags || [];

        // Merge backend data with params data to ensure params values are included
        // This handles cases where the AI detected a type/pattern/tag not in backend
        const mergedTypes = Array.from(
          new Set([...backendTypes, data.type]),
        ).filter(Boolean);

        const mergedPatterns = Array.from(
          new Set([...backendPatterns, data.pattern]),
        ).filter(Boolean);

        const mergedTags = Array.from(
          new Set([...backendTags, ...data.tags]),
        ).filter(Boolean);

        setClothingTypes(mergedTypes);
        setPatterns(mergedPatterns);
        setStyleTags(mergedTags);

        console.log('✅ Fetched attributes:', {
          types: mergedTypes,
          patterns: mergedPatterns,
          tags: mergedTags,
        });
      } catch (error: any) {
        console.error('❌ Error fetching attributes:', error);
        showErrorToast(
          'Error',
          error.userMessage || 'Failed to load clothing options',
        );

        // Fallback: use params data + default values
        const fallbackTypes = Array.from(
          new Set([
            data.type,
            'Shirt',
            'T-Shirt',
            'Jeans',
            'Jacket',
            'Dress',
            'Shoes',
            'Accessories',
          ]),
        ).filter(Boolean);

        const fallbackPatterns = Array.from(
          new Set([
            data.pattern,
            'Solid',
            'Striped',
            'Checked',
            'Floral',
            'Printed',
          ]),
        ).filter(Boolean);

        const fallbackTags = Array.from(
          new Set([
            ...data.tags,
            'Casual',
            'Formal',
            'Summer',
            'Winter',
            'Office',
            'Party',
            'Sport',
            'Street',
          ]),
        ).filter(Boolean);

        setClothingTypes(fallbackTypes);
        setPatterns(fallbackPatterns);
        setStyleTags(fallbackTags);
      } finally {
        setIsLoadingAttributes(false);
      }
    };

    fetchAttributes();
  }, [gender, data.type, data.pattern, data.tags]);

  const initialValues = {
    itemName: data.type,
    selectedType: data.type,
    selectedPattern: data.pattern,
    selectedColor: data.colorHex,
    selectedTags: data.tags,
    gender: gender,
  };

  const handleSave = async (values: typeof initialValues) => {
    try {
      // TODO: Update item in backend
      console.log('Updating item:', {
        id: itemId,
        name: values.itemName,
        type: values.selectedType,
        pattern: values.selectedPattern,
        color: values.selectedColor,
        tags: values.selectedTags,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Item updated successfully',
        visibilityTime: 2000,
        onHide: () => {
          // Navigate back to the main tabs
          navigation.navigate('MainTabs');
        },
      });
    } catch (error) {
      console.error('Error updating item:', error);
      showErrorToast('Error', 'Failed to update item. Please try again.');
    }
  };

  // Dynamic validation schema based on fetched attributes
  const clothingValidationSchema = Yup.object().shape({
    itemName: Yup.string()
      .min(2, 'Item name must be at least 2 characters')
      .max(50, 'Item name must be less than 50 characters')
      .required('Item name is required'),
    selectedType: Yup.string()
      .oneOf(
        clothingTypes.length > 0 ? clothingTypes : [''],
        'Please select a valid clothing type',
      )
      .required('Clothing type is required'),
    selectedPattern: Yup.string()
      .oneOf(
        patterns.length > 0 ? patterns : [''],
        'Please select a valid pattern',
      )
      .required('Pattern is required'),
    selectedColor: Yup.string().required('Color is required'),
    selectedTags: Yup.array()
      .of(Yup.string())
      .min(1, 'Please select at least one style tag')
      .required('Style tags are required'),
  });

  const handleDelete = () => {
    showWarningToast(
      'Delete Item',
      'Are you sure? This action cannot be undone.',
      4000,
    );

    // Show a confirmation after 500ms
    setTimeout(() => {
      setIsDeleting(true);
      // TODO: Delete from backend
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Deleted',
          text2: 'Item deleted successfully',
          visibilityTime: 2000,
          onHide: () => {
            navigation.navigate('MainTabs');
          },
        });
      }, 500);
    }, 500);
  };

  // Show loading state while fetching attributes
  if (isLoadingAttributes) {
    return (
      <Container pt={10}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#a3e635" />
          <Text className="text-slate-600 mt-4">Loading options...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container pt={10}>
      <View className="flex-1 ">
        <Formik
          initialValues={initialValues}
          validationSchema={clothingValidationSchema}
          onSubmit={handleSave}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <>
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                {/* Header */}
                <ScreenHeader
                  title="Review & Edit"
                  variant="center"
                  onBackPress={() => navigation.goBack()}
                  BackIcon={X}
                  titleSize="lg"
                  paddingTop={44}
                  paddingBottom={24}
                  customAction={
                    <TouchableOpacity
                      onPress={handleDelete}
                      className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm shadow-slate-200/50"
                      activeOpacity={0.7}
                      disabled={isDeleting}
                    >
                      <Trash2 size={18} color="#ef4444" />
                    </TouchableOpacity>
                  }
                />

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
                    Item Name *
                  </Text>
                  <TextInput
                    value={values.itemName}
                    onChangeText={text => setFieldValue('itemName', text)}
                    onBlur={() => setFieldTouched('itemName', true)}
                    placeholder="Enter item name"
                    placeholderTextColor="#94a3b8"
                    className={`bg-white rounded-2xl px-4 py-3 text-base text-slate-900 ${
                      touched.itemName && errors.itemName
                        ? 'border-2 border-red-400'
                        : 'border border-slate-200'
                    }`}
                  />
                  {touched.itemName && errors.itemName && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {String(errors.itemName)}
                    </Text>
                  )}
                </View>

                {/* Item Type */}
                <View className="px-5 mb-6">
                  <Text className="text-sm font-semibold text-slate-700 mb-3">
                    Type *
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                  >
                    {clothingTypes.map((type: string) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => {
                          setFieldValue('selectedType', type);
                          setFieldTouched('selectedType', true);
                        }}
                        className={`px-4 py-2 rounded-full mr-2 ${
                          values.selectedType === type
                            ? 'bg-lime-400'
                            : 'bg-white border border-slate-200'
                        }`}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`text-sm font-semibold ${
                            values.selectedType === type
                              ? 'text-slate-900'
                              : 'text-slate-600'
                          }`}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  {touched.selectedType && errors.selectedType && (
                    <Text className="text-red-500 text-xs mt-2 ml-1">
                      {String(errors.selectedType)}
                    </Text>
                  )}
                </View>

                {/* Pattern */}
                <View className="px-5 mb-6">
                  <Text className="text-sm font-semibold text-slate-700 mb-3">
                    Pattern *
                  </Text>
                  <View className="flex-row flex-wrap">
                    {patterns.map((pattern: string) => (
                      <TouchableOpacity
                        key={pattern}
                        onPress={() => {
                          setFieldValue('selectedPattern', pattern);
                          setFieldTouched('selectedPattern', true);
                        }}
                        className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
                          values.selectedPattern === pattern
                            ? 'bg-lime-400'
                            : 'bg-white border border-slate-200'
                        }`}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`text-sm font-medium ${
                            values.selectedPattern === pattern
                              ? 'text-slate-900'
                              : 'text-slate-600'
                          }`}
                        >
                          {pattern}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {touched.selectedPattern && errors.selectedPattern && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {String(errors.selectedPattern)}
                    </Text>
                  )}
                </View>

                {/* Color */}
                <View className="px-5 mb-6">
                  <Text className="text-sm font-semibold text-slate-700 mb-3">
                    Color
                  </Text>
                  <View className="flex-row items-center bg-white rounded-2xl p-4 border border-slate-200">
                    <View
                      className="w-10 h-10 rounded-full border-2 border-slate-200 mr-3"
                      style={{ backgroundColor: values.selectedColor }}
                    />
                    <Text className="text-base font-semibold text-slate-900">
                      {values.selectedColor}
                    </Text>
                  </View>
                </View>

                {/* Style Tags */}
                <View className="px-5 mb-6">
                  <Text className="text-sm font-semibold text-slate-700 mb-3">
                    Style Tags *
                  </Text>
                  <View className="flex-row flex-wrap">
                    {styleTags.map((tag: string) => (
                      <TouchableOpacity
                        key={tag}
                        onPress={() => {
                          const currentTags = values.selectedTags;
                          if (currentTags.includes(tag)) {
                            setFieldValue(
                              'selectedTags',
                              currentTags.filter(t => t !== tag),
                            );
                          } else {
                            setFieldValue('selectedTags', [
                              ...currentTags,
                              tag,
                            ]);
                          }
                          setFieldTouched('selectedTags', true);
                        }}
                        className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${
                          values.selectedTags.includes(tag)
                            ? 'bg-lime-100'
                            : 'bg-white border border-slate-200'
                        }`}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`text-sm font-medium ${
                            values.selectedTags.includes(tag)
                              ? 'text-lime-800'
                              : 'text-slate-600'
                          }`}
                        >
                          {tag}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {touched.selectedTags && errors.selectedTags && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {String(errors.selectedTags)}
                    </Text>
                  )}
                  <Text className="text-xs text-slate-500 mt-2">
                    {values.selectedTags.length} tag(s) selected
                  </Text>
                </View>

                {/* Bottom Padding */}
                <View className="h-32" />
              </ScrollView>

              {/* Action Bar */}
              <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-4 pb-8 ">
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  className="bg-lime-400 rounded-2xl py-3 flex-row items-center justify-center shadow-lg shadow-lime-400/30"
                  activeOpacity={0.7}
                  disabled={isSubmitting || isDeleting}
                >
                  <Check size={20} color="#0f172a" style={{ marginRight: 6 }} />
                  <Text className="text-base font-bold text-slate-900">
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default ReviewClothingScreen;
