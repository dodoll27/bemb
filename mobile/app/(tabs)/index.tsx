import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const featuredChefs = [
        {
            id: 1,
            name: 'Elena',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEj83ZuDjTZIhCyPhKTJoKiLUmPe2is4tzuukpYUShb_TONdB-gH4_3EDrOJcK0LvvqzQ7NNX19zNvGTOiK4J18VAW19nP5YHNXkUYYSSyLppZbWW3SmeD65j_iF8KtGBOtuTdAoiVjn-ly2Mw8QkO0PDs8NRcJi_CRrNR1Y_Onh_dtDAoSsrfV4UJ8fmrKlRqeYnjHzrHfWyXbPQXHqIJDm7frT2VKI9h4N7nbyoNrpEx4ejwiH7Ee3AgGeAeRD3v3lZC8OIOy609',
            hasStory: true,
        },
        {
            id: 2,
            name: 'Marcus',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBu0354s-AYSjobZmE_FwFMi_gGFlkfQSYYr0z7D36k-qhCwjPc2Mf9amgPKpwIMgjhF7b_SLeSjOOpjMXuWSkdIGlddmlMLck3S3EnVEZjpnEp34vNWbI1OSMNwoAlidDRutVZ0SToRUYgE1ecbQzL1C5HgyG3vZLFi8iBGL18Exi5nOB3legy4MtVeLXbv0dA5wNFRinYJD22sKDRQj1zh0vkVGKwKfqhZM0z-i9M1ghJ13riBmR_HpLOv6wpnJd-KMTkFupiZhN',
            hasStory: true,
        },
        {
            id: 3,
            name: 'Sophie',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB191qslBLZu8KJ05yfTmqToG68PQYgD3O98Ka25JHh9p-jEyQC4_I4A8YR80sCmxfkWV1Ub_-9906LGA0aQQVJ_QSd3O95KXhDWTLZDMuD1WVlcOUKUKTyll1YNZ0GxyHsOoLx5_jtq4TjM09Qa9Y_A8rztW6-sA2LlY1sbW2Z0lYEAFhq_hbyXS97jjr6fHu0CLAK1JSA5VUKEC5vdDckpxTkt1vz1d3fGukqZI4BZDxknZUmwqSHs_RHGFsbFoECYowaXRLHlObp',
            hasStory: true,
        },
        {
            id: 4,
            name: 'Julian',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD91TPuFZZ4lpgG5COuLGyD8BxkVCOapn-nT2CT2JKbklCmRyR8m1gNna9-GEtT8-1ujPaLc8TdM4nZ_p4AuX9-MmWjX-hI4grb5AX4nr3VlbEl3yCiSx_9vkSdeE_dE5KPmUrSOoFJWuQvhGGSx3pmOPmmIzUcoTmQi8xflI5yLKb49u14HB9xRIJx6cjpQ62uuXTQeTxfx6Z5aDxZ6upesb8aMGVAnq_jRMPtdn1zQRnaGCgcU6GMAm4VfBz7q5InfNPbKSRKLHS',
            hasStory: false,
        },
        {
            id: 5,
            name: 'Maria',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClWgwWSUlW_CVxxRqsdrCZhqEAwHKBuDU3pVgCsf4YMyt1gyztkG40il5P8-L53SP8o17P3o1CR3aoN2bbQNhoZ7nHvd9PrD-nfF3vqCRm1iypbH_PfQdjzhYfRpUZ-4SSgb6pIxDL0w_UVs4YBiwbaD2xnCZIfHmOhygTWrM4C6LxDRCA0ysi2micNt3LO6kzISD9hry3TRHR6ISswNOG3kDl5fSyBxFHivn5WM3uDJ44ybSli3xVbbphkBl07Ljw3AnE5HMH80Wh',
            hasStory: false,
        },
    ];

    const recipes = [
        {
            id: 1,
            title: 'Wild Mushroom Risotto',
            chef: 'Chef Julien V.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACHyfVIJHrjUY4HVty1wM59wSNeLUfQBu6DhBo-mtfvgLrKVv9Bb74RUC6dF2OMYP3fw8Mn3b1GsHIwPHGt6dLnXWp0F46iqYUKoo_Kt-Ad_volzSx8LMrcT27iMzfhJNrJoQNSQB6jY8yxG-4dpTcb5Pg6IYJkldwPkwNM1mNQwd_RWKXgnwPYMMDOJd_0130Ocwk-AkMaOvR0R3bB6DrzeeG6x29-K3s4rvwycZiC9WEYZdN2SlyqTfMvnugycOtcRqeaWR5YD9X',
            likes: '2.4k',
            comments: '156',
            time: '45 MIN',
            liked: true,
        },
        {
            id: 2,
            title: 'Summer Berry Tart',
            chef: 'Sophie Chen',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnEhvbWNvYFxwZEe55YswWfPPHLbV2j3DHlwKMDd7l60d-cQSBatlomX30Sa3AwPfuw7TDj8DsVRtBg-fPCKXgDb7-ZOhxBz_hHZILoT8ASwqWMq1xvulBUNDCBVi5JwdDidZ3myyOGdayopnx3tsivpY4Peec7b6D56_GlC99zxz5uGmtBDpZhWmiK1rfuCeJZAJul3nph752--tEq-zWvTB4WRIdKMYgEzy2IoOJFYx332WgP-H-s8HeRBz6Qpefs17v-uH7xbV_',
            likes: '1.8k',
            comments: '92',
            time: '60 MIN',
            liked: false,
        },
    ];

    const renderChefStory = ({ item }: { item: (typeof featuredChefs)[0] }) => (
        <View className="items-center gap-2">
            {item.hasStory ? (
                <View className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#F7F4EF]">
                    <Image
                        source={{ uri: item.image }}
                        className="h-full w-full"
                    />
                </View>
            ) : (
                <View className="rounded-full bg-zinc-200 p-[2.5px]">
                    <View className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#F7F4EF] opacity-80">
                        <Image
                            source={{ uri: item.image }}
                            className="h-full w-full"
                        />
                    </View>
                </View>
            )}
            <Text
                className={`text-xs font-medium ${!item.hasStory && 'opacity-60'}`}
            >
                {item.name}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-[#F7F4EF]">
            <SafeAreaView edges={['top']} className="bg-[#F7F4EF]/80 ">
                <View className="flex-row justify-center border-b border-black/5 px-6 py-4">
                    <Text className=" text-xl font-bold text-[#6c8f66]">
                        MangeBien
                    </Text>
                </View>
            </SafeAreaView>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="py-6">
                    <View className="mb-3 flex-row items-center justify-between px-6">
                        <Text className="text-sm font-bold uppercase tracking-widest text-[#737972]">
                            Featured
                        </Text>
                        <Text className="text-xs font-semibold text-[#6c8f66]">
                            View All
                        </Text>
                    </View>
                    <FlatList
                        data={featuredChefs}
                        renderItem={renderChefStory}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="px-6 gap-5"
                    />
                </View>

                <View className="gap-8 px-4 pb-32">
                    {recipes.map((recipe) => (
                        <View
                            key={recipe.id}
                            className="h-[520px] overflow-hidden rounded-xl shadow-2xl"
                        >
                            <Image
                                source={{ uri: recipe.image }}
                                className="h-full w-full"
                            />

                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                className="absolute inset-0"
                            />

                            <BlurView
                                intensity={80}
                                tint="light"
                                className="absolute bottom-6 left-4 right-4 overflow-hidden rounded-xl border border-white/30"
                            >
                                <View className="p-5">
                                    <View className="mb-2 flex-row items-start justify-between">
                                        <View className="flex-1">
                                            <Text className="mb-1 text-2xl font-bold leading-tight text-zinc-900">
                                                {recipe.title}
                                            </Text>
                                            <Text className="text-sm font-medium text-zinc-700">
                                                by {recipe.chef}
                                            </Text>
                                        </View>
                                        <Pressable className="rounded-full bg-[#6c8f66] px-5 py-2 shadow-lg">
                                            <Text className="text-sm font-bold text-white">
                                                View Recipe
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View className="mt-4 flex-row items-center gap-6 border-t border-black/5 pt-4">
                                        <View className="flex-row items-center gap-1.5">
                                            <Ionicons
                                                name={
                                                    recipe.liked
                                                        ? 'heart'
                                                        : 'heart-outline'
                                                }
                                                size={20}
                                                color={
                                                    recipe.liked
                                                        ? '#ef4444'
                                                        : '#71717a'
                                                }
                                            />
                                            <Text className="text-sm font-bold text-zinc-800">
                                                {recipe.likes}
                                            </Text>
                                        </View>
                                        <View className="flex-row items-center gap-1.5">
                                            <Ionicons
                                                name="chatbubble-outline"
                                                size={20}
                                                color="#6c8f66"
                                            />
                                            <Text className="text-sm font-bold text-zinc-800">
                                                {recipe.comments}
                                            </Text>
                                        </View>
                                        <View className="ml-auto flex-row items-center gap-1.5">
                                            <Ionicons
                                                name="time-outline"
                                                size={18}
                                                color="#71717a"
                                            />
                                            <Text className="text-xs font-bold uppercase tracking-tighter text-zinc-500">
                                                {recipe.time}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </BlurView>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
