import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

interface UploadOptionsSheetProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onUploadPhoto: () => void;
}

const UploadOptionsSheet: React.FC<UploadOptionsSheetProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onUploadPhoto,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl px-5 pt-4 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-slate-900">
              Upload new clothes
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center"
              activeOpacity={0.7}>
              <X size={18} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View className="gap-3">
            {/* Take Photo Option */}
            <TouchableOpacity
              onPress={() => {
                onTakePhoto();
                onClose();
              }}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#a3e635', '#84cc16']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-2xl p-5 flex-row items-center shadow-md shadow-lime-400/30">
                <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
                  <Camera size={24} color="#ffffff" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-white">
                    Take Photo
                  </Text>
                  <Text className="text-sm text-white/80 mt-1">
                    Use your camera to capture
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Upload Photo Option */}
            <TouchableOpacity
              onPress={() => {
                onUploadPhoto();
                onClose();
              }}
              activeOpacity={0.8}>
              <View className="bg-white border-2 border-slate-200 rounded-2xl p-5 flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
                  <ImageIcon size={24} color="#64748b" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-900">
                    Upload Photo
                  </Text>
                  <Text className="text-sm text-slate-500 mt-1">
                    Choose from gallery
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UploadOptionsSheet;
