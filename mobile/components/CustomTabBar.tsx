import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
    const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
        index: 'home',
        explore: 'search-outline',
        add: 'add',
        saved: 'bookmark-outline',
        profile: 'person',
    };

    return (
        <SafeAreaView
            edges={['bottom']}
            className="absolute bottom-0 left-0 right-0"
        >
            <View className="mx-auto mb-8 w-[90%] max-w-md">
                <BlurView
                    intensity={80}
                    tint="light"
                    className="h-16 overflow-hidden rounded-full border border-white/30 shadow-2xl"
                >
                    <View className="flex-1 flex-row items-center justify-around px-4">
                        {state.routes.map((route, index) => {
                            const isFocused = state.index === index;
                            const iconName = icons[route.name] || 'ellipse';

                            if (index === 2) {
                                return (
                                    <Pressable
                                        key={route.key}
                                        className="h-10 w-10 scale-125 items-center justify-center rounded-full  bg-[#6c8f66] shadow-sm"
                                        onPress={() => {
                                            console.log('Add pressed');
                                        }}
                                    >
                                        <Ionicons
                                            name="add"
                                            size={28}
                                            color="white"
                                        />
                                    </Pressable>
                                );
                            }
                            {
                                console.log(route.name, iconName);
                            }

                            return (
                                <Pressable
                                    key={route.key}
                                    className="h-12 w-12 items-center justify-center"
                                    onPress={() =>
                                        navigation.navigate(route.name)
                                    }
                                >
                                    <Ionicons
                                        name={iconName}
                                        size={28}
                                        color={
                                            isFocused ? '#6c8f66' : '#71717a'
                                        }
                                    />
                                    {isFocused && (
                                        <View className="mt-0.5 h-1 w-1 rounded-full bg-[#6c8f66]" />
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>
                </BlurView>
            </View>
        </SafeAreaView>
    );
}
