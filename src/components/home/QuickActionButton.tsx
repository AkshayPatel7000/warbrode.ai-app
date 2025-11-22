import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface QuickActionButtonProps {
    icon: LucideIcon;
    label: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary';
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
    icon: Icon,
    label,
    onPress,
    variant = 'secondary',
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-1 rounded-2xl py-4 px-3 items-center ${variant === 'primary' ? 'bg-lime-400' : 'bg-white border border-slate-200'
                }`}
            activeOpacity={0.7}>
            <View
                className={`w-10 h-10 rounded-full items-center justify-center mb-2 ${variant === 'primary' ? 'bg-white/30' : 'bg-slate-100'
                    }`}>
                <Icon size={20} color={variant === 'primary' ? '#0f172a' : '#64748b'} />
            </View>
            <Text
                className={`text-xs font-semibold ${variant === 'primary' ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default QuickActionButton;
