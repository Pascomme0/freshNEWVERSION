// App.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import img from '../assets/images/lave.png'
import couette from '../assets/images/couette.jpg'
import rideaux from '../assets/images/repair.png'
import vet from '../assets/images/vetement.jpg'
import drap from '../assets/images/drap.png'
import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);

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
    }
];

const ProductCard = ({ product }) => (
    <Link push href='/categoryservice' asChild className=''>
        <Pressable className="  flex">

            <StyledView className="p-4 bg-white rounded-lg shadow-md mb-4 w-35">
                <StyledImage
                    source={product.image}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                />
                <StyledText className="mt-2 text-[16px] font-bold">{product.name}</StyledText>
                <StyledText style={({ color: 'rgba(0, 0, 0, 0.3)' })} className="mt-1  text-md font-bold">{product.unit}</StyledText>
                <StyledText style={(
                    { color: 'rgba(28, 163, 247, 1)' }
                )} className="mt-1 text-lg">{product.price} FCFA</StyledText>
            </StyledView>
        </Pressable>
    </Link>

);
const ProductList1 = () => (

    <ScrollView className='pt-8'>
        <View className=' '>
            <Text className="font-bold text-[19px] pt-3 pb-4">Produits vedettes</Text>
        </View>

        <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
            {products.map(product => (
                <StyledView key={product.id} style={{ width: '50%' }}>
                    <ProductCard product={product} />
                </StyledView>
            ))}
        </StyledView>

        <Link push href='/categoryservice' asChild className=''>
            <Pressable className=" px-2 flex">
                <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
                    <Text className="text-blue-600 text-[14px] font-semibold pr-2 ">Voir tout</Text>
                    <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10} light className='items-center flex' />
                </View>
            </Pressable>
        </Link>
    </ScrollView>
);

export default ProductList1;
