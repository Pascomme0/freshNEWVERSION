import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable, StyleSheet } from 'react-native';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Ratio() {
    const [selectedOption, setSelectedOption] = useState(null);
    const Button = styled(Pressable, 'flex-row items-center justify-center bg-green-500 rounded-md p-3');
    const ButtonText = styled(Text, 'text-white font-semibold mr-2');

    const options = [
        { label: 'Cash à la livraison', value: 'cash' },
        { label: 'Mobile money', value: 'mobile' },
    ];

    return (
        <View style={styles.container}>
            <Text className="text-[18px] mb-2">Moyen de paiement</Text>
            <View className="flex-row space-x-12 ">
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        className="flex-row items-center"
                        onPress={() => setSelectedOption(option.value)}
                    >
                        <View
                            className={`h-5 w-5 rounded-full border-2 ${selectedOption === option.value ? 'border-blue-500' : 'border-gray-400'
                                } flex items-center justify-center`}
                        >
                            {selectedOption === option.value && (
                                <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            )}
                        </View>
                        <Text className="ml-2 text-base font-normal">{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View className='bg-gray-200 py-6 mb-6 rounded-lg mx-2 justify-center mt-16 w-90'>
                <View className="py-3 w-[]  px-8  flex flex-row justify-between items-center border-b border-gray-300 pb-4">
                    <Text className='mr-4'>Sous-total</Text>
                    <Text className='ml-4'>2000 Fcfa</Text>
                </View>
                <View className="border-b border-gray-300 pb-4 py-3 px-8 flex flex-row justify-between items-center">
                    <Text style={(
                        { color: 'rgba(0, 0, 0, 0.5)' }
                    )} className='text-[13px] mr-4'>Livraison</Text>
                    <Text style={(
                        { color: 'rgba(0, 0, 0, 0.5)' }
                    )} className='text-[13px] ml-4'>1000 Fcfa</Text>
                </View>
                <View className="py-3 px-8 flex flex-row justify-between items-center">
                    <Text className='mr-4'>Total</Text>
                    <Text className='ml-4'>6000 Fcfa</Text>
                </View>
            </View>
            <View className='flex flex-row items-center py-6'>
                <View className='px-4'>
                    <Image className='h-12 w-12' source={require('../assets/images/wave.png')} />
                </View>
                <Text className='text-[16px] leading-6 font-bold '>Paiement éléctronique par {'\n'} wave unique </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Link push href="/paiement/Checkout1" asChild>
                    <TouchableOpacity  style={styles.button}>
                        <Text style={styles.buttonText}>Valider ma commande</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2BBB68',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width : '85%',
        borderRadius: 8,
        top:240,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
