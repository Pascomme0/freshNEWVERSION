import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {styled} from "nativewind";
import {router} from "expo-router";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const ImagesService = () => {
    return (
        <View className='w-full pb-4'>
            <Text className="font-bold text-[19px] pb-3">Services d'entreprises</Text>
            <View className='object-cover w-full h-[220px] mb-2'>
                <Image className='w-full rounded-md h-full object-cover object-center' source={require('../assets/images/entreprise.jpg')} />
            </View>
            <StyledText className="text-gray-400 text-[16px] font-bold mb-2">Nous prenons soins de vos locaux</StyledText>
            <StyledText className="mb-4">Vous êtes à la recherche d'agents d'entretiens pour vos locaux (bureaux, magasins, entrepôts ou salle de classe etc...), exprimez vos besoins et recevez un devis en 24h dans le but de vous satisfaire.</StyledText>
            <TouchableOpacity
                onPress={() => router.push('/MenageForm')}
                className="bg-blue-500 p-4 rounded-[5px]"
            >
                <StyledText className="text-white text-center text-lg">
                    Demander un devis
                </StyledText>
            </TouchableOpacity>
        </View>
    )
}

export default ImagesService