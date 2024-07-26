import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Touchable, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Link } from 'expo-router';



const InputContainer = styled(View, 'mb-4');
const Input = styled(TextInput, 'border border-gray-300 rounded-lg ');
const InputLabel = styled(Text, 'text-gray-600 mb-1 text-[16px]');

const Button = styled(Pressable, 'flex-row items-center justify-center bg-green-500 rounded-md p-3');
const ButtonText = styled(Text, 'text-white font-semibold mr-2');

const Checkout = () => {
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePromo, setCodePromo] = useState('');

  return (
    <View className=" py-4 px-6 ">
      <InputContainer>
        <InputLabel className='pb-1 text-black pl-1' >Ville de livraison</InputLabel>
        <Input
          placeholder="Yopougon Niangon Sud 6 Gauche"
          value={ville}
          onChangeText={setVille}
          className="pl-4 h-[50px]"
        />
      </InputContainer>

      <InputContainer className=''>
        <InputLabel className='text-black pl-1'>Adresse</InputLabel>
        <Input
          placeholder="Yopougon Niangon Sud 6 Gauche"
          value={adresse}
          onChangeText={setAdresse}
          className="px-4 py-3
          
            text-[13px] h-[80px] text-wrap
          "
          multiline
        numberOfLines={4}
        textAlignVertical="top"
        />
      </InputContainer>


      <View  className='bg-gray-200 py-6 mb-6 rounded-lg mx-6 justify-center'>
        <View  className="py-3 w-[]  px-8  flex flex-row justify-between items-center border-b border-gray-300 pb-4">
            <Text  className='mr-4'>Sous-total</Text>
            <Text className='ml-4'>2000 Fcfa</Text>
        </View>
        <View className="border-b border-gray-300 pb-4 py-3 px-8 flex flex-row justify-between items-center">
            <Text style={(
              {color:'rgba(0, 0, 0, 0.5)'}
            )} className='text-[13px] mr-4'>Livraison</Text>
            <Text style={(
              {color:'rgba(0, 0, 0, 0.5)'}
            )} className='text-[13px] ml-4'>1000 Fcfa</Text>
        </View>
        <View className="py-3 px-8 flex flex-row justify-between items-center">
            <Text className='mr-4'>Total</Text>
            <Text className='ml-4'>6000 Fcfa</Text>
        </View>
      
    </View>
    <View className='mt-8 mx-2'  >
    <Link push href="/paiement/Checkout1" asChild>
    <Button className='justify-between items-center'>
        <ButtonText className='text-center pl-28 text-[18px] font-bold'>Suivant</ButtonText>
        <FontAwesome5 className='' name="angle-right" size={18} color="#fff" />
      </Button>
      </Link>
    </View>

    </View>
   
  );
};

export default Checkout;