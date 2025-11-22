import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CreateStackParamList, 'CreateMain'>;

const CreateScreen: React.FC<Props> = ({ navigation }) => {
  const uploadImage = async (imageUri: string) => {
    try {
      // TODO: Upload to backend
      console.log('Uploading image:', imageUri);

      // Simulate upload
      // In real implementation, send to backend here
      // const response = await uploadToBackend(imageUri);

      // Navigate to status screen
      navigation.navigate('UploadStatus');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.didCancel) {
        console.log('User cancelled camera');
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open camera');
        return;
      }

      if (result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        await uploadImage(imageUri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to access camera');
    }
  };

  const handleUploadPhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open gallery');
        return;
      }

      if (result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        await uploadImage(imageUri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to access gallery');
    }
  };

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center px-5">
      <View className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 w-full max-w-md">
        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-lime-100 items-center justify-center mb-4">
            <Sparkles size={40} color="#a3e635" />
          </View>
          <Text className="text-2xl font-bold text-slate-900">
            Add to Wardrobe
          </Text>
          <Text className="text-sm text-slate-500 text-center mt-2">
            Capture or upload clothing items to your digital wardrobe
          </Text>
        </View>

        <View className="space-y-3 gap-3">
          <TouchableOpacity
            onPress={handleTakePhoto}
            className="flex-row items-center bg-lime-400 rounded-2xl p-4 shadow-sm"
            activeOpacity={0.8}
          >
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4">
              <Camera size={24} color="#0f172a" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-slate-900">
                Take Photo
              </Text>
              <Text className="text-xs text-slate-700">
                Capture with camera
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUploadPhoto}
            className="flex-row items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
            activeOpacity={0.8}
          >
            <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
              <ImageIcon size={24} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-slate-900">
                Upload Photo
              </Text>
              <Text className="text-xs text-slate-500">
                Choose from gallery
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateScreen;
