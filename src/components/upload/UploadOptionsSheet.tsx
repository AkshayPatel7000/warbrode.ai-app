import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native';

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
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 justify-end bg-black/50">
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View className="bg-white rounded-t-3xl px-5 pt-2 pb-8">
            {/* Handle Bar */}
            <View className="items-center py-2">
              <View className="w-12 h-1 rounded-full bg-slate-300" />
            </View>

            {/* Title */}
            <Text className="text-xl font-bold text-slate-900 mb-6">
              Upload new clothes
            </Text>

            {/* Options */}
            <View className="gap-3">
              {/* Take Photo Option */}
              <TouchableOpacity
                onPress={() => {
                  onTakePhoto();
                  onClose();
                }}
                activeOpacity={0.8}
                className="flex-row items-center bg-lime-400 rounded-2xl p-4 shadow-sm">
                <View className="w-12 h-12 rounded-full bg-white/30 items-center justify-center mr-4">
                  <Camera size={24} color="#0f172a" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-900">
                    Take Photo
                  </Text>
                  <Text className="text-sm text-slate-700 mt-0.5">
                    Use your camera
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Upload Photo Option */}
              <TouchableOpacity
                onPress={() => {
                  onUploadPhoto();
                  onClose();
                }}
                activeOpacity={0.8}
                className="flex-row items-center bg-white border-2 border-slate-200 rounded-2xl p-4">
                <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
                  <ImageIcon size={24} color="#64748b" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-900">
                    Upload Photo
                  </Text>
                  <Text className="text-sm text-slate-500 mt-0.5">
                    Choose from gallery
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default UploadOptionsSheet;
