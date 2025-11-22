import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MotiView } from 'moti';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const tabCount = state.routes.length;
    const tabWidth = containerWidth > 0 ? (containerWidth - 16) / tabCount : 0;

    return (
        <View
            className="absolute bottom-6 left-5 right-5 flex-row bg-black rounded-full shadow-lg shadow-slate-900/10 px-2 py-2"
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
            {/* Animated background indicator */}
            {containerWidth > 0 && (
                <MotiView
                    from={{ translateX: 0 }}
                    animate={{
                        translateX: state.index * tabWidth
                    }}
                    transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 250,
                    }}
                    style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        width: tabWidth,
                        bottom: 8,
                        backgroundColor: '#a3e635',
                        borderRadius: 9999,
                    }}
                />
            )}

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        className="flex-1 items-center justify-center py-2 rounded-full z-10"
                        activeOpacity={0.7}>
                        {options.tabBarIcon?.({
                            focused: isFocused,
                            color: isFocused ? '#0f172a' : '#94a3b8',
                            size: 24,
                        })}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;

