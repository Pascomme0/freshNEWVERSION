import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import prod from '../assets/images/prod.png';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
const StyledImage = styled(Image);



const DétailsProd = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleOrderService = () => {
    router.push('/(tabs)/shopService');
};

  return (
    <View className="flex-1 bg-white">
      <ScrollView className='bg-white' contentContainerStyle={{ flexGrow: 1 }}>
      <View className="relative bg-white">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-4 left-4 z-10  p-2 rounded-full flex justify-center items-center"
                    >
                        <View className='rounded-full bg-slate-300 w-8 h-8 items-center justify-center'>
                            <FontAwesome name="angle-left" size={24} color="blue" />
                        </View>    
                    </TouchableOpacity>
                    <StyledImage
                        source={prod}
                        className="w-full h-80"
                        resizeMode="cover"
                    />
                </View>
        <View className="p-4 flex-1">
          <Text className="text-xl font-bold">Spray Toilettes</Text>
          <View className="flex-row items-center my-2">
            <Text className="text-yellow-500">★★★★☆</Text>
            <Text className="ml-2">(4.5)</Text>
          </View>
          <Text className="text-2xl font-bold text-green-500">5000 F</Text>
          <Text className="mt-4 mb-2 text-lg font-bold">Description du produit</Text>
          <Text className="text-gray-700">
            lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor.
          </Text>
          <View className="flex-row items-center my-4">
            <TouchableOpacity onPress={decrementQuantity} className="bg-gray-300 p-2 rounded">
              <Text className="text-xl">-</Text>
            </TouchableOpacity>
            <Text className="mx-4 text-xl">{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} className="bg-gray-300 p-2 rounded">
              <Text className="text-xl">+</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={handleOrderService} className="bg-green-500 mt-2 py-3 px-4 rounded-md items-center">
            <Text className="text-white text-lg">Ajouter au panier</Text>
          </TouchableOpacity>
        </View>
        <View className="pb-16 justify-center">
          <TouchableOpacity className='flex flex-row items-center justify-center pt-4' onPress={() => router.push('../../Avis')}>
            <Text className="text-center text-blue-500 text-[17px] font-bold pr-4">Notes & Avis clients</Text>
            <FontAwesome name="angle-right" size={24} color="blue" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

export default DétailsProd;
