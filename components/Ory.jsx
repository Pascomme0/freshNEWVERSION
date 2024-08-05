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
    {
        id: 1,
        label: "Senteur",
        image: img
    },
    {
        id: 2,
        label: "Gadgets maison & cuisine",
        image: img
    },
    {
        id: 3,
        label: "Autre",
        image: img
    },
    {
        id: 4,
        label: "Senteur",
        image: img
    },
    {
        id: 5,
        label: "Gadget et maison",
        image: img
    },
    {
        id: 6,
        label: "Autre",
        image: img
    },
];

const OryCard = ({ orys }) => (
    <Link push href={`../category/Category${orys.id}`} asChild className=''>
    <Pressable className="items-center ">
        <View className=' rounded-full bg-[#B9E9CD] w-[64px] h-[64px]  items-center justify-center'>
            <Image source={orys.image} className="w-9 h-9" />
        </View>
        <View className='flex '>
        <Text className="text-center  font-light text-[13px] pt-1">{orys.label}</Text>
        </View>
    </Pressable>
</Link>
);
const Ory = () => (
 
    <ScrollView className=' '>
           <View className='items-center pb-10'>
      <Text className="font-bold text-[19px] ">Categories</Text>
        </View>
    <StyledView className='items-center justify-center ' style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
      {orys.map(orys => (
        <StyledView className='pb-8' key={orys.id} style={{ width: '33%' }}>
          <OryCard orys={orys} />
        </StyledView>
      ))}
    </StyledView>

  </ScrollView>
  
);

export default Ory;
