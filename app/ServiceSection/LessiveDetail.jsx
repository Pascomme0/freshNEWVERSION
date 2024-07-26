// App.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import couette from '../../assets/images/couette.jpg'
import rideaux from '../../assets/images/repair.png'
import vet from '../../assets/images/vetement.jpg'
import drap from '../../assets/images/drap.png'
import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';

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

const ProductCard = ({ product }) => (
        <Pressable className="  flex">
            <StyledView className="p-4 bg-white  shadow-md mb-4 w-30">
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
);
const LessiveDetail = () => (
    <ScrollView className='bg-white'>
        <View className=' mb-10'>
        <Link push href='/MenageDetail' asChild className=''>
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
export default LessiveDetail;
