import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Alert,
  ListRenderItem,
} from 'react-native';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Edit2,
  Plus,
  X,
  Check,
} from 'lucide-react-native';
import Container from '../components/Container';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { CreateStackParamList, RootStackParamList } from '../navigation/types';
import UploadOptionsSheet from '../components/upload/UploadOptionsSheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ScreenHeader from '../components/common/ScreenHeader';
import ApiService from '../services/api.service';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import type { ApiErrorExtended } from '../types/error.types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<CreateStackParamList, 'UploadStatus'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface UploadItem {
  id: string;
  imageUri: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedAt: Date;
  processedData?: {
    type: string;
    colorHex: string;
    pattern: string;
    tags: string[];
    gender: string | null;
  };
  error?: string;
}

const UploadStatusScreen: React.FC<Props> = ({ navigation, route }) => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [uploadSheetVisible, setUploadSheetVisible] = useState(false);
  const [confirmImageVisible, setConfirmImageVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pollingIntervals, setPollingIntervals] = useState<
    Map<string, NodeJS.Timeout>
  >(new Map());

  // Get uploadId from route params if navigated from CreateScreen
  const newUploadId = route.params?.uploadId;

  /**
   * Load upload history from API
   */
  const loadUploadHistory = useCallback(async () => {
    try {
      const response = await ApiService.getUploadHistory({
        page: 1,
        limit: 50,
        status: 'all',
        sort: 'newest',
      });

      const uploadItems: UploadItem[] = response.data.uploads.map(upload => ({
        id: upload.id,
        imageUri: 'https://ql0rfdpp-4000.inc1.devtunnels.ms/' + upload.imageUrl,
        status: upload.status,
        uploadedAt: new Date(upload.uploadedAt),
        processedData: upload.processedData,
        error: undefined,
      }));
      console.log('🚀 ~ UploadStatusScreen ~ uploadItems:', uploadItems);

      setUploads(uploadItems);

      // Start polling for processing items
      uploadItems.forEach(item => {
        if (item.status === 'pending' || item.status === 'processing') {
          startPolling(item.id);
        }
      });
    } catch (error) {
      console.error('Failed to load upload history:', error);
      showErrorToast('Error', 'Failed to load upload history');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  /**
   * Start polling for a specific upload
   */
  const startPolling = useCallback(
    (uploadId: string) => {
      // Don't start if already polling
      if (pollingIntervals.has(uploadId)) return;

      let attempts = 0;
      const maxAttempts = 30; // 60 seconds max (30 * 2s)

      const interval = setInterval(async () => {
        attempts++;

        if (attempts > maxAttempts) {
          clearInterval(interval);
          setPollingIntervals(prev => {
            const newMap = new Map(prev);
            newMap.delete(uploadId);
            return newMap;
          });
          return;
        }

        try {
          const response = await ApiService.getUploadStatus(uploadId);
          const { status, processedData, error } = response.data.data;

          console.log(`📊 Polling ${uploadId} - Status: ${status}`);
          console.log(`📊 ProcessedData:`, processedData);

          // Update upload in state
          setUploads(prev =>
            prev.map(upload =>
              upload.id === uploadId
                ? {
                    ...upload,
                    status,
                    processedData: processedData || undefined,
                    error: error || undefined,
                  }
                : upload,
            ),
          );

          // Stop polling if completed or failed
          if (status === 'completed' || status === 'failed') {
            clearInterval(interval);
            setPollingIntervals(prev => {
              const newMap = new Map(prev);
              newMap.delete(uploadId);
              return newMap;
            });
          }
        } catch (error) {
          console.error(`Failed to poll status for ${uploadId}:`, error);
        }
      }, 2000); // Poll every 2 seconds

      setPollingIntervals(prev => new Map(prev).set(uploadId, interval));
    },
    [pollingIntervals],
  );

  /**
   * Stop all polling intervals
   */
  const stopAllPolling = useCallback(() => {
    pollingIntervals.forEach(interval => clearInterval(interval));
    setPollingIntervals(new Map());
  }, [pollingIntervals]);

  /**
   * Initial load and cleanup
   */
  useEffect(() => {
    loadUploadHistory();

    return () => {
      stopAllPolling();
    };
  }, []);

  /**
   * Handle new upload from route params
   */
  useEffect(() => {
    if (newUploadId) {
      // Add new upload to the list
      const newUpload: UploadItem = {
        id: newUploadId,
        imageUri: '',
        status: 'pending',
        uploadedAt: new Date(),
      };

      setUploads(prev => [newUpload, ...prev]);
      startPolling(newUploadId);
    }
  }, [newUploadId]);

  const onRefresh = () => {
    setRefreshing(true);
    stopAllPolling();
    loadUploadHistory();
  };

  const handleTakePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open camera');
        return;
      }

      if (result.assets && result.assets[0] && result.assets[0].uri) {
        setSelectedImageUri(result.assets[0].uri);
        setConfirmImageVisible(true);
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
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open gallery');
        return;
      }

      if (result.assets && result.assets[0] && result.assets[0].uri) {
        setSelectedImageUri(result.assets[0].uri);
        setConfirmImageVisible(true);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to access gallery');
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedImageUri) return;

    try {
      console.log('🔌 Testing backend connectivity...');

      // Test connectivity first
      try {
        await ApiService.getUploadHistory({ page: 1, limit: 1 });
        console.log('✅ Backend is reachable');
      } catch (connectError) {
        console.error('❌ Backend connectivity test failed:', connectError);
        throw new Error(
          'Cannot reach backend server. Please check your connection.',
        );
      }

      console.log('📤 Uploading image with blob util:', selectedImageUri);

      // Use blob-based upload (more reliable for React Native)
      let uploadId: string;
      try {
        const response = await ApiService.uploadClothingImageWithBlob(
          selectedImageUri,
          'clothing.jpg',
        );
        console.log('🚀 Blob upload response:', response);
        uploadId = response.uploadId;
      } catch (blobError) {
        console.warn(
          '⚠️ Blob upload failed, trying FormData method:',
          blobError,
        );

        // Fallback to FormData method
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImageUri,
          type: 'image/jpeg',
          name: 'clothing.jpg',
        } as any);

        const axiosResponse = await ApiService.uploadClothingImage(formData);
        console.log('🚀 FormData upload response:', axiosResponse);
        uploadId = axiosResponse.data.uploadId;
      }

      // Close confirmation modal
      setConfirmImageVisible(false);
      setSelectedImageUri(null);

      // Add to uploads list
      const newUpload: UploadItem = {
        id: uploadId,
        imageUri: selectedImageUri,
        status: 'pending',
        uploadedAt: new Date(),
      };

      setUploads(prev => [newUpload, ...prev]);

      // Start polling for this upload
      startPolling(uploadId);

      // Show success message
      showSuccessToast('Success', 'Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      const apiError = error as ApiErrorExtended;
      console.error('API Error message:', apiError.userMessage);
      console.error('API Error status:', apiError.statusCode);

      // Show more specific error message
      let errorMessage = apiError.userMessage || 'Failed to upload image';
      if (apiError.isNetworkError) {
        errorMessage =
          'Network error. Please check your internet connection and ensure the backend server is running.';
      }

      showErrorToast('Upload Failed', errorMessage);
    }
  };

  const handleCancelUpload = () => {
    setConfirmImageVisible(false);
    setSelectedImageUri(null);
  };

  const getStatusIcon = (status: UploadItem['status']) => {
    switch (status) {
      case 'processing':
        return <Clock size={20} color="#f59e0b" />;
      case 'completed':
        return <CheckCircle size={20} color="#22c55e" />;
      case 'failed':
        return <AlertCircle size={20} color="#ef4444" />;
    }
  };

  const getStatusText = (status: UploadItem['status']) => {
    switch (status) {
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Ready to review';
      case 'failed':
        return 'Failed';
    }
  };

  const getStatusColor = (status: UploadItem['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-amber-100';
      case 'completed':
        return 'bg-green-100';
      case 'failed':
        return 'bg-red-100';
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleReview = useCallback(
    (item: UploadItem) => {
      console.log('🚀 ~ UploadStatusScreen ~ item.status:', item);
      console.log(
        '🚀 ~ UploadStatusScreen ~ item.processedData:',
        item.processedData,
      );
      console.log(
        '🚀 ~ UploadStatusScreen ~ item:',
        JSON.stringify(item, null, 2),
      );

      if (item.status === 'completed' && item.processedData) {
        console.log('✅ Navigating to ReviewClothing with:', {
          itemId: item.id,
          data: item.processedData,
          imageUri: item.imageUri,
        });

        try {
          navigation.navigate('ReviewClothing', {
            itemId: item.id,
            data: item.processedData,
            imageUri: item.imageUri,
          });
        } catch (navError) {
          console.error('❌ Navigation error:', navError);
        }
      } else {
        console.warn(
          '⚠️ Cannot navigate - status:',
          item.status,
          'hasData:',
          !!item.processedData,
        );
      }
    },
    [navigation],
  );

  const renderUploadItem: ListRenderItem<UploadItem> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => handleReview(item)}
        disabled={item.status !== 'completed'}
        activeOpacity={0.7}
        className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-slate-200/50"
      >
        <View className="flex-row">
          {/* Image Preview */}
          <View className="w-20 h-20 rounded-xl bg-slate-100 items-center justify-center mr-3">
            {item.imageUri ? (
              <Image
                source={{ uri: item.imageUri }}
                className="w-full h-full rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-3xl">👕</Text>
            )}
          </View>

          {/* Info */}
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-2">
              <View
                className={`flex-row items-center px-2 py-1 rounded-full ${getStatusColor(
                  item.status,
                )}`}
              >
                {getStatusIcon(item.status)}
                <Text className="text-xs font-semibold text-slate-900 ml-1">
                  {getStatusText(item.status)}
                </Text>
              </View>
              <Text className="text-xs text-slate-400">
                {getTimeAgo(item.uploadedAt)}
              </Text>
            </View>

            {item.status === 'completed' && item.processedData && (
              <View>
                <Text className="text-base font-semibold text-slate-900 mb-1">
                  {item.processedData.type.charAt(0).toUpperCase() +
                    item.processedData.type.slice(1)}
                </Text>
                <View className="flex-row flex-wrap gap-1">
                  {item.processedData.tags.slice(0, 2).map((tag, idx) => (
                    <View
                      key={idx}
                      className="bg-lime-100 rounded-full px-2 py-0.5"
                    >
                      <Text className="text-xs text-lime-800">{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {item.status === 'processing' && (
              <Text className="text-sm text-slate-600">
                AI is analyzing your item...
              </Text>
            )}

            {item.status === 'failed' && (
              <Text className="text-sm text-red-600">
                {item.error || 'Processing failed'}
              </Text>
            )}
          </View>

          {/* Review Button */}
          {item.status === 'completed' && (
            <View className="justify-center ml-2">
              <View className="w-8 h-8 rounded-full bg-lime-100 items-center justify-center">
                <Edit2 size={16} color="#84cc16" />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    ),
    [handleReview],
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View className="items-center justify-center py-20">
        <View className="w-20 h-20 rounded-full bg-slate-100 items-center justify-center mb-4">
          <Clock size={32} color="#94a3b8" />
        </View>
        <Text className="text-lg font-semibold text-slate-900 mb-2">
          No uploads yet
        </Text>
        <Text className="text-sm text-slate-500 text-center">
          Upload your first clothing item to get started
        </Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: UploadItem) => item.id, []);

  const processingCount = uploads.filter(u => u.status === 'processing').length;
  const completedCount = uploads.filter(u => u.status === 'completed').length;

  return (
    <Container pt={10}>
      <View className="flex-1">
        {/* Header */}
        <ScreenHeader
          title="Upload Status"
          subtitle={
            processingCount > 0
              ? `${processingCount} item${processingCount > 1 ? 's' : ''} processing`
              : completedCount > 0
                ? `${completedCount} item${completedCount > 1 ? 's' : ''} ready to review`
                : 'No recent uploads'
          }
          ActionIcon={Plus}
          onActionPress={() => setUploadSheetVisible(true)}
          paddingTop={64}
          paddingBottom={24}
          paddingHorizontal={20}
        />

        <FlatList
          data={uploads}
          renderItem={renderUploadItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 96 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      {/* Upload Options Sheet */}
      <UploadOptionsSheet
        visible={uploadSheetVisible}
        onClose={() => setUploadSheetVisible(false)}
        onTakePhoto={handleTakePhoto}
        onUploadPhoto={handleUploadPhoto}
      />

      {/* Image Confirmation Modal */}
      <Modal
        visible={confirmImageVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelUpload}
      >
        <View className="flex-1 bg-black/70 justify-center items-center px-5">
          <View className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
            {/* Image Preview */}
            <View className="w-full aspect-square bg-slate-100">
              {selectedImageUri && (
                <Image
                  source={{ uri: selectedImageUri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              )}
            </View>

            {/* Confirmation Text */}
            <View className="p-6">
              <Text className="text-xl font-bold text-slate-900 mb-2 text-center">
                Upload this image?
              </Text>
              <Text className="text-sm text-slate-500 text-center mb-6">
                AI will analyze this clothing item and add it to your wardrobe
              </Text>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleCancelUpload}
                  className="flex-1 bg-white border border-slate-300 rounded-2xl py-3 items-center"
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center">
                    <X size={18} color="#64748b" style={{ marginRight: 6 }} />
                    <Text className="text-base font-semibold text-slate-700">
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleConfirmUpload}
                  className="flex-1 bg-lime-400 rounded-2xl py-3 items-center"
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center">
                    <Check
                      size={18}
                      color="#0f172a"
                      style={{ marginRight: 6 }}
                    />
                    <Text className="text-base font-bold text-slate-900">
                      Upload
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default UploadStatusScreen;
