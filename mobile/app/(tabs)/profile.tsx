import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedControl } from '../../components/SegmentedControl';
import { SmallCard } from '../../components/SmallCard';

const TABS = [
    { key: 'recipes', label: 'MY RECIPES' },
    { key: 'collections', label: 'COLLECTIONS' },
    { key: 'liked', label: 'LIKED' },
];

type User = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    description?: string;
    address?: string;
};

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('recipes');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const userJson = await SecureStore.getItemAsync('user');
            if (userJson) {
                setUser(JSON.parse(userJson));
            }
        };
        loadUser();
    }, []);

    const onPressLogout = async () => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user');
        router.replace('/login');
    };

    const recipes = [
        {
            id: 1,
            name: 'Summer Pesto Pasta',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeCHt_b-LZmOLDNokLtPfBOEBI6iXxj70GX-lIXWVUlWhNqBROCo6PLyWCq3uNNUYin2u_DY46R4Oj2oFTo16XjCAFDVDkVWh3JGi6NYK2qIYQrMOEEq-XvWulhICp3Y_YyNpjhZwpFYz0G2ntdfLRM7oOQ9OS64z3Es6cMoftz3TVSaYOatzKVaqwirJCi8bu0nbmwJBFY4tnyCtn5daTEnCf-Fp-EAEWerel2Cg1mc4zQXLHfmzcp6s9-uuCog6jzdfeeidFfGtj',
            category: 'recipes',
        },
        {
            id: 2,
            name: 'Avocado Toast',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD56e7H3xeQLxWh_mr6Wyl-kF21L8sV_XGwuH-XYw-VRnj5DDLuvIGH97mMKEZTyj3wFaUZD2EpWUJ03og9nGlvfBD3UUJmRqDakw4A_j0hRO9molQVFBlxKVNfEWs0Nwl71A_mvGwDylkiu_nFJ-wIaMzU13w8oLsA324o7aH9l8A-3nVsMY5GYv8_awhho-jLGgVoTYeTTReGDqhSU0PB7TQgsI5xYD77jK7OIQbxyHrTtnZS0yhiuX_Z_oTrwg6iPh0cV_lshqMu',
            category: 'recipes',
        },
        {
            id: 3,
            name: 'Herbal Infusions',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWboWOLBczZooQkf7b_frvAAq_Wg2v5NCQKnNagHSIync5lMiXGKSMdUTKX9kYTMLJz97krhvLDcae0CLiHH2rj1xuFS0OFPG_kcKiqhBI9SadChF4Vzd3gKPUiyDxmSDRECXpnD6bbI6jZUCbtI3BFG2GaBlAPQe3kd6p__XtSrjXB71nAHFFsogvsKofy3V50LYU8DHV5j4dHYLs73O3PQWXvAZ_vrfrP10sDPXd9t5gtns2g0jN52f3VOMZZpH7tJxMwXUKO4Ag',
            category: 'collections',
        },
        {
            id: 4,
            name: 'Miso Salmon',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz5xCwf5oOyje8XGH-v9TUoVMgescSV6UliX5kz2t4tBEp1JLOe9OeP0tIaoA-zTsj2aZm7Dhqc_bLMUTQjZss2v1ybJ9Znpj-d0kqPW-MgErzMbL31RYXAQayztd0rgMpHjfgqGKvTeaF-GnjtV165LVoPeUXnXQcqxYe0FeJJlTxlfmOd-v-KpvEXS-E-IEnlm6Hgp5ltHj-l5yQ3vPpFlxcZMtIW4ypHCukXA_zIR7UIITmKf87_ctLKZRE8-Of99OAJ74PaTUF',
            category: 'collections',
        },
        {
            id: 5,
            name: 'Quinoa Power Bowl',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBndcl8d0kIiyBltq66XrCcbZiS6xlMljN8ia6qxLtek76JGkvYahkMFEpV2evD-djeUN53WAhiTBaKyOizytl-wS4cDxfzCkD_aBP6d6cAXzls6bUU0UL4GraOn9yo9LmpGF9AErfoz8eZGbd3UqtqzKuLillBkdAY2VSYFBnsZGq92N-5ZMdEAS8jtk7HGbn4-JglDNlQF-jGgP1gPUNFgQX-K1q5h6L1OZBJcPWYlTfO0FtBz4E8-RPm1Fc9Ir1sHUQW0FrR-JjT',
            category: 'liked',
        },
        {
            id: 6,
            name: 'Berry Parfait',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlxxZxw9cSpf0aHaZwy7dh7Z_g7LHyzFUcEXU6olra8-OTwNAAkeRMcYco9cN49nNnuJKkxiabGGhq_7djz6WwmMGYHDrWWe4tIdkNpevf63l88kPZP5EdlRIRAXKGrvQUxNvyU6QM1Pr3skMiBOk-L2u6NNQwtzAp2L6GFC43OdFwKSAKZgUu_ZNoDaq9FrhGd1lLSLDZ9G0FXJ_-jcWSyd584slXAF5JsCTcH7kwO1_ClPOVKz5Dyfqg23CiJz4bl9XDQ4J31DqZ',
            category: 'liked',
        },
    ];

    const filteredRecipes = recipes.filter(
        (recipe) => recipe.category === activeTab,
    );

    return (
        <View className="flex-1 bg-[#f2f2eb]">
            <SafeAreaView className="flex-1">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-row items-center justify-between px-6 pb-2 pt-6">
                        {/* <View
                            className="h-12 w-12 items-center justify-center rounded-full bg-[#f2f2eb]"
                            style={{
                                shadowColor: '#d1d1c7',
                                shadowOffset: { width: 8, height: 8 },
                                shadowOpacity: 1,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <Ionicons
                                name="arrow-back-ios"
                                size={20}
                                color="#6c8f66"
                            />
                        </View>
                        <Text className="flex-1 text-center text-lg font-bold text-[#141514]">
                            Profile
                        </Text>
                        <View
                            className="h-12 w-12 items-center justify-center rounded-full bg-[#f2f2eb]"
                            style={{
                                shadowColor: '#d1d1c7',
                                shadowOffset: { width: 8, height: 8 },
                                shadowOpacity: 1,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <Ionicons
                                name="moon-outline"
                                size={20}
                                color="#6c8f66"
                            />
                        </View> */}
                    </View>

                    <View
                        className="mx-6 my-2 items-center rounded-xl bg-[#f2f2eb] p-8"
                        style={{
                            shadowColor: '#d1d1c7',
                            shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 1,
                            shadowRadius: 16,
                            elevation: 8,
                        }}
                    >
                        <View
                            className="mb-4 rounded-full bg-[#f2f2eb] p-1"
                            style={{
                                shadowColor: '#d1d1c7',
                                shadowOffset: { width: 4, height: 4 },
                                shadowOpacity: 1,
                                shadowRadius: 8,
                                elevation: 4,
                            }}
                        >
                            <Image
                                source={{
                                    uri: 'https://avatars.githubusercontent.com/u/83964749?v=4',
                                }}
                                className="h-32 w-32 rounded-full border-4 border-white"
                            />
                        </View>

                        <Text className="mb-1 text-2xl font-bold text-[#141514]">
                            {user?.firstname || 'User'}
                        </Text>
                        <Text className="mb-2 text-sm text-[#737972]">
                            Culinary explorer & plant-based advocate
                        </Text>
                        <View className="flex-row items-center gap-1">
                            <Ionicons
                                name="location"
                                size={14}
                                color="#6c8f66"
                            />
                            <Text className="text-sm font-medium text-[#6c8f66]">
                                {user?.address || 'Unknown Location'}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row gap-4 px-6 py-2">
                        <View
                            className="flex-1 items-center rounded-xl bg-[#f2f2eb] p-4"
                            style={{
                                shadowColor: '#d1d1c7',
                                shadowOffset: { width: 4, height: 4 },
                                shadowOpacity: 1,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <Text className="text-xl font-bold text-[#6c8f66]">
                                1.2k
                            </Text>
                            <Text className="text-xs font-medium uppercase tracking-widest text-[#737972]">
                                Followers
                            </Text>
                        </View>
                        <View
                            className="flex-1 items-center rounded-xl bg-[#f2f2eb] p-4"
                            style={{
                                shadowColor: '#d1d1c7',
                                shadowOffset: { width: 4, height: 4 },
                                shadowOpacity: 1,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <Text className="text-xl font-bold text-[#6c8f66]">
                                48
                            </Text>
                            <Text className="text-xs font-medium uppercase tracking-widest text-[#737972]">
                                Recipes
                            </Text>
                        </View>
                        <View
                            className="flex-1 items-center rounded-xl bg-[#f2f2eb] p-4"
                            style={{
                                shadowColor: '#d1d1c7',
                                shadowOffset: { width: 4, height: 4 },
                                shadowOpacity: 1,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <Text className="text-xl font-bold text-[#6c8f66]">
                                3.5k
                            </Text>
                            <Text className="text-xs font-medium uppercase tracking-widest text-[#737972]">
                                Saves
                            </Text>
                        </View>
                    </View>

                    <SegmentedControl
                        tabs={TABS}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <View className="flex-row flex-wrap px-6 pb-32">
                        {filteredRecipes.map((recipe, index) => (
                            <SmallCard key={index} recipe={recipe} />
                        ))}
                    </View>

                    <View className="px-6 pb-20">
                        <Pressable
                            onPress={onPressLogout}
                            className="h-11 items-center justify-center rounded-full bg-red-500"
                        >
                            <Text className="font-bold text-white">
                                Log Out
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
