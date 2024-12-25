// App.js
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable} from 'react-native';
import {styled} from 'nativewind';
import douche from '../../assets/images/douche.jpg'
import salon from '../../assets/images/salon.jpg'
import cuisine from '../../assets/images/cuisine.jpg'
import chambre from '../../assets/images/chambre.jpg'
import école from '../../assets/images/école.jpg'
import entreprise from '../../assets/images/entreprise.jpg'


import {FontAwesome} from '@expo/vector-icons';
import {Link, router, useNavigation} from 'expo-router';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../store";
import vet from "../../assets/images/vetement.jpg";
import rideaux from "../../assets/images/repair.png";
import drap from "../../assets/images/drap.png";
import couette from "../../assets/images/couette.jpg";
import axios from "axios";
import {pushDetailPanier, removeDetailPanier, setAdresse, setDetailPanier, setService} from "../panierServiceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DesinfectionDetailApp() {
    const StyledView = styled(View);
    const StyledText = styled(Text);
    const StyledImage = styled(Image);
    const StyledButton = styled(TouchableOpacity);
    const url = "https://admin.freshen-up.net";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const service = "/api/services/5"
    const detailPanier = useSelector((state) => state.panierService.detailPanier)

    const isAdded = (product) => {
        return detailPanier.some(item => item.produit.id === product.id);
    }
    const addCart = async (product) => {
        if (isAdded(product)) {
            dispatch(removeDetailPanier(product.id));
            await savePanier();
        } else {
            let priceProduct = {
                unite: 0,
            }
            if (product === undefined) {
                priceProduct = {
                    unite: 0,
                }
            } else {
                let tab = product?.priceProduits ?? [];
                for (const price of tab) {
                    let id = price?.service?.['@id'] ?? 'nope'
                    if (id === service) {
                        priceProduct = price;
                        break;
                    }
                }
            }
            const unite = priceProduct?.unite ?? 1;
            const dat = {
                produit: product,
                quantity: unite
            }
            dispatch(pushDetailPanier(dat));
            await savePanier();
        }
    }

    const savePanier = async () => {
        const panier = await AsyncStorage.getItem('panierService');
        let newObject = {
            service: service,
            detailPanier
        }
        if (panier) {
            const listPanier = JSON.parse(panier);
            let found = false;

            let updatedData = listPanier.map(item => {
                if (item.service === service) {
                    found = true;
                    // Remplacer complètement par un nouvel objet
                    return newObject;
                }
                // Sinon, retourner l'objet tel quel
                return item;
            });

            // Ajouter le nouvel objet si aucun élément ne correspond au critère
            if (!found) {
                updatedData.push(newObject);
            }
            await AsyncStorage.setItem('panierService', JSON.stringify(updatedData));
        }

    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal', // Autres options : 'currency', 'percent'
            minimumFractionDigits: 0, // Nombre minimum de décimales
            maximumFractionDigits: 0, // Nombre maximum de décimales
        }).format(number);
    }

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            const response = await axios.get(url + "/api/produits?isVente=0&priceProduits.service=/api/services/5");
            // console.log(response.data["hydra:member"])
            setProducts(response.data["hydra:member"]);
            setLoading(false);
        }
        initialize();
        const checkPanier = async () => {
            const panier = await AsyncStorage.getItem('panierService');
            if (panier) {
                const listPanier = JSON.parse(panier);
                let foundPanier = listPanier.find(item => item.service === service);
                dispatch(setService(foundPanier?.service ?? service))
                dispatch(setDetailPanier(foundPanier?.detailPanier ?? []));
                dispatch(setAdresse(foundPanier?.adresse ?? null));
            } else {

            }
        }
        checkPanier();
    }, [])


    const ProductCard = ({ product }) =>{
        let prix = 0;
        if (product === undefined) {
            prix = 0;
        } else {
            let tab = product?.priceProduits ?? [];
            for (const price of tab) {
                let id = price?.service?.['@id'] ?? 'nope'
                if (id === service) {
                    prix = price?.prixUnitaire ?? 0;
                    break;
                }
            }
        }
        return (
            // <Link href={`/Desinsectisation/${product?.id}`} asChild>
            //
            // </Link>
            <Pressable className="flex">
                <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
                    <StyledImage
                        source={product?.imageProduits?.[0].path ? { uri: url + product?.imageProduits?.[0].path } : ''}
                        className="w-full h-40 rounded-lg"
                        resizeMode="cover"
                    />
                    <StyledText className="mt-2 text-[16px] font-bold">{product?.libelle}</StyledText>
                    <StyledText style={{ color: 'rgba(28, 163, 247, 1)' }} className="mt-1 text-lg">
                        {formatNumber(prix) + ' F CFA'}
                    </StyledText>
                    <StyledButton
                        className={isAdded(product) ? "mt-3 bg-red-500 p-2 rounded-lg" : "mt-3 bg-green-500 p-2 rounded-lg"}
                        onPress={() => addCart(product)}>
                        <StyledText
                            className="text-white text-center">{isAdded(product) ? "Retirer du panier" : "Ajouter au panier"}</StyledText>
                    </StyledButton>
                </StyledView>
            </Pressable>

        )
    };

    return (
        <ScrollView className='bg-white'>
            <View className='mt-2 mb-2 flex flex-row justify-end'>
                <StyledButton
                    className="mt-3 bg-green-500 p-2 me-2 rounded-lg"
                    onPress={() => router.push("/shopService")}
                >
                    <StyledText
                        className="text-white text-center">Voir mon panier</StyledText>
                </StyledButton>
            </View>
            <View className='mb-10 '>
                <StyledView style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                    {products.map(product => (
                        <StyledView key={product.id} style={{width: '50%'}}>
                            <ProductCard product={product}/>
                        </StyledView>
                    ))}
                    <StyledView style={{width: '50%'}}>
                        <Link href={`/Desinfectionn/5`} asChild>
                            <Pressable className="flex">
                                <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
                                    <StyledImage
                                        source={école}
                                        className="w-full h-40 rounded-lg"
                                        resizeMode="cover"
                                    />
                                    <StyledText className="mt-2 text-[16px] font-bold">Ecole</StyledText>
                                    <StyledText style={{color: 'rgba(28, 163, 247, 1)'}} className="mt-1 text-lg">
                                        Sur devis
                                    </StyledText>
                                </StyledView>
                            </Pressable>
                        </Link>
                    </StyledView>
                    <StyledView style={{width: '50%'}}>
                        <Link href={`/Desinfectionn/6`} asChild>
                            <Pressable className="flex">
                                <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
                                    <StyledImage
                                        source={entreprise}
                                        className="w-full h-40 rounded-lg"
                                        resizeMode="cover"
                                    />
                                    <StyledText className="mt-2 text-[16px] font-bold">Entreprise</StyledText>
                                    <StyledText style={{color: 'rgba(28, 163, 247, 1)'}} className="mt-1 text-lg">
                                        Sur devis
                                    </StyledText>
                                </StyledView>
                            </Pressable>
                        </Link>
                    </StyledView>
                </StyledView>
            </View>

        </ScrollView>
    )
}

export default function DesinfectionDetail() {
    return (
        <Provider store={store}>
            <DesinfectionDetailApp/>
        </Provider>
    )
};

