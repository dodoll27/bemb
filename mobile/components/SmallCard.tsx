import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, Text, View } from 'react-native';

type Recipe = {
    id: number;
    name: string;
    image: string;
    category?: string;
};

function SmallCard({ recipe }: { recipe: Recipe }) {
    return (
        <View className="w-1/2 flex-row flex-wrap p-2">
            <View key={recipe.id} className="w-full">
                <Pressable
                    className="aspect-square overflow-hidden rounded-lg bg-[#f2f2eb]"
                    style={{
                        shadowColor: '#d1d1c7',
                        shadowOffset: { width: 8, height: 8 },
                        shadowOpacity: 1,
                        shadowRadius: 16,
                        elevation: 8,
                    }}
                >
                    <Image
                        source={{ uri: recipe.image }}
                        className="h-full w-full"
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                        className="absolute inset-0"
                    />
                    <View className="absolute right-3 top-3 rounded-full bg-white/20 p-1.5">
                        <Ionicons
                            name="heart-outline"
                            size={14}
                            color="white"
                        />
                    </View>
                    <View className="absolute bottom-0 left-0 p-4">
                        <Text className="text-sm font-bold text-white">
                            {recipe.name}
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

export { SmallCard };
