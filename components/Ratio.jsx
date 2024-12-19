import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Pressable,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView, SafeAreaView, Linking
} from 'react-native';
import { styled } from 'nativewind';
import {Link, router} from 'expo-router';
import {Provider, useDispatch, useSelector} from "react-redux";
import { FontAwesome5 } from '@expo/vector-icons';
import {store} from "../app/store";
import axios from "axios";
import {setProduitsCategorie} from "../app/categorySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    setActiveCommand,
    setActivePayLink,
    setAdresse, setClearPanier,
    setDetailPanier,
    setPaiement,
    setTotalLivraison
} from "../app/panierSlice";
import {setPayLink, setUser} from "../app/userSlice";

function RatioApp() {
    const url = "https://admin.freshen-up.net";
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingConf, setLoadingConf] = useState(false);
    const detailPanier = useSelector((state) => state.panier.detailPanier);
    const totalHt = useSelector((state) => state.panier.totalHt);
    const adresse = useSelector((state) => state.panier.adresse);
    const paiement = useSelector((state) => state.panier.paiement);
    const totalLivraison = useSelector((state) => state.panier.totalLivraison);
    const [paiements, setPaiements] = useState([]);
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const [selectedOption, setSelectedOption] = useState(null);
    const Button = styled(Pressable, 'flex-row items-center justify-center bg-green-500 rounded-md p-3');
    const ButtonText = styled(Text, 'text-white font-semibold mr-2');

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal', // Autres options : 'currency', 'percent'
            minimumFractionDigits: 0, // Nombre minimum de décimales
            maximumFractionDigits: 0, // Nombre maximum de décimales
        }).format(number);
    }

    const resetPanier = () => {
        dispatch(setClearPanier())
    }
    const handleCommand = async () => {
        if (paiement) {
            setLoadingConf(true);
            let det = [];
            // console.log(this.panier.detailDocuments);
            for (let i = 0; i < detailPanier.length; i++) {
                det.push({
                    produit: detailPanier[i].produit?.['@id'],
                    quantity: detailPanier[i].quantity,
                })
            }
            try {
                const response = await axios.post(`${url}/api/documents`, {
                    typeDocument: "/api/type_documents/1",
                    date: new Date(),
                    adresse,
                    detailDocuments: det,
                    paiement:{
                        moyenPaiement: paiement
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const cmd = response.data;
                dispatch(setActiveCommand(cmd['@id']))
                const responseConfirmation = await axios.get(`${url}${cmd['@id']}/validate`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (responseConfirmation.data.payLink) {
                    dispatch(setActivePayLink(responseConfirmation.data.payLink))
                    router.push('/Paiement-status');
                } else {
                    Alert.alert('Succès', 'Commande confirmée avec succès.');
                    resetPanier()
                    router.push('/(tabs)');
                }

            } catch (AxiosError) {
                console.log(AxiosError)
                Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'adresse');
            } finally {
                setLoadingConf(false);
            }
        } else {
            Alert.alert("Erreur", 'Choisissez un moyen de paiement.');
        }
    }


    useEffect(() => {
        const savePanierToStorage = async () => {
            try {
                const panier = {
                    adresse,
                    detailPanier,
                    totalHt,
                    paiement,
                    totalLivraison
                }
                await AsyncStorage.setItem('panier', JSON.stringify(panier));
            } catch (error) {
                console.error("Erreur lors de la sauvegarde dans AsyncStorage:", error);
            }
        };
        savePanierToStorage();
    }, [paiement]);


    const handlePaiement = (paiement) => {
        dispatch(setPaiement(paiement));
    }

    useEffect(() => {

        const initialize = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url + '/api/moyen_paiements');
                const data = response.data["hydra:member"];
                setPaiements(data);
            } catch (error) {
                Alert.alert('Erreur', 'Erreur de récupération');
            } finally {
                setLoading(false);
            }
        };
        initialize();
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text className="text-[18px] mb-3">Moyen de paiement</Text>
                {loading ? (<ActivityIndicator size="large" color="#2BBB68"/>) : null}
                <View className="flex-column space-y-5 mb-5">
                    {paiements.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            className="flex-row items-center bg-gray-200 p-5 rounded-lg"
                            onPress={() => handlePaiement(option['@id'])}
                        >
                            <View
                                className={`h-5 w-5 rounded-full border-2 ${paiement === option['@id'] ? 'border-blue-500' : 'border-gray-400'
                                } flex items-center justify-center`}
                            >
                                {paiement === option['@id'] && (
                                    <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                )}
                            </View>
                            <View className="flex-col mb-2">
                                <Text className="ml-2 text-base font-bold">{option.libelle}</Text>
                                {/*<Text className="ml-2 text-base text-sm font-normal">{option.description}</Text>*/}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className='bg-gray-200 py-6 rounded-lg  mb-5 mx-2 justify-center mt-16 w-90'>
                    <View className="py-3 w-[]  px-8  flex flex-row justify-between items-center border-b border-gray-300 pb-4">
                        <Text className='mr-4'>Sous-total</Text>
                        <Text className='ml-4'>{formatNumber(totalHt)} Fcfa</Text>
                    </View>
                    <View className="border-b border-gray-300 pb-4 py-3 px-8 flex flex-row justify-between items-center">
                        <Text style={(
                            { color: 'rgba(0, 0, 0, 0.5)' }
                        )} className='text-[13px] mr-4'>Livraison</Text>
                        <Text style={(
                            { color: 'rgba(0, 0, 0, 0.5)' }
                        )} className='text-[13px] ml-4'>{formatNumber(totalLivraison)} Fcfa</Text>
                    </View>
                    <View className="py-3 px-8 flex flex-row justify-between items-center">
                        <Text className='mr-4'>Total</Text>
                        <Text className='ml-4'>{formatNumber(totalHt + totalLivraison)} Fcfa</Text>
                    </View>
                </View>
                {/*<View className='flex flex-row items-center py-6'>*/}
                {/*    <View className='px-4'>*/}
                {/*        <Image className='h-12 w-12' source={require('../assets/images/wave.png')} />*/}
                {/*    </View>*/}
                {/*    <Text className='text-[16px] leading-6 font-bold '>Paiement éléctronique par {'\n'} wave unique </Text>*/}
                {/*</View>*/}
                <View style={styles.buttonContainer}>
                    {/*<Link push href="/paiement/Checkout1" asChild>*/}
                    {/*    */}
                    {/*</Link>*/}
                    <TouchableOpacity  style={styles.button} onPress={() => handleCommand()}>
                        {loadingConf ? <ActivityIndicator size="small" color="#fff" /> : (
                            <Text style={styles.buttonText}>Valider ma commande</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}



const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    buttonContainer: {
        // position: 'absolute',
        // bottom: 16,
        // left: 16,
        // right: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2BBB68',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width : '85%',
        borderRadius: 8,
        // top:240,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default function Ratio() {
    return (
        <Provider store={store}>
            <RatioApp/>
        </Provider>
    )
}
