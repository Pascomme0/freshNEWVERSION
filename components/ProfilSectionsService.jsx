// IncompleteInfoCard.js
import React from 'react';
import {View, Text, TouchableOpacity, BackHandler, Platform, Alert, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken, setUser} from "../app/userSlice";
import {Provider, useDispatch} from "react-redux";
import {store} from "../app/store";
import * as Updates from "expo-updates";


function ProfilSectionsServiceApp() {
    const dispatch = useDispatch()
    const router = useRouter();

    const restartApp = async () => {
        if (Updates.reloadAsync) {
            await Updates.reloadAsync(); // Redémarre complètement l'application
        } else {
            console.log('Updates API not available.');
        }
    };

    const quitterApp = () => {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment vous déconnecter ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Quitter",
                    onPress: async () => {
                        await AsyncStorage.clear();
                        dispatch(setUser(null));
                        dispatch(setToken(null));
                        await restartApp();
                        // goToHome(navigation)
                    }
                }
            ]
        );
    };

    return (
        <View className='mt-6  bg-white h-screen'>
            <TouchableOpacity onPress={() => router.push('/ProfilePages/Infos')}>
                <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
                    <View className="p-3 rounded-full ">
                        <FontAwesome name="user" size={24} color="skyblue"/>
                    </View>
                    <View className="flex-1 ml-4">
                        <Text className="text-black text-[16px] font-bold pb-0.2">Informations personnelles</Text>
                        <Text className="text-gray-600 text-md">informations incomplètes</Text>
                    </View>
                    <View className='mr-10'>
                        <FontAwesome name="exclamation" size={24} color="red" light/>
                    </View>
                    <View>
                        <FontAwesome name="angle-right" size={24} color="gray"/>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/ProfilePages/SuiviComService')}>
                <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
                    <View className=" p-3 rounded-full ">
                        <FontAwesome name="shopping-cart" size={24} color="skyblue" thin/>
                    </View>
                    <View className="flex-1 ml-4">
                        <Text className="text-black text-[16px] font-bold pb-0.2">Mes commandes</Text>
                        <Text className="text-gray-600 text-md">Suivez vos commandes</Text>
                    </View>
                    <View className='mr-10'>
                    </View>
                    <View>
                        <FontAwesome name="angle-right" size={24} color="gray"/>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/Adresses')}>
                <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
                    <View className=" p-3 rounded-full ">
                        <FontAwesome name="shopping-cart" size={24} color="skyblue" thin/>
                    </View>
                    <View className="flex-1 ml-4">
                        <Text className="text-black text-[16px] font-bold pb-0.2">Mes adresses</Text>
                        <Text className="text-gray-600 text-md">Configurez vos adresses</Text>
                    </View>
                    <View className='mr-10'>
                    </View>
                    <View>
                        <FontAwesome name="angle-right" size={24} color="gray"/>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/Justificatifs')}>
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="user" size={24} color="skyblue"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Mon Compte</Text>
                        <Text style={styles.subtitle}>vérifier votre statut</Text>
                    </View>
                    <View style={styles.warningIcon}>
                        <FontAwesome name="exclamation" size={24} color="red" light/>
                    </View>
                    <View>
                        <FontAwesome name="angle-right" size={24} color="gray"/>
                    </View>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={quitterApp}>
                <View className="flex-row items-center py-4 px-4  shadow-md rounded-md">
                    <View className=" p-3 rounded-full ">
                        <FontAwesome name="sign-out" size={24} color="skyblue" thin/>
                    </View>
                    <View className="flex-1 ml-4">
                        <Text className="text-black text-[16px] font-bold pb-0.2">Se déconnecter</Text>
                        <Text className="text-gray-600 text-md">Déconnecter ce compte</Text>
                    </View>
                    <View className='mr-10'>
                    </View>
                    <View>
                        <FontAwesome name="angle-right" size={24} color="gray"/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    );
};

export default function ProfilSectionsService() {
    return (
        <Provider store={store}>
            <ProfilSectionsServiceApp/>
        </Provider>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        backgroundColor: 'white',
    },
    innerContainer: {
        marginTop: 24,
        height: '100%',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        borderRadius: 8,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 50,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'gray',
        fontSize: 14,
    },
    warningIcon: {
        marginRight: 40,
    },
});
