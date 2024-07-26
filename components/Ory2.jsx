// App.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView,Pressable } from 'react-native';
import { styled } from 'nativewind';
import img from '../assets/images/parffum.png'
import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);

const orys = [
    { id: 1, label: 'Lavage et repassage', icon: require('../assets/images/Lessive.png'),lien:`../ListServices/Lessive` },
    { id: 2, label: 'Menage ', icon: require("../assets/images/Menage.png"),lien:`../ListServices/Menage` },
    { id: 3, label: 'Désinfection à lunité', icon: require('../assets/images/Desinfection.png'),lien:`../ListServices/Desinfection` },
    { id: 4, label: 'Dératisation', icon: require('../assets/images/Deratisation.png'),lien:`../ListServices/Deratisation` },
    { id: 5, label: 'nounou', icon: require('../assets/images/nounou.png'),lien:`../ListServices/Nounou` },
    { id: 6, label: 'cuisinière', icon: require('../assets/images/Cuisinière.png'), lien:`../ListServices/Cuisiniere` },
    { id: 7, label: 'Menage et vaisselle (Evenement)', icon: require('../assets/images/Vaisselle.png'),lien:`../ListServices/MenLav` },
    { id: 8, label: 'lavage auto', icon: require('../assets/images/Lavageauto.png'),lien:`../ListServices/Auto` },
    { id: 9, label: 'Désinsectisation', icon: require('../assets/images/Desinsectisation.png'),lien:`../ListServices/Desinsectisation` },
    { id: 10, label: 'Lavage à l unité', icon: require('../assets/images/Lavage.png'),lien:`../ListServices/LavageUnit` },

];

const OryCard = ({ orys }) => (
    <Link push href={orys.lien} asChild className=''>
    <Pressable className="items-center ">
        <View className=' rounded-full bg-[#D2EDFE] w-[64px] h-[64px]  items-center justify-center'>
            <Image source={orys.icon} className="w-8 h-8" />
        </View>
        <View className='flex '>
        <Text className="text-center  font-semibold text-[14px] pt-1">{orys.label}</Text>
        </View>
    </Pressable>
</Link>
);
const Ory2 = () => (
 
    <ScrollView className='px-4 '>
           <View className='items-center pb-10'>
      <Text className="font-bold text-[19px] ">Categories</Text>
        </View>
    <StyledView className='items-center justify-left ' style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
      {orys.map(orys => (
        <StyledView className='pb-8' key={orys.id} style={{ width: '33%' }}>
          <OryCard orys={orys} />
        </StyledView>
      ))}
    </StyledView>

  </ScrollView>
  
);

export default Ory2;
