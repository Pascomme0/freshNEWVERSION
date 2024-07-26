// App.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView,Pressable } from 'react-native';
import { styled } from 'nativewind';
import img from '../assets/images/menagedata.png'
import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { menages } from '../constants/menagedata';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);



const ProductCard = ({ menage }) => (
    <Link push href='/DetailsService' asChild className=''>
    <Pressable className="  flex">
    <StyledView className="p-4 bg-white rounded-lg shadow-md mb-4 w-35">
        <StyledImage
            source={menage.image }
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
        />
        <StyledText className="mt-2 text-lg font-bold">{menage.name}</StyledText>
        <StyledText className="mt-1 text-lg text-[#1CA3F7]">{menage.price} FCFA</StyledText>

    </StyledView>
    </Pressable>
</Link>

);
const ServiceList = () => (
 
    <ScrollView className='pt-2 pb-4'>
           <View className=' justify-center '>
      <Text className=" text-center font-bold text-[19px] pt-3 pb-8">Menage & repassage</Text>
        </View>
    <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
      {menages.map(menage => (
        <StyledView key={menage.id} style={{ width: '50%' }}>
          <ProductCard menage={menage} />
        </StyledView>
      ))}
    </StyledView>

  </ScrollView>
  
);

export default ServiceList;
