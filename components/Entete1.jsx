import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput, 'w-full bg-gray-100 rounded-lg px-4 py-2 mb-2');

export default function Entete1() {
    const router = useRouter();

    return (
        <StyledView className="block items-center justify-between p-4 ">
            <View className='flex flex-row items-center justify-between space-x-28'>
                <Image source={require('../assets/images/fresh.png')} className="w-12 h-12" />
                <StyledTouchableOpacity
                    className="bg-[#2BBB68] py-2 px-4 rounded-[20px]"
                    onPress={() => router.replace('/(tabs)')}
                >
                    <StyledText className="text-white text-md">Basculer en mode Achat</StyledText>
                </StyledTouchableOpacity>
            </View>
            <View className='justify-center items-center w-full py-4'>
                <TextInput
                    placeholder="Rechercher un service"
                    placeholderTextColor='#2191D8'
                    style={{ backgroundColor: 'rgba(29, 166, 248, 0.2)' }}
                    className="w-full bg-gray-100 rounded-3xl px-6 py-2 mb-2 text-md font-light"
                />
            </View>
        </StyledView>
    );
}
