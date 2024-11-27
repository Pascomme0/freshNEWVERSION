// App.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import img from '../assets/images/prod.png'
import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import purple from '../assets/images/purple.jpg';
import pink from '../assets/images/rose.jpg';
import blue from '../assets/images/blue.jpg';
import pamplemousse from '../assets/images/pamplemousse.jpg';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);

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
const ProductCard = ({ product }) => (
    <Link push href={`/SprayDetail/${product.id}`} asChild className=''>
        <Pressable className=" flex">
            <StyledView className="p-4 bg-white rounded-lg mb-4 w-48">
                <StyledImage
                    source={product.image}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                />
                <StyledText className="mt-2 text-lg font-bold">{product.name}</StyledText>
                <StyledText className="mt-1 text-lg text-green-600">{product.price} FCFA</StyledText>
                <StyledButton className="mt-3 bg-green-500 p-2 rounded-lg">
                    <StyledText className="text-white text-center">Ajouter au panier</StyledText>
                </StyledButton>
            </StyledView>
        </Pressable>
    </Link>
);
const DetailCate = ({ titre = 'Senteurs' }) => (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView className=''>
            <View className='items-center pb-6'>
                <Text className="font-bold text-[19px] pt-3">{titre}</Text>
            </View>
            <StyledView className='' style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {products.map(product => (
                    <StyledView key={product.id} style={{ width: '50%' }}>
                        <ProductCard product={product} />
                    </StyledView>
                ))}
            </StyledView>
            <Link href='' asChild className=''>
                <Pressable className="flex">
                    <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
                        <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10} light className='items-center flex' />
                    </View>
                </Pressable>
            </Link>
        </ScrollView>
    </SafeAreaView >
);
export default DetailCate;
