import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../../assets/images/user.png'; 
import Back from '../../components/Back';


const NoterService = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    Alert.alert('Vote validé');
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
        <Back title='Noter le service'/>
      <Image source={image} className="w-52 h-52 rounded-lg mt-8" />
      <Text className="text-blue-500 text-2xl font-bold mt-6 ">Salimata Koné</Text>
      <Text className="text-black text-2xl mt-2">25 ans</Text>
      <Text className="text-black text-sm mb-16 mt-2">Inscrite depuis Juillet 2019</Text>
      <Text className="text-black text-lg mt-6">Quelle est votre note ?</Text>
      <View className="flex-row mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Text className={`text-6xl px-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 w-80 h-12 px-4 py-2 rounded-lg mt-6">
        <Text className="text-white text-lg text-center">Valider</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NoterService;
