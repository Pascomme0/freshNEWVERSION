// IncompleteInfoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, BackHandler, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ProfilSectionsService = () => {
  const router = useRouter();
  const quitterApp = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Alert.alert(
        "Quitter l'application",
        "La fermeture d'application n'est pas supportée sur iOS. Veuillez utiliser le gestionnaire de tâches de votre appareil pour quitter l'application.",
        [{ text: "OK" }]
      );
    }
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
     <TouchableOpacity onPress={() => router.push('/ProfilePages/SuiviComService')}>
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

export default ProfilSectionsService;
