import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Image, Sparkles } from 'lucide-react-native';

const CreateScreen = () => {
    return (
        <View className="flex-1 bg-slate-50 items-center justify-center px-5">
            <View className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 w-full max-w-md">
                <View className="items-center mb-6">
                    <View className="w-20 h-20 rounded-full bg-lime-100 items-center justify-center mb-4">
                        <Sparkles size={40} color="#a3e635" />
                    </View>
                    <Text className="text-2xl font-bold text-slate-900">Add to Wardrobe</Text>
                    <Text className="text-sm text-slate-500 text-center mt-2">
                        Capture or upload clothing items to your digital wardrobe
                    </Text>
                </View>

                <View className="space-y-3 gap-3">
                    <TouchableOpacity className="flex-row items-center bg-lime-400 rounded-2xl p-4 shadow-sm">
                        <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4">
                            <Camera size={24} color="#0f172a" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-slate-900">Take Photo</Text>
                            <Text className="text-xs text-slate-700">Capture with camera</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
                            <Image size={24} color="#64748b" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-slate-900">Upload Photo</Text>
                            <Text className="text-xs text-slate-500">Choose from gallery</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateScreen;
