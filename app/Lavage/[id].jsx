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


import couette from '../../assets/images/couette.jpg'
import rideaux from '../../assets/images/repair.png'
import vet from '../../assets/images/vetement.jpg'
import drap from '../../assets/images/drap.png'

const products = [
    {
        id: 1,
        name: "Lavage de vetements",
        price: 5000,
        image: vet,
        unit: '10 vetements'
    },
    {
        id: 2,
        name: "Lavage rideaux",
        price: 2500,
        image: rideaux,
        unit: 'à l unité'
    },
    {
        id: 3,
        name: "Lavage de drap",
        price: 1000,
        image: drap,
        unit: 'à l unité'
    },
    {
        id: 4,
        name: "Lavage de couette",
        price: 3500,
        image: couette,
        unit: 'à l unité'
    },
    {
        id: 5,
        name: "Drap",
        price: 3500,
        image: couette,
        unit: 'à l unité'
    },
    {
        id: 6,
        name: "Coussin",
        price: 3500,
        image: couette,
        unit: 'à l unité'
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
        router.push('/Lavage/CommandForm');
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
            <StyledView className="absolute bottom-0 w-full p-4 bg-white ">
                <TouchableOpacity
                    onPress={handleOrderService}
                    className="bg-blue-500 p-4 rounded-[5px]">
                    <StyledText className="text-white text-center text-lg ">Commander le service</StyledText>
                </TouchableOpacity>
            </StyledView>
        </SafeAreaView>
    );
}