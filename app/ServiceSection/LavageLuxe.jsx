import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import douche from '../../assets/images/douche.jpg';
import car from '../../assets/images/berline.jpg';
import grosengin from '../../assets/images/berline.jpg';
import chambre from '../../assets/images/4x4.jpg';
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
        name:"Petite voiture",
        price: 2500,
        image: car,
    },
    {
        id: 2,
        name: "Berling",
        price: 1000,
        image: grosengin,
    },
    {
        id: 3,
        name: "4x4",
        price: 1000,
        image: chambre,
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

const LavageLuxe = () => (
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

export default LavageLuxe;
