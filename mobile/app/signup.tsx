import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSignUp = async () => {
        if (!email || !password || !username || !firstName || !lastName) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                'http://10.73.187.158:8000/api/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        password_confirmation: passwordConfirmation,
                        username,
                        firstname: firstName,
                        lastname: lastName,
                    }),
                },
            );

            if (!response.ok) {
                Alert.alert('Error', 'Sign up failed');
                const errorMessage =
                    Error instanceof Error ? Error.message : 'Sign up failed';
                Alert.alert('Error', errorMessage);
                return;
            }
            const data = await response.json();
            await SecureStore.setItemAsync('token', data.token);
            await SecureStore.setItemAsync('user', JSON.stringify(data.user));
            router.replace('/(tabs)');
        } catch (error) {
            console.log('Sign up error:', error);
            const errorMessage =
                error instanceof Error ? error.message : 'Sign up failed';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center bg-white px-6">
            <Text className="mb-8 text-center text-lg">Sign Up</Text>

            <TextInput
                className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Firstname"
                value={firstName}
                onChangeText={setFirstName}
                editable={!loading}
            />
            <TextInput
                className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Lastname"
                value={lastName}
                onChangeText={setLastName}
                editable={!loading}
            />
            <TextInput
                className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                editable={!loading}
            />
            <TextInput
                className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
            />

            <TextInput
                className="mb-6 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
            />

            <TextInput
                className="mb-6 rounded-lg border border-gray-300 p-3 text-base"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                secureTextEntry
                editable={!loading}
            />

            <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />

            {loading && (
                <View className="mt-4 items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </SafeAreaView>
    );
}
