// IncompleteInfoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, BackHandler, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { setUser, setToken } from '../app/userSlice';


const ProfilSections = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const restartApp = async () => {
        if (Updates.reloadAsync) {
            await Updates.reloadAsync(); // Redémarre complètement l'application
        } else {
            console.log('Updates API not available.');
        }
    };
  const quitterApp = () => {
      Alert.alert(
          "Confirmation",
          "Voulez-vous vraiment vous déconnecter ?",
          [
              {
                  text: "Annuler",
                  style: "cancel"
              },
              {
                  text: "Quitter",
                  onPress: async () => {
                      await AsyncStorage.clear();
                      dispatch(setUser(null));
                      dispatch(setToken(null));
                      await restartApp();
                      // goToHome(navigation)
                  }
              }
          ]
      );
  };

  return (
    <View className='mt-6  bg-white h-screen'>
         <TouchableOpacity onPress={() => router.push('/ProfilePages/Infos')}>
      <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
        <View className="p-3 rounded-full ">
          <FontAwesome name="user" size={24} color="skyblue" />
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-black text-[16px] font-bold pb-0.2">Informations personnelles</Text>
          <Text className="text-gray-600 text-md">informations incomplètes</Text>
        </View>
        <View className='mr-10'>
          <FontAwesome name="exclamation" size={24} color="red" light />
        </View>
        <View>
          <FontAwesome name="angle-right" size={24} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
     <TouchableOpacity onPress={() => router.push('/ProfilePages/SuiviCom')}>
     <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
       <View className=" p-3 rounded-full ">
         <FontAwesome name="shopping-cart" size={24} color="skyblue" thin />
       </View>
       <View className="flex-1 ml-4">
         <Text className="text-black text-[16px] font-bold pb-0.2">Mes commandes</Text>
         <Text className="text-gray-600 text-md">Suivez le parcours de vos composants</Text>
       </View>
       <View className='mr-10'>
       </View>
       <View>
         <FontAwesome name="angle-right" size={24} color="gray" />
       </View>
     </View>
   </TouchableOpacity>
     <TouchableOpacity onPress={() => router.push('/Adresses')}>
     <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
       <View className=" p-3 rounded-full ">
         <FontAwesome name="shopping-cart" size={24} color="skyblue" thin />
       </View>
       <View className="flex-1 ml-4">
         <Text className="text-black text-[16px] font-bold pb-0.2">Mes adresses</Text>
         <Text className="text-gray-600 text-md">Configurez vos adresses</Text>
       </View>
       <View className='mr-10'>
       </View>
       <View>
         <FontAwesome name="angle-right" size={24} color="gray" />
       </View>
     </View>
   </TouchableOpacity>
  
 <TouchableOpacity  onPress={quitterApp}>
      <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
        <View className=" p-3 rounded-full ">
          <FontAwesome name="sign-out" size={24} color="skyblue" thin />
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-black text-[16px] font-bold pb-0.2">Se déconnecter</Text>
          <Text className="text-gray-600 text-md">Déconnecter ce compte</Text>
        </View>
        <View className='mr-10'>
        </View>
        <View>
          <FontAwesome name="angle-right" size={24} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
    </View>
   
  );
};

export default ProfilSections;
