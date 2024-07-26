import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import douche from '../../assets/images/douche.jpg';
import car from '../../assets/images/car.jpg';
import grosengin from '../../assets/images/grosengin.jpg';
import chambre from '../../assets/images/chambre.jpg';
import école from '../../assets/images/école.jpg';
import entreprise from '../../assets/images/entreprise.jpg';

import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

// Définir les styles en utilisant NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);

const products = [

    {
        id: 1,
        name: "Car et bus",
        price: 2500,
        image: car,
    },
    {
        id: 2,
        name: "Gros engin",
        price: 1000,
        image: grosengin,
    },

];

const ProductCard = ({ product }) => (
    <Link push href='/' asChild className=''>
        <Pressable className="flex">
            <StyledView className="p-4 bg-white shadow-md mb-4 w-35">
                <StyledImage
                    source={product.image}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                />
                <StyledText className="mt-2 text-[16px] font-bold">{product.name}</StyledText>
                <StyledText style={{ color: 'rgba(28, 163, 247, 1)' }} className="mt-1 text-lg">
                    {product.price === 'sur devis' ? product.price : `${product.price} FCFA`}
                </StyledText>
            </StyledView>
        </Pressable>
    </Link>
);

const LavageNormal = () => (
    <ScrollView className='bg-white'>
        <View className='mb-10 '>
        <Link push href='/DetailsService' asChild className=''>
            <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {products.map(product => (
                    <StyledView key={product.id} style={{ width: '50%' }}>
                        <ProductCard product={product} />
                    </StyledView>
                ))}
            </StyledView>
        </Link>
        </View>
        
        
    </ScrollView>
);

export default LavageNormal;
