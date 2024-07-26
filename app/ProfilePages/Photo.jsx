import React, { useState } from 'react';
import Back from '../../components/Back';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'nativewind'; 
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Photo() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleImagePick = async (side) => {
    // Demander la permission d'accès à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (side === 'front') {
        setFrontImage(result.assets[0].uri);
      } else {
        setBackImage(result.assets[0].uri);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
        <Back title='Mes documents'/>
      <Text className="text-base mb-4 text-center pt-16 pb-4">Scannez le recto et le verso de votre pièce d'identité</Text>
      <View className="mb-4 mt-6 ">
        <TouchableOpacity 
          className="bg-[#F5F5F5] border-1 border-gray-300 rounded-lg h-40 justify-center items-center mb-6"
          onPress={() => handleImagePick('front')}
        >
          {frontImage ? (
            <Image source={{ uri: frontImage }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          ) : (
            <Text className="text-gray-500">Recto</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="border-1 bg-[#F5F5F5] border-gray-300 rounded-lg h-40 justify-center items-center mb-28"
          onPress={() => handleImagePick('back')}
        >
          {backImage ? (
            <Image source={{ uri: backImage }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          ) : (
            <Text className="text-gray-500">Verso</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="bg-green-500 p-4 rounded-lg items-center">
        <Text className="text-white text-lg font-bold">Valider mes documents</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
