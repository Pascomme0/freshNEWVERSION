// App.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView,Pressable } from 'react-native';
import { styled } from 'nativewind';
import img from '../assets/images/prod.png'
import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

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
        price: 2500,
        image: img
    },
    {
        id: 3,
        name: "Spray Toilettes",
        price: 2500,
        image: img
    },
    {
        id: 4,
        name: "Spray Toilettes",
        price: 2500,
        image: img
    }
];

const ProductCard = ({ product }) => (
    <Link push href='/DetailsProd' asChild className=''>
    <Pressable className="  flex">
    <StyledView className="p-4 bg-white rounded-lg shadow-md mb-4 w-35">
        <StyledImage
            source={product.image }
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
const ProductList = () => (
 
    <ScrollView className='pt-8 '>
           <View className=' justify-center '>
      <Text className="font-bold text-[19px] pt-3 pb-2">Produits vedettes</Text>
        </View>
    <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
      {products.map(product => (
        <StyledView key={product.id} style={{ width: '50%' }}>
          <ProductCard product={product} />
        </StyledView>
      ))}
    </StyledView>
    <Link href='/category' asChild className=''>
            <Pressable className=" px-2 flex">
                <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
                    <Text className="text-green-600 text-[14px] font-semibold pr-2 ">Voir tout</Text> 
                    <FontAwesome name='angle-right' color="green" size={16}   className='items-center flex' />
                </View>
            </Pressable>
        </Link>
  </ScrollView>
  
);
export default ProductList;
