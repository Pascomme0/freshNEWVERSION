import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../components/Back';

import img from '../../assets/images/prod.png';
import pink from '../../assets/images/rose.jpg'
import blue from '../../assets/images/blue.jpg'
import purple from '../../assets/images/purple.jpg'
import pamplemousse from '../../assets/images/pamplemousse.jpg'






const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);




const products = [
    {
        id: 1,
        name: "Spray Toilettes",
        price: 2500,
        image: img
    },
    {
        id: 2,
        name: "Spray Toilettes",
        price: 3000,
        image: purple
    },
    {
        id: 3,
        name: "Spray Toilettes",
        price: 2500,
        image: pink
    },
    {
        id: 4,
        name: "Spray Toilettes",
        price: 2500,
        image: blue
    },
    {
        id: 5,
        name: "Spray Toilettes",
        price: 2500,
        image: pamplemousse
    }
];

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <Text>Produit non trouvé</Text>;
    }

    const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decrementQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

    const handleOrderService = () => {
        if (product.name === 'Ecole' || product.name === 'Entreprise') {
            router.push('/../DevisCom'); // Remplacer par la route correcte pour la page de demande de devis
        } else {
            router.push('/../FormCom');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="bg-white">
                <View className="relative">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-4 left-4 z-10  p-2 rounded-full flex justify-center items-center"
                    >
                        <View className='rounded-full bg-slate-300 w-8 h-8 items-center justify-center'>
                            <FontAwesome name="angle-left" size={24} color="blue" />
                        </View>    
                    </TouchableOpacity>
                    <StyledImage
                        source={product.image}
                        className="w-full h-80"
                        resizeMode="cover"
                    />
                </View>

                <StyledView className="p-4">
                    <StyledText className="text-gray-400 text-[16px] font-bold mb-2">Desinsectisation</StyledText>
                    <StyledText className="text-2xl font-bold ">{product.name}</StyledText>
                    {product.rating && (
                        <Text className='text-lg text-yellow-500 '>
                            {`⭐`.repeat(Math.floor(product.rating))} ({product.rating})
                        </Text>
                    )}
                    <StyledText className="text-xl text-black mb-4 mt-2">
                        {typeof product.price === 'number' ? `${product.price} F` : product.price}
                    </StyledText>
                    <StyledText className="text-lg mb-4">Description du service</StyledText>
                    <StyledText className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</StyledText>
                    <StyledText className="text-lg mb-2">Nombre de pièces</StyledText>
                    <StyledView className="flex-row items-center mb-4">
                        <Pressable onPress={decrementQuantity} className="bg-gray-200 p-2 rounded">
                            <Text>-</Text>
                        </Pressable>
                        <Text className="mx-4">{quantity}</Text>
                        <Pressable onPress={incrementQuantity} className="bg-blue-500 p-2 rounded">
                            <Text className='text-white'>+</Text>
                        </Pressable>
                    </StyledView>
                </StyledView>
            </ScrollView>
            <StyledView className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-200">
                <TouchableOpacity 
                    onPress={handleOrderService}
                    className="bg-blue-500 p-4 rounded-[5px]"
                >
                    <StyledText className="text-white text-center text-lg">
                        {['Ecole', 'Entreprise'].includes(product.name) ? 'Demander un devis' : 'Commander le service'}
                    </StyledText>
                </TouchableOpacity>
            </StyledView>
        </SafeAreaView>
    );
}
