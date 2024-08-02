import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

import douche from '../../assets/images/douche.jpg';
import salon from '../../assets/images/salon.jpg';
import cuisine from '../../assets/images/cuisine.jpg';
import chambre from '../../assets/images/chambre.jpg';
import école from '../../assets/images/école.jpg';
import entreprise from '../../assets/images/entreprise.jpg';

const products = [
    { id: 1, name: "Salon", price: 2500, image: salon, rating: 4.6 },
    { id: 2, name: "Cuisine", price: 1000, image: cuisine, rating: 4.6 },
    { id: 3, name: "Chambre", price: 3500, image: chambre, rating: 4.6 },
    { id: 4, name: "Ecole", price: 'Sur devis', image: école, rating: 4.6 },
    { id: 5, name: "Entreprise", price: 'Sur devis', image: entreprise, rating: 3 }
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
            router.push('/../DevisCom'); 
        } else {
            router.push('/../FormCom');
        }
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
                {halfStar && <FontAwesome name="star-half-full" size={22} color="gold" />}
                {Array(emptyStars).fill().map((_, index) => (
                    <FontAwesome key={`empty-${index}`} name="star-o" size={22} color="gold" />
                ))}
                <Text style={{ marginLeft: 4, color: 'gray' }}>({rating})</Text>
            </View>
        );
    };

    const renderSpecialSection = (productName) => {
        let title, image, description;

        if (productName === 'Ecole') {
            title = "Désinsectisation";
            image = école;
            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        } else if (productName === 'Entreprise') {
            title = "Dératisation";
            image = entreprise;
            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        } else {
            return null;
        }

        return (
            <>
                <View className="relative">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-4 left-4 z-10 p-2 rounded-full flex justify-center items-center"
                    >
                        <View className='rounded-full bg-slate-300 w-8 h-8 items-center justify-center'>
                            <FontAwesome name="angle-left" size={24} color="blue" />
                        </View>
                    </TouchableOpacity>
                    <StyledImage
                        source={image}
                        className="w-full h-80"
                        resizeMode="cover"
                    />
                </View>
                <StyledView className="p-4">
                    <StyledText className="text-gray-400 text-[16px] font-bold mb-2">{title}</StyledText>
                    <StyledText className="text-2xl font-bold pb-2">{product.name}</StyledText>
                    {product.rating && (
                        <View className="flex-row items-center">
                            {renderStars(product.rating)}
                        </View>
                    )}
                    <StyledText className="text-xl text-black mb-4 mt-2">
                        {typeof product.price === 'number' ? `${product.price} F` : product.price}
                    </StyledText>
                    <StyledText className="text-lg mb-1">Description du service</StyledText>
                    <StyledText className="mb-4">{description}</StyledText>
                    <StyledText className="text-lg mb-2">Nombre de rideaux</StyledText>
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
            </>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="bg-white">
                {['Ecole', 'Entreprise'].includes(product.name) ? (
                    renderSpecialSection(product.name)
                ) : (
                    <>
                        <View className="relative">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="absolute top-4 left-4 z-10 p-2 rounded-full flex justify-center items-center"
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
                            <StyledText className="text-gray-400 text-[16px] font-bold mb-2">Dératisation</StyledText>
                            <StyledText className="text-2xl font-bold ">{product.name}</StyledText>
                            {product.rating && (
                                <View className="flex-row items-center">
                                    {renderStars(product.rating)}
                                </View>
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
                    </>
                )}
            </ScrollView>
            <StyledView className="absolute bottom-0 w-full p-4 bg-white ">
                <TouchableOpacity
                    className="bg-blue-500 p-4 rounded-[5px]"
                    onPress={handleOrderService}
                >
                    <StyledText className="text-white text-center text-lg ">
                        {['Ecole', 'Entreprise'].includes(product.name) ? 'Demander un devis' : 'Commander le service'}
                    </StyledText>
                </TouchableOpacity>
            </StyledView>
        </SafeAreaView>
    );
}
