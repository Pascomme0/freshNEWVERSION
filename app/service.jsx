import React from 'react';
import {View, Text, Image, Pressable, TouchableOpacity, Alert} from 'react-native';
import {Link, router} from 'expo-router';
import {styled} from 'nativewind';
import {Provider, useDispatch} from "react-redux";
import {setActiveMenu, setToken} from "./userSlice";
import {store} from "./store";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

function ServiceApp() {
    const dispatch = useDispatch();

    const redirectRoute = (route) => {
        dispatch(setActiveMenu(route));
        router.replace(route);
    }
    return (
        <StyledView className="flex-1 bg-white px-8 pt-2 pb-40">
            {/* Section 1: Logo */}
            <StyledView className="flex-1 justify-center items-center  pt-28  ">
                <Image source={require('../assets/images/fresh.png')} className="w-40 h-40"/>
            </StyledView>

            {/* Section 2: Texte */}
            <StyledView className="flex-1 justify-center items-center">
                <StyledText className="text-2xl text-center font-bold pb-10">Que voulez-vous faire aujourd'hui
                    ?</StyledText>
            </StyledView>

            {/* Section 3: Boutons */}
            <StyledView className="flex-1 flex-row justify-around items-center gap-10">
                <TouchableOpacity >
                    <StyledPressable className="items-cente" onPress={() => redirectRoute("/(tabs2)")}>
                        <StyledView style={(
                            {backgroundColor: 'rgba(28, 163, 247, 0.27)'}
                        )} className=" bg-slate-100 w-40 h-40  justify-center items-center rounded-lg">
                            <Image source={require('../assets/images/OBJECTS.png')} className="w-20 h-20"/>
                        </StyledView>
                        <StyledText className="mt-2 text-md text-center">Commander un {'\n'} service</StyledText>
                    </StyledPressable>
                </TouchableOpacity>
                <TouchableOpacity >
                    <StyledPressable className="items-center" onPress={() => redirectRoute("/(tabs)")}>
                        <StyledView style={(
                            {backgroundColor: 'rgba(28, 163, 247, 0.27)'}
                        )} className="w-40 h-40 justify-center items-center rounded-lg">
                            <Image source={require('../assets/images/IMGAGEE.png')} className="w-20 h-20"/>
                        </StyledView>
                        <StyledText className="mt-2 text-md text-center">Acheter un {'\n'} produit</StyledText>
                    </StyledPressable>
                </TouchableOpacity>
            </StyledView>
        </StyledView>
    );
}


export default function service() {
    return (
        <Provider store={store}>
            <ServiceApp/>
        </Provider>
    );
}