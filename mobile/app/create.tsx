import Ionicons from '@expo/vector-icons/build/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Create() {
    const [name, setName] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [instructions, setInstructions] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<
        {
            name: string;
            image?: string;
            nutritionalValues?: any;
        }[]
    >([]);
    const openSearch = () => {
        setModalVisible(true);
    };
    const uploadToCloudinary = async (imageUri: string) => {
        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'upload.jpg',
        } as any);
        formData.append('upload_preset', 'recipe_images');

        const response = await fetch(
            'https://api.cloudinary.com/v1_1/dwgr0t8hh/image/upload',
            {
                method: 'POST',
                body: formData,
            },
        );

        const data = await response.json();
        return data.secure_url;
    };
    const handleSubmit = async () => {
        console.log('1. Starting submit');
        if (!name) {
            alert('Please enter a name');
            return;
        }
        setLoading(true);
        try {
            let imageUrl: string | null = null;
            if (image) {
                console.log('2. Uploading to Cloudinary');
                imageUrl = await uploadToCloudinary(image);
                console.log('3. Cloudinary URL:', imageUrl);
            }

            console.log('4. Sending to Laravel');
            const response = await fetch(
                'http://10.73.187.158:8000/api/recipe',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        instructions,
                        image: imageUrl,
                        ingredients: selectedIngredients,   
                    }),
                },
            );

            console.log('5. Response status:', response.status);
            const text = await response.text();
            console.log('6. Response text:', text);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert(`Created: ${name}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create recipe');
        } finally {
            setLoading(false);
        }
    };

    const searchIngredients = async (query: string) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(
                `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=true&page_size=10`,
            );
            const data = await response.json();
            console.log('Search results:', data.products);
            setSearchResults(data.products || []);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const pickImage = async () => {
        console.log('1. Starting pickImage');

        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            console.log('2. Permission result:', permissionResult);

            if (!permissionResult.granted) {
                console.log('Permission denied');
                return;
            }

            console.log('3. Launching picker');

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            console.log('4. Picker result:', result);

            if (!result.canceled) {
                console.log('5. Setting image:', result.assets[0].uri);
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error in pickImage:', error);
        }
    };

    return (
        <View className="flex-1 bg-[#f2f2eb]">
            <Stack.Screen options={{ headerShown: false }} />

            <SafeAreaView className="flex-1">
                <Pressable
                    onPress={handleSubmit}
                    className="m-4 h-16 w-16 items-center justify-center self-end rounded-full bg-[#6c8f66] shadow-sm"
                >
                    <Ionicons name="checkmark" size={20} color="#fff" />
                </Pressable>
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        className="m-4 rounded-full border border-gray-300 px-4 py-2 text-base shadow-sm"
                        style={{
                            shadowColor: '#d1d1c7',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 4,
                        }}
                    />
                    <Pressable
                        onPress={openSearch}
                        className="m-4 items-center justify-center rounded-lg bg-[#6c8f66] px-6 py-3"
                        style={{
                            shadowColor: '#d1d1c7',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 4,
                        }}
                    >
                        <Text className="text-lg  text-white">
                            Search Ingredients
                        </Text>
                    </Pressable>
                    <TextInput
                        placeholder="Instructions"
                        value={instructions}
                        onChangeText={setInstructions}
                        className="m-4 rounded-full border border-gray-300 px-4 py-2 text-base shadow-sm"
                        style={{
                            shadowColor: '#d1d1c7',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 4,
                        }}
                    />
                </ScrollView>

                <Pressable
                    onPress={pickImage}
                    className="m-4 items-center justify-center rounded-full bg-[#6c8f66] px-6 py-3"
                    style={{
                        shadowColor: '#6c8f66',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 8,
                    }}
                >
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            className="h-[300px] w-[300px] rounded-xl"
                        />
                    ) : (
                        <Text className="text-lg font-semibold text-white">
                            Add image
                        </Text>
                    )}
                </Pressable>
            </SafeAreaView>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'flex-end',
                    }}
                >
                    <View
                        style={{
                            height: '60%',
                            backgroundColor: 'white',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 16,
                        }}
                    >
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={{ textAlign: 'right', fontSize: 18 }}>
                                Close
                            </Text>
                        </Pressable>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 16,
                            }}
                        >
                            Search Ingredients
                        </Text>
                        {selectedIngredients.length > 0 && (
                            <View style={{ margin: 16 }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        marginBottom: 8,
                                    }}
                                >
                                    Ingredients:
                                </Text>
                                {selectedIngredients.map(
                                    (ingredient, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ flex: 1 }}>
                                                {ingredient.name}
                                            </Text>
                                            <Pressable
                                                onPress={() => {
                                                    setSelectedIngredients(
                                                        selectedIngredients.filter(
                                                            (_, i) =>
                                                                i !== index,
                                                        ),
                                                    );
                                                }}
                                            >
                                                <Text style={{ color: 'red' }}>
                                                    Remove
                                                </Text>
                                            </Pressable>
                                        </View>
                                    ),
                                )}
                            </View>
                        )}
                        <TextInput
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                searchIngredients(text);
                            }}
                        />
                    </View>
                </View>
                <ScrollView style={{ marginTop: 16 }}>
                    {searchResults.map((product, index) => (
                        <Pressable
                            key={product.id || index}
                            onPress={() => {
                                setSelectedIngredients([
                                    ...selectedIngredients,
                                    {
                                        name: product.product_name,
                                        image: product.image_small_url,
                                        nutritionalValues: product.nutriments,
                                    },
                                ]);
                                setSearchQuery('');
                                setSearchResults([]);
                                setModalVisible(false);
                            }}
                            style={{
                                padding: 12,
                                borderBottomWidth: 1,
                                borderBottomColor: '#eee',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            {product.image_small_url && (
                                <Image
                                    source={{ uri: product.image_small_url }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginRight: 12,
                                        borderRadius: 4,
                                    }}
                                />
                            )}
                            <Text>
                                {product.product_name || 'Unknown product'}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </Modal>
        </View>
    );
}
