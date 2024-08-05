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
        image: img,
        rating: 4.5,
        type : "Citron",
    },
    {
        id: 2,
        name: "Spray Toilettes",
        price: 3000,
        image: purple,
        rating: 3.5,
        type : "Lavande",

    },
    {
        id: 3,
        name: "Spray Toilettes",
        price: 2500,
        image: pink,
        rating: 5,
        type : "Joyeuse rose",

    },
    {
        id: 4,
        name: "Spray Toilettes",
        price: 2500,
        image: blue,
        rating: 2,
        type : "Océan",

    },
    {
        id: 5,
        name: "Spray Toilettes",
        price: 2500,
        image: pamplemousse,
        rating: 4,
        type : "Pamplemousse",

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
        router.push('/(tabs)/shop');
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {Array(fullStars).fill().map((_, index) => (
                    <FontAwesome key={`full-${index}`} name="star" size={22} color="gold" />
                ))}
                {halfStar && <FontAwesome name="star-half-full" size={24} color="gold" />}
                {Array(emptyStars).fill().map((_, index) => (
                    <FontAwesome key={`empty-${index}`} name="star" size={24} color="#D6D6D6" />
                ))}
                <Text className='text-lg' style={{ marginLeft: 4, color: 'gray' }}>({rating})</Text>
            </View>
        );
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
                    <StyledText className="text-gray-400 text-[16px] font-bold mb-2">Senteur</StyledText>
                    <View className='flex flex-row items-center '>
                    <StyledText className="text-2xl font-bold ">{product.name}</StyledText>
                    <Text className='text-gray-700 text-[18px] pl-2'>( {product.type} )</Text>

                    </View>

                    {product.rating && (
                        <View className="flex-row items-center">
                            {renderStars(product.rating)}
                        </View>
                    )}
                    <StyledText className="text-xl text-black mb-2 mt-2">
                        {typeof product.price === 'number' ? `${product.price} F` : product.price}
                    </StyledText>
                    <StyledText className="text-lg mb-2">Description du produit</StyledText>
                    <StyledText className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</StyledText>
                    <StyledText className="text-lg mb-2">Nombre de pièces</StyledText>
                    <StyledView className="flex-row items-center mb-4">
                        <Pressable onPress={decrementQuantity} className="bg-gray-200 p-2 rounded">
                            <Text>-</Text>
                        </Pressable>
                        <Text className="mx-4">{quantity}</Text>
                        <Pressable onPress={incrementQuantity} className="bg-green-400 p-2 rounded">
                            <Text className='text-white'>+</Text>
                        </Pressable>
                    </StyledView>
                </StyledView>
            </ScrollView>
            <StyledView className="absolute bottom-0 w-full p-4 bg-transparent">
                <TouchableOpacity 
                    onPress={handleOrderService}
                    className="bg-green-500 p-4 rounded-[5px]"
                >
                    <StyledText className="text-white text-center text-lg">
                       Commander le produit
                    </StyledText>
                </TouchableOpacity>
                <View className="pb-6 justify-center">
                    <TouchableOpacity  className='flex flex-row items-center justify-center pt-4' onPress={() => router.push('../../Avis')}>
                        <Text className="text-center text-blue-500 text-[17px] font-bold pr-4">Notes & Avis clients</Text>
                        <FontAwesome name="angle-right" size={24} color="blue" />
                    </TouchableOpacity>
                </View>
            </StyledView>
        </SafeAreaView>
    );
}