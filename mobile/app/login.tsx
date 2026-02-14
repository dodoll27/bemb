import { Button } from '@react-navigation/elements';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!login || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                'http://10.73.187.158:8000/api/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ login, password }),
                },
            );

            if (!response.ok) {
                Alert.alert('Error', 'Login failed');
                const errorMessage =
                    Error instanceof Error ? Error.message : 'Login failed';
                Alert.alert('Error', errorMessage);
                return;
            }
            const data = await response.json();
            await SecureStore.setItemAsync('token', data.token);
            await SecureStore.setItemAsync('user', JSON.stringify(data.user));
            console.log('Login successful:', data);
            router.replace('/(tabs)');
        } catch (error) {
            console.log('Login error:', error);
            const errorMessage =
                error instanceof Error ? error.message : 'Login failed';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-red-500 px-6">
            <Text className="mb-8 text-center text-lg">Login</Text>

            <TextInput
                className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
                editable={!loading}
            />

            <TextInput
                className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
            />

            <TouchableOpacity
                className={`rounded-lg bg-blue-600 p-4 ${loading ? 'opacity-60' : ''}`}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text className="text-base font-semibold text-white">
                    {loading ? 'Logging in...' : 'Login'}
                </Text>
            </TouchableOpacity>
            <Button onPress={() => router.replace('/signup')}>
                Go to Sign Up
            </Button>
        </SafeAreaView>
    );
}
