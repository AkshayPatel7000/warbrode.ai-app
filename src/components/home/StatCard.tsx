import React from 'react';
import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
    icon: LucideIcon;
    count: number;
    label: string;
    iconColor?: string;
    iconBgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    count,
    label,
    iconColor = '#0f172a',
    iconBgColor = '#f1f5f9',
}) => {
    return (
        <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/50 items-center">
            {/* Icon */}
            <View
                className="w-12 h-12 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: iconBgColor }}>
                <Icon size={24} color={iconColor} />
            </View>

            {/* Count */}
            <Text className="text-2xl font-bold text-slate-900 mb-1">{count}</Text>

            {/* Label */}
            <Text className="text-xs text-slate-500">{label}</Text>
        </View>
    );
};

export default StatCard;
