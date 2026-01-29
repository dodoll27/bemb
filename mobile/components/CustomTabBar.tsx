import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, View } from 'react-native';

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
    const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
        index: 'home',
        explore: 'search-outline',
        profile: 'person',
        saved: 'bookmark',
    };

    return (
        <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t border-[#6c8f66]/10 bg-[#f2f2eb] px-8 pb-8 pt-4">
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const iconName = icons[route.name] || 'ellipse';

                if (index === 1) {
                    return (
                        <View
                            key="add-button-wrapper"
                            className="flex-row items-center gap-8"
                        >
                            <Pressable
                                key={route.key}
                                onPress={() => navigation.navigate(route.name)}
                            >
                                <Ionicons
                                    name={iconName}
                                    size={24}
                                    color={isFocused ? '#6c8f66' : '#737972'}
                                />
                            </Pressable>
                            <Pressable
                                className="-mt-10 h-12 w-12 items-center justify-center rounded-full border-4 border-[#f2f2eb] bg-[#6c8f66]"
                                style={{
                                    shadowColor: '#6c8f66',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 12,
                                    elevation: 8,
                                }}
                                onPress={() => {
                                    console.log('Add pressed');
                                }}
                            >
                                <Ionicons name="add" size={28} color="white" />
                            </Pressable>
                        </View>
                    );
                }

                return (
                    <Pressable
                        key={route.key}
                        onPress={() => navigation.navigate(route.name)}
                    >
                        <Ionicons
                            name={iconName}
                            size={24}
                            color={isFocused ? '#6c8f66' : '#737972'}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
}
