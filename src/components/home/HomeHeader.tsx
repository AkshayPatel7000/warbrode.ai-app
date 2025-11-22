import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

interface HomeHeaderProps {
    userName?: string;
    userAvatar?: string;
    greeting?: string;
    onNotificationPress?: () => void;
    notificationCount?: number;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
    userName = 'User',
    userAvatar,
    greeting,
    onNotificationPress,
    notificationCount = 0,
}) => {
    const getGreeting = () => {
        if (greeting) return greeting;
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning!';
        if (hour < 18) return 'Good Afternoon!';
        return 'Good Evening!';
    };

    return (
        <View
            className="rounded-b-3xl px-5 pt-12 pb-4">
            <View className="flex-row items-center justify-between mb-4">
                {/* User Avatar */}
                <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-3">
                        {userAvatar ? (
                            <Image source={{ uri: userAvatar }} className="w-full h-full rounded-full" />
                        ) : (
                            <Text className="text-lg font-bold text-slate-900">
                                {userName.charAt(0).toUpperCase()}
                            </Text>
                        )}
                    </View>
                    <View className="flex-1">
                        <Text className="text-2xl font-bold text-slate-900">Smart Wardrobe</Text>
                        <Text className="text-sm text-slate-700">{getGreeting()}</Text>
                    </View>
                </View>

                {/* Notification Icon */}
                <TouchableOpacity
                    onPress={onNotificationPress}
                    className="w-10 h-10 rounded-full bg-white/50 items-center justify-center">
                    <Bell size={20} color="#0f172a" />
                    {notificationCount > 0 && (
                        <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 items-center justify-center">
                            <Text className="text-xs font-bold text-white">
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;
