// App.js
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable, Alert} from 'react-native';
import {styled} from 'nativewind';
import img from '../assets/images/parffum.png'
import {FontAwesome} from '@expo/vector-icons';
import {Link, router, useNavigation} from 'expo-router';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../app/store";
import axios from "axios";
import {setActiveCat, setCategoriesVentes} from "../app/categorySlice";


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);

// const orys = [
//     {
//         id: 1,
//         label: "Senteur",
//         image: img
//     },
//     {
//         id: 2,
//         label: "Gadgets maison & cuisine",
//         image: img
//     },
//     {
//         id: 3,
//         label: "Autre",
//         image: img
//     },
//     {
//         id: 4,
//         label: "Senteur",
//         image: img
//     },
//     {
//         id: 5,
//         label: "Gadget et maison",
//         image: img
//     },
//     {
//         id: 6,
//         label: "Autre",
//         image: img
//     },
// ];

function OryApp() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categoriesVentes);

    const handleActiveCat = (cat) => {
        dispatch(setActiveCat(cat));
        router.push(`../category/Category1`)
    }

    const OryCard = ({orys}) => (
        <Pressable className="items-center " onPress={() => handleActiveCat(orys)}>
            <View className=' rounded-full bg-[#B9E9CD] w-[64px] h-[64px]  items-center justify-center'>
                <Image source={img} className="w-9 h-9"/>
            </View>
            <View className='flex '>
                <Text className="text-center  font-light text-[13px] pt-1">{orys.libelle}</Text>
            </View>
        </Pressable>
    );

    return (

        <ScrollView className=' '>
            <View className='items-center pb-10'>
                <Text className="font-bold text-[19px] ">Categories</Text>
            </View>
            <StyledView className='items-center justify-center '
                        style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                {categories.map(orys => (
                    <StyledView className='pb-8' key={orys.id} style={{width: '33%'}}>
                        <OryCard orys={orys}/>
                    </StyledView>
                ))}
            </StyledView>

        </ScrollView>

    );
}

export default function Ory() {
    return (
        <Provider store={store}>
            <OryApp/>
        </Provider>
    )
};
