import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import nounou from '../../assets/images/nounou.jpg';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const Container = styled(View);
const Title = styled(Text);
const Description = styled(Text);
const Rating = styled(Text);
const ButtonContainer = styled(View);
const CustomButton = styled(TouchableOpacity);

const Nounou = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Container className="items-start relative">
                <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-4 left-4 z-10 p-2 rounded-full flex justify-center items-center"
                    >
                        <View className='rounded-full bg-slate-300 w-8 h-8 items-center justify-center'>
                            <FontAwesome name="angle-left" size={24} color="blue" />
                        </View>
                    </TouchableOpacity>
                    <Image 
                        source={nounou} 
                        style={{ width: '100%', height: 380 }} 
                        className="mb-4"
                    />
                    <Title className="text-[23px] text-left pb-2 font-bold px-4">Babysitter</Title>
                    <Rating className="text-yellow-500 text-[16px] pb-4 px-4">★★★★☆ (4.5)</Rating>
                    <Text className='px-4 text-[16px] font-bold'>Description du service</Text>
                    <Description className="px-4 pt-2 text-gray-500 text-justify">
                        Lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit.
                        Lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit.
                    </Description>
                </Container>
            </ScrollView>
            <ButtonContainer className=" px-4 pb-8">
                <CustomButton
                    onPress={() => router.push('./Contrats')}
                    className="h-[54px] bg-blue-500 rounded-lg items-center justify-center"
                >
                    <Text className="text-white text-lg font-bold">Remplir la fiche de demande</Text>
                </CustomButton>
            </ButtonContainer>
           
        </SafeAreaView>
    );
}

export default Nounou;
