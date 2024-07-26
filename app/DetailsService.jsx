import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import Back from '../components/Back';

const DetailsService = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <View className=" bg-white py-4 h-screen">
        
      <Image
        source={require('../assets/images/repair.png')} 
        className="w-full h-[50%]"
      />
      <View className="mt-4 px-4">
        <Text className="text-[20px] pb-4 font-bold">Douche</Text>
        <View className="flex-row items-center">
          <Text className="text-yellow-500">★★★★☆</Text>
          <Text className="ml-2 text-gray-600">(4.5)</Text>
        </View>
        <Text className="text-xl font-bold mt-2">6000 F</Text>
        <Text className="text-gray-600 pt-4 pb-3">
          Description du service lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum.
        </Text>
        <View className="flex-row items-center mb-4 mt-4">
          <TouchableOpacity onPress={decrement} className="bg-gray-200 p-2 rounded">
            <Text className="text-xl">-</Text>
          </TouchableOpacity>
          <Text className="mx-4 text-lg">{quantity}</Text>
          <TouchableOpacity onPress={increment} className="bg-gray-200 p-2 rounded">
            <Text className="text-xl">+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-blue-500 p-4 rounded mt-4">
          <Text className="text-white text-center">Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsService;
