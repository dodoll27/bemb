import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilePage() {
    const onPressLogout = async () => {
        console.log('Log Out button pressed');
        await SecureStore.deleteItemAsync('token');
        router.replace('/login');
    };
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
            <Text className="text-center text-lg">Profile Page</Text>
            <Button
                onPress={onPressLogout}
                title="Log Out"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </SafeAreaView>
    );
}
