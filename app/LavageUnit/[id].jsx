import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../components/Back';

import fauteuil from '../../assets/images/fauteuil.jpg';
import chaise from '../../assets/images/chaise.jpg';
import matelat from '../../assets/images/matelat.jpg';
import tapis from '../../assets/images/tapis.jpg';
import petittapis from '../../assets/images/petittapis.jpg';
import demenagement from '../../assets/images/demenagement.jpg';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const products = [
    { id: 1, name: "Fauteuil", price: 5000, image: fauteuil, rating: 4.6 },
    { id: 2, name: "Chaise", price: 2500, image: chaise, rating: 4.6 },
    { id: 3, name: "Matelas une place", price: 1000, image: matelat, rating: 4.6 },
    { id: 4, name: "Matelas deux places", price: 3500, image: matelat, rating: 4.6 },
    { id: 5, name: "Matelas trois places", price: 8000, image: matelat, rating: 4.6 },
    { id: 6, name: "Tapis (petit)", price: 1000, image: petittapis, rating: 4.6 },
    { id: 7, name: "Tapis (grand)", price: 2000, image: tapis, rating: 4.6 },
    { id: 8, name: "Aménagement", price: 20000, image: demenagement, rating: 4.6 },
];

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {Array(fullStars).fill().map((_, index) => (
                <FontAwesome key={`full-${index}`} name="star" size={22} color="gold" />
            ))}
            {halfStar && <FontAwesome name="star-half-full" size={22} color="gold" />}
            {Array(emptyStars).fill().map((_, index) => (
                <FontAwesome key={`empty-${index}`} name="star-o" size={22} color="gold" />
            ))}
            <Text style={{ marginLeft: 4, color: 'gray' }}>({rating})</Text>
        </View>
    );
};

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <StyledText>Produit non trouvé</StyledText>;
    }

    const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decrementQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

    const handleOrderService = () => {
        router.push('/../FormCom');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="bg-white">
                <StyledView className="relative">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-4 left-4 z-10 p-2 rounded-full flex justify-center items-center"
                    >
                        <StyledView className='rounded-full bg-slate-300 w-8 h-8 items-center justify-center'>
                            <FontAwesome name="angle-left" size={24} color="blue" />
                        </StyledView>
                    </TouchableOpacity>
                    <StyledImage
                        source={product.image}
                        className="w-full h-80"
                        resizeMode="cover"
                    />
                </StyledView>
                <StyledView className="p-4">
                    <StyledText className="text-gray-400 text-[16px] font-bold mb-2">Lavage à l'unité</StyledText>
                    <StyledText className="text-2xl font-bold pb-2">{product.name}</StyledText>
                    {product.rating && (
                        <StyledView className='flex flex-row items-center mb-2'>
                            {renderStars(product.rating)}
                        </StyledView>
                    )}
                    <StyledText className="text-xl text-black mb-4 mt-2">
                        {typeof product.price === 'number' ? `${product.price} F` : product.price}
                    </StyledText>
                    <StyledText className="text-lg mb-1">Description du service</StyledText>
                    <StyledText className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </StyledText>
                    <StyledText className="text-lg mb-2">Nombre de pièces</StyledText>
                    <StyledView className="flex-row items-center mb-4">
                        <Pressable onPress={decrementQuantity} className="bg-gray-200 p-2 rounded">
                            <StyledText>-</StyledText>
                        </Pressable>
                        <StyledText className="mx-4">{quantity}</StyledText>
                        <Pressable onPress={incrementQuantity} className="bg-blue-500 p-2 rounded">
                            <StyledText className='text-white'>+</StyledText>
                        </Pressable>
                    </StyledView>
                </StyledView>
            </ScrollView>
            <StyledView className="absolute bottom-0 w-full p-4 bg-white ">
                <TouchableOpacity
                    onPress={handleOrderService}
                    className="bg-blue-500 p-4 rounded-[5px]"
                >
                    <StyledText className="text-white text-center text-lg">Commander le service</StyledText>
                </TouchableOpacity>
            </StyledView>
        </SafeAreaView>
    );
}
