import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Alert, Linking} from 'react-native';
import {Provider, useSelector, useDispatch} from "react-redux";
import {store} from "./store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setClearPanier} from "./panierSlice";
import {router} from "expo-router";

function LoadingScreenApp() {
    const dispatch = useDispatch();
    const intervalRef = useRef(null);
    const cmd = useSelector(state => state.panier.activeCommand);
    const payLink = useSelector(state => state.panier.activePayLink);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);
    const token = useSelector((state) => state.user.token);
    const url = 'https://admin.freshen-up.net';


    const handleCancel = async () => {
        if(isLoading){
            Alert.alert(
                "Confirmation", // Titre de l'alerte
                "Êtes-vous sûr de vouloir continuer ?", // Message de l'alerte
                [
                    {
                        text: "Annuler",
                        onPress: () => console.log("Action annulée"),
                        style: "cancel", // Style par défaut pour les actions annulables
                    },
                    {
                        text: "Confirmer",
                        onPress: async () => {
                            dispatch(setClearPanier())
                            await AsyncStorage.removeItem('panier');
                            clearInterval(intervalRef.current);
                            router.push('(tabs)');
                        },
                    },
                ],
                { cancelable: false } // Empêche la fermeture en cliquant en dehors de l'alerte
            );
        } else {
            dispatch(setClearPanier())
            await AsyncStorage.removeItem('panier');
            clearInterval(intervalRef.current);
            router.push('(tabs)');
        }

        // if (isSuccess) {
        //     // Navigue vers l'accueil si l'opération a réussi
        //     navigation.navigate('Home'); // Remplacez par la bonne route
        // } else {
        //     // Arrête la simulation et réinitialise l'état
        //     clearInterval(intervalRef.current); // Arrête le setInterval
        //     setIsLoading(false); // Met à jour l'état pour refléter l'annulation
        // }
    };
    let nb=0;
    const simulateLoading = async () => {
        await AsyncStorage.removeItem('panier');
        intervalRef.current = setInterval(async () => {
            const commande = await axios.get(url + cmd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(commande.data.paiement.statusPay);
            if (commande.data.paiement.statusPay === 'PAID') {
                setIsSuccess(true);
                setIsLoading(false);
                dispatch(setClearPanier())
                await AsyncStorage.removeItem('panier');
                clearInterval(intervalRef.current);
            } else if (commande.data.paiement.statusPay === 'CANCELED') {
                setIsCanceled(true);
                setIsLoading(false);
                dispatch(setClearPanier())
                await AsyncStorage.removeItem('panier');
                clearInterval(intervalRef.current);
            } else if (commande.data.paiement.statusPay === 'PENDING') {
                nb++;
                if (nb === 10) {
                    setIsCanceled(true);
                    setIsLoading(false);
                    dispatch(setClearPanier())
                    await AsyncStorage.removeItem('panier');
                    clearInterval(intervalRef.current);
                    nb = 0;
                }
            }
            clearInterval(intervalRef.current); // Arrête la boucle une fois le succès atteint
        }, 2000); // Intervalle de 2 seconde
        const supported = await Linking.canOpenURL(payLink);
        console.log(supported);
        if (supported) {
            await Linking.openURL(payLink);
        } else {
            Alert.alert("Erreur", "Impossible d'ouvrir la page de paiement.");
        }
    };



    useEffect(() => {
        simulateLoading();
        return () => {
            clearInterval(intervalRef.current); // Nettoyage de l'intervalle
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                ) : isSuccess ? (
                    <Text style={styles.successMessage}>Opération réussie 🎉</Text>
                ) : (
                    <Text style={styles.errorMessage}>Chargement annulé</Text>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>{isSuccess ? 'Retour à l\'accueil' : 'Annuler'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
    },
    errorMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#dc3545',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default function LoadingScreen() {
    return (
        <Provider store={store}>
            <LoadingScreenApp />
        </Provider>
    );
};
