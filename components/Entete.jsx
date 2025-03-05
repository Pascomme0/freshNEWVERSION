import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styled } from 'nativewind';
import {router, useRouter} from 'expo-router';
import {Provider, useDispatch} from "react-redux";
import {store} from "../app/store";
import {setActiveMenu} from "../app/userSlice";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput, 'w-full bg-gray-100 rounded-lg px-4 py-2 mb-2');

function EnteteApp({message, couleur}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const redirectRoute = (route) => {
        dispatch(setActiveMenu(route));
        router.replace(route);
    }

    return (
        <StyledView className="block items-center justify-between p-4 ">
            <View className='flex flex-row items-center justify-between space-x-28'>
                <Image source={require('../assets/images/fresh.png')} className="w-12 h-12" />
                <StyledTouchableOpacity
                    className="bg-[#055EEA] py-2 px-4 rounded-[20px]"
                    onPress={() => redirectRoute('/(tabs2)')}
                >
                    <StyledText className="text-white text-md">Basculer en mode Service</StyledText>
                </StyledTouchableOpacity>
            </View>
        </StyledView>
    );
}

export default function Entete({message, couleur}) {
    return(
        <Provider store={store}>
            <EnteteApp message={message} couleur={couleur} />
        </Provider>
    )
}