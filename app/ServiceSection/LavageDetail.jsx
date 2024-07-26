import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView,Pressable } from 'react-native';
import { styled } from 'nativewind';
import fauteuil from '../../assets/images/fauteuil.jpg'
import chaise from '../../assets/images/chaise.jpg'
import matelat from '../../assets/images/matelat.jpg'
import tapis from '../../assets/images/tapis.jpg'
import petittapis from '../../assets/images/petittapis.jpg'
import demenagement from '../../assets/images/demenagement.jpg'



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
        name: "Fauteuil",
        price: 5000,
        image: fauteuil,
        rating: 4.6,
    },
    {
        id: 2,
        name: "Chaise",
        price: 2500,
        image: chaise,
        rating: 4.6,
    },
    {
        id: 3,
        name: "Matelas une place",
        price: 1000,
        image: matelat,
         rating: 4.6,
    },
    {
        id: 4,
        name: "Matelas deux places",
        price: 3500,
        image: matelat,
         rating: 4.6,
    },     
    {
    id: 5,
    name: "Matelas trois places",
    price: 8000,
    image: matelat,
     rating: 4.6,
},
{
    id: 6,
    name: "Tapis (petit)",
    price: 1000,
    image: petittapis,
     rating: 4.6,
},
{
    id: 7,
    name: "Tapis (grand)",
    price: 2000,
    image: tapis,
     rating: 4.6,
},

{
    id: 8,
    name: "aménagement",
    price: 20000,
    image: demenagement,
     rating: 4.6,
},

];

const ProductCard = ({ product }) => (
    <Link href={`/Lavage/${product.id}`} asChild>
        <Pressable className="flex">
        <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
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
const LavageDetail = () => (
 
    <ScrollView className='bg-white'>
           <View className=' mb-8'>
<StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
  {products.map(product => (
    <StyledView key={product.id} style={{ width: '50%' }}>
      <ProductCard product={product} />
    </StyledView>
    
  ))}
</StyledView>
        </View>
                <Pressable className=" px-2 flex">
                <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
                    <Text className="text-blue-600 text-[14px] font-semibold pr-2 ">Voir tout</Text> 
                    <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10}  light className='items-center flex' />
                </View>
            </Pressable>
  </ScrollView>
  
);

export default LavageDetail;
