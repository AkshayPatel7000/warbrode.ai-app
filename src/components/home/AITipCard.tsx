import React from 'react';
import { View, Text } from 'react-native';
import { Lightbulb } from 'lucide-react-native';

interface AITipCardProps {
    tip?: string;
}

const AITipCard: React.FC<AITipCardProps> = ({
    tip = 'Try mixing your neutral tops with colorful bottoms for a fresh look!',
}) => {
    return (
        <View className="bg-gradient-to-r from-lime-50 to-lime-100 rounded-2xl p-4 mx-5 mt-4 flex-row items-start">
            {/* Lightbulb Icon */}
            <View className="w-10 h-10 rounded-full bg-lime-400 items-center justify-center mr-3">
                <Lightbulb size={20} color="#0f172a" />
            </View>

            {/* Tip Content */}
            <View className="flex-1">
                <Text className="text-xs font-semibold text-lime-900 mb-1">AI Style Tip</Text>
                <Text className="text-sm text-slate-700">{tip}</Text>
            </View>
        </View>
    );
};

export default AITipCard;
