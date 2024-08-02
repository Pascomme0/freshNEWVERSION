import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import prod from '../assets/images/prod.png'


const products = [
  {
    id: 1,
    name: 'Spray toilettes',
    price: '5000 F',
    status: 'En cours de livraison',
    statusColor: 'bg-yellow-500',
    image: prod,
    lien: 'Encours'
  },
  {
    id: 2,
    name: 'Spray toilettes',
    price: '5000 F',
    status: 'Non expédié',
    statusColor: 'bg-red-500',
    image: prod, 
    lien: 'NonExp'
  },
  {
    id: 3,
    name: 'Spray toilettes',
    price: '5000 F',
    status: 'Prêt pour récupération',
    statusColor: 'bg-green-500',
    image: prod, 
    lien: 'Recup'
  },
];

const ProductCard = styled(TouchableOpacity, 'flex-row items-center  rounded-lg  shadow-md py-4 mb-4 ');
const ProductImage = styled(Image, 'w-20 h-20 rounded-md');
const ProductInfo = styled(View, 'flex-1 ml-4 mr-2');
const ProductName = styled(Text, 'text-md font-bold');
const ProductPrice = styled(Text, 'text-[12px] text-gray-600 py-1');
const ProductStatus = styled(View, 'py-1 px-2 rounded-md');
const ProductStatusText = styled(Text, 'text-white text-center text-md');
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';

const SuiviCmd = () => {

 {/*    const router = useRouter();
  const handlePress = (lien) => {
    router.push(`/EtapeSuiviCom/${lien}`);
  };   */} 

  return (
    <ScrollView className="p-4 bg-gray-100">  
      {products.map((product) => (
        <ProductCard className='' key={product.id} >
          <ProductImage source={product.image} />
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductInfo>
          <ProductStatus className={product.statusColor}>
            <ProductStatusText>{product.status}</ProductStatusText>
          </ProductStatus>
        </ProductCard>
      ))}
    </ScrollView>
  );
};

export default SuiviCmd;