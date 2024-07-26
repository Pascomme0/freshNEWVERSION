// app/FormScreen.js
import React, { useState } from 'react';
import { View, TextInput, Alert, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import Photo from '../app/ProfilePages/Photo';

const StyledTextInput = styled(TextInput);

const FormScreen = () => {
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const router = useRouter();

    const handleSubmit = () => {
        if (email && lastName && firstName && city && address && whatsapp) {
            Alert.alert('Formulaire soumis avec succès');
            // Clear the form fields after successful submission
            setEmail('');
            setLastName('');
            setFirstName('');
            setCity('');
            setAddress('');
            setWhatsapp('');
            // Navigate to SuccessScreen
            router.push('/ProfilePages/Photo');
        } else {
            Alert.alert('Veuillez entrer toutes les informations');
        }
    };
    return (
        <View className="p-6 mt-10">
            <StyledTextInput
                placeholder="Mail"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'gray'}
                className="border border-gray-300 p-3 my-2 bg-[#F7F8F9]"
            />
            <StyledTextInput
                placeholder="Nom"
                value={lastName}
                onChangeText={setLastName}
                className="border border-gray-300 p-3 my-2 bg-[#F7F8F9]"
            />
            <StyledTextInput
                placeholder="Prénoms"
                value={firstName}
                onChangeText={setFirstName}
                className="border border-gray-300 p-3 my-2"
            />
            <StyledTextInput
                placeholder="Ville"
                value={city}
                onChangeText={setCity}
                className="border border-gray-300 p-3 my-2 bg-[#F7F8F9]"
            />
            <StyledTextInput
                placeholder="Adresse"
                value={address}
                onChangeText={setAddress}
                className="border border-gray-300 p-3 my-1 bg-[#F7F8F9]"
            />
            <StyledTextInput
                placeholder="Téléphone Whatsapp"
                value={whatsapp}
                onChangeText={setWhatsapp}
                className="border border-gray-300 p-3 my-2 bg-[#F7F8F9]"
            />
            <Pressable
                onPress={handleSubmit}
                className="bg-green-500 p-3 mt-16 rounded"
            >
                <Text className="text-white text-center">Valider mes informations</Text>
            </Pressable>
        </View>
    );
};

export default FormScreen;
