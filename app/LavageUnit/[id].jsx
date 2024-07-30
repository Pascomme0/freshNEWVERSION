import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../components/Back';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);


import fauteuil from '../../assets/images/fauteuil.jpg'
import chaise from '../../assets/images/chaise.jpg'
import matelat from '../../assets/images/matelat.jpg'
import tapis from '../../assets/images/tapis.jpg'
import petittapis from '../../assets/images/petittapis.jpg'
import demenagement from '../../assets/images/demenagement.jpg'

const products = [
    {
        id: 1,
        name: "Fauteuil",
        price: 5000,
        image: fauteuil,
        rating: 4.6,
    },
    {
        id: 2,
        name: "Chaise",
        price: 2500,
        image: chaise,
        rating: 4.6,
    },
    {
        id: 3,
        name: "Matelas une place",
        price: 1000,
        image: matelat,
         rating: 4.6,
    },
    {
        id: 4,
        name: "Matelas deux places",
        price: 3500,
        image: matelat,
         rating: 4.6,
    },     
    {
    id: 5,
    name: "Matelas trois places",
    price: 8000,
    image: matelat,
     rating: 4.6,
},
{
    id: 6,
    name: "Tapis (petit)",
    price: 1000,
    image: petittapis,
     rating: 4.6,
},
{
    id: 7,
    name: "Tapis (grand)",
    price: 2000,
    image: tapis,
     rating: 4.6,
},

{
    id: 8,
    name: "aménagement",
    price: 20000,
    image: demenagement,
     rating: 4.6,
},

];

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <Text>Produit non trouvé</Text>;
    }
    const handleOrderService = () => {
        router.push('/../FormCom');
    };

    const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decrementQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

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
                    <StyledText className="text-gray-400 text-[16px] font-bold mb-2">Lavage à l'unité</StyledText>
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
                onPress={handleOrderService} className="bg-blue-500 p-4 rounded-[5px]">
                    <StyledText className="text-white text-center text-lg ">Commander le service</StyledText>
                </TouchableOpacity>
            </StyledView>
        </SafeAreaView>
    );
}
