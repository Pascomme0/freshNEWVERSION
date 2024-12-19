import {ActivityIndicator, Alert, Button, Image, ImageBackground, Pressable, Text, View} from "react-native";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { store } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setToken } from './userSlice';

import {Link, useRouter} from "expo-router";
import {Provider, useDispatch, useSelector} from "react-redux";
import axios from "axios";
import img from '../assets/images/LOGO.png'
import {Pusher, PusherEvent} from "@pusher/pusher-websocket-react-native";

function App() {
    const url = "https://admin.freshen-up.net";
    const inset = useSafeAreaInsets();
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await axios.post(url + '/api/login', {
                username,
                password,
            });
            const token = response.data.token;
            dispatch(setToken(token));

            const userResponse = await axios.get(url + '/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = userResponse.data["hydra:member"][0];
            await AsyncStorage.setItem('credentials', JSON.stringify({ username, password, token }));
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUser(userData));
            dispatch(setToken(token));
            router.push('/service');
            // router.push('/Paiement-status')
        } catch (error) {
            Alert.alert('Erreur', 'Identifiants invalides');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const checkUser = async () => {
            const credentials = await AsyncStorage.getItem('credentials');
            if (credentials) {
                const { username, password, token } = JSON.parse(credentials);
                await handleLogin(username, password);
            }
        };
        checkUser();
    }, []);

    return (
        <SafeAreaProvider>
            {
                loading ? (
                    <View className="absolute top-0 left-0 w-full h-full bg-blue-300 bg-opacity-50 flex items-center justify-center">
                        <Image
                            source={img}
                            className="w-32 h-32"
                        />
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) : (
                    <View style={{paddingTop: inset.top}} className="flex flex-col   bg-white h-screen">
                        <View className="w-full h-[60%] flex items-center ">
                            <ImageBackground resizeMode="cover" className="w-full h-full items-center"
                                             source={require('@/assets/images/clean.png')}></ImageBackground>
                        </View>

                        <View className=" h-[50%] flex flex-col bg-white rounded-t-2xl pt-6  w-full">
                            <View className="mt-10">
                                <Text className="text-center text-[20px]   font-bold">
                                    Commandez des services
                                </Text>
                                <Text className="text-center text-[20px]  ">
                                    d{"'"}entretien pour vos besoins
                                </Text>
                            </View>
                            <View className=" z-50 fixed flex flex-row  items-center mt-[20%] justify-center space-x-40">

                                <View className="flex flex-row gap-2  justify-center ">
                                    <View className="w-[15px] rounded-md bg-blue-300 h-[8px]"></View>
                                    <View className="w-[8px] rounded-xl bg-slate-300 h-[8px"></View>
                                    <View className="w-[8px] rounded-xl bg-slate-300 h-[8px]"></View>
                                    <View className="w-[8px] rounded-xl bg-slate-300 h-[8px]"></View>
                                </View>
                                <Link replace href={"/onboard2"} asChild>
                                    <Pressable>
                                        <View
                                            className="rounded-md px-4 w-[72px] h-[52px] text-white mt-5 bg-[#1DA6F8] flex items-center justify-center mb-4">
                                            <FontAwesome name="arrow-right" size={20} color="white" light/>
                                        </View>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>
                    </View>
                )
            }
        </SafeAreaProvider>
    )
}

export default function Index() {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
