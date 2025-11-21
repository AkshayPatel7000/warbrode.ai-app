import { View } from 'moti'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

function Container({ style, children }: { children: React.ReactNode, style?: any }) {
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#a3e635', '#f8fafc', '#f8fafc', '#f8fafc', '#f8fafc']} // lime-400 to slate-50
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-1 rounded-b-3xl justify-center pt-20"

            >
                <View className='flex-1'>

                    {children}
                </View>
            </LinearGradient>

        </View>
    )
}

export default Container