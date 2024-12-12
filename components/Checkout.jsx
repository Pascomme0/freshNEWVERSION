import React, {useState, useEffect} from 'react';
import {View, TextInput, Pressable, Text, Touchable, TouchableOpacity, Alert} from 'react-native';
import {styled} from 'nativewind';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Link, router} from 'expo-router';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../app/store";
import {setAdresse, setTotalLivraison} from "../app/panierSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


const InputContainer = styled(View, 'mb-4');
const Input = styled(TextInput, 'border border-gray-300 rounded-lg ');
const InputLabel = styled(Text, 'text-gray-600 mb-1 text-[16px]');

const Button = styled(Pressable, 'flex-row items-center justify-center bg-green-500 rounded-md p-3');
const ButtonText = styled(Text, 'text-white font-semibold mr-2');

function CheckoutApp() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const adresse = useSelector((state) => state.panier.adresse);
    const detailPanier = useSelector((state) => state.panier.detailPanier);
    const totalHt = useSelector((state) => state.panier.totalHt);
    const paiement = useSelector((state) => state.panier.paiement);
    const totalLivraison = useSelector((state) => state.panier.totalLivraison);
    const [selectedOption, setSelectedOption] = useState(null);
    const [commune, setCommune] = useState({});
    const [codePromo, setCodePromo] = useState('');

    const handleAdresse = (adresse) => {
        dispatch(setAdresse(adresse['@id']));
        dispatch(setTotalLivraison(adresse.commune.tarifLivraison));
    }

    const handleNext = () => {
        if (!adresse) {
            Alert.alert("Erreur", "Veuillez choisir une adresse de livraison");
        } else {
            const ville = user?.adresses.find(ad => ad['@id'] === adresse).commune;
            dispatch(setTotalLivraison(ville.tarifLivraison));
            router.push('/paiement/Checkout1')
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
    }, [adresse]);

    return (
        <View className=" py-4 px-6 ">
            <Text className="ml-2 text-base font-bold mb-2">Adresse de livraison</Text>
            <View className="flex-column space-y-5 mb-5">
                {(!user?.adresses || user.adresses.length === 0) ? (
                    <Text className="ml-2 text-base mb-2">Aucune Adresse</Text>
                ) : (
                    user.adresses.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            className="flex-row items-center bg-gray-200 p-5 rounded-lg"
                            onPress={() => handleAdresse(option)}
                        >
                            <View
                                className={`h-5 w-5 rounded-full border-2 ${adresse === option['@id'] ? 'border-blue-500' : 'border-gray-400'
                                } flex items-center justify-center`}
                            >
                                {adresse === option['@id'] && (
                                    <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                )}
                            </View>
                            <View className="flex-col mb-2">
                                <Text className="ml-2 text-base font-bold">{option.commune.label}</Text>
                                <Text className="ml-2 text-base text-sm font-normal">{option.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}

            </View>
            {(!user?.adresses || user.adresses.length === 0) ? (
                <Link push href="/(tabs)/user" asChild>
                    <Button className='justify-between items-center'>
                        <ButtonText className='text-center text-[18px] font-bold'>Ajouter des adresses</ButtonText>
                        <FontAwesome5 className='' name="angle-right" size={18} color="#fff"/>
                    </Button>
                </Link>
            ) : (
                <Button className='justify-between items-center' onPress={() => handleNext()}>
                    <ButtonText className='text-center pl-28 text-[18px] font-bold'>Suivant</ButtonText>
                    <FontAwesome5 className='' name="angle-right" size={18} color="#fff"/>
                </Button>
            )}
        </View>

    );
};


export default function Checkout() {
    return (
        <Provider store={store}>
            <CheckoutApp/>
        </Provider>
    )
};