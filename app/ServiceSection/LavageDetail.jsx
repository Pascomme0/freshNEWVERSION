import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Pressable,
    ActivityIndicator
} from 'react-native';
import {styled} from 'nativewind';
import fauteuil from '../../assets/images/fauteuil.jpg'
import chaise from '../../assets/images/chaise.jpg'
import matelat from '../../assets/images/matelat.jpg'
import tapis from '../../assets/images/tapis.jpg'
import petittapis from '../../assets/images/petittapis.jpg'
import demenagement from '../../assets/images/demenagement.jpg'


import {FontAwesome} from '@expo/vector-icons';
import {Link, router, useNavigation} from 'expo-router';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../store";
import {pushDetailPanier, removeDetailPanier, setAdresse, setDetailPanier, setService} from "../panierServiceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


// Définir les styles en utilisant NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);


function LavageDetailApp() {
    const url = "https://admin.freshen-up.net";
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Fauteuil",
            price: 5000,
            image: fauteuil,
            rating: 4.6,
        },
        {
            id: 2,
            name: "Chaise",
            price: 2500,
            image: chaise,
            rating: 4.6,
        },
        {
            id: 3,
            name: "Matelas une place",
            price: 1000,
            image: matelat,
            rating: 4.6,
        },
        {
            id: 4,
            name: "Matelas deux places",
            price: 3500,
            image: matelat,
            rating: 4.6,
        },
        {
            id: 5,
            name: "Matelas trois places",
            price: 8000,
            image: matelat,
            rating: 4.6,
        },
        {
            id: 6,
            name: "Tapis (petit)",
            price: 1000,
            image: petittapis,
            rating: 4.6,
        },
        {
            id: 7,
            name: "Tapis (grand)",
            price: 2000,
            image: tapis,
            rating: 4.6,
        },

        {
            id: 8,
            name: "aménagement",
            price: 20000,
            image: demenagement,
            rating: 4.6,
        },

    ])

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const service = "/api/services/6"
    const detailPanier = useSelector((state) => state.panierService.detailPanier)

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal', // Autres options : 'currency', 'percent'
            minimumFractionDigits: 0, // Nombre minimum de décimales
            maximumFractionDigits: 0, // Nombre maximum de décimales
        }).format(number);
    }

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

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            const response = await axios.get(url + "/api/produits?isVente=0&priceProduits.service="+service);
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


    const ProductCard = ({product}) => (
        <View className="flex">
            <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
                <StyledImage
                    source={product?.imageProduits?.[0].path ? {uri: url + product?.imageProduits?.[0].path} : ''}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                />
                <StyledText className="mt-2 text-[16px] font-bold">Lavage
                    de {product?.libelle} {(product?.priceProduits?.[0].unite > 1) ? ('X ' + product?.priceProduits?.[0].unite) : ''}</StyledText>
                <StyledText style={{color: 'rgba(28, 163, 247, 1)'}} className="mt-1 text-lg">
                    {formatNumber(product?.priceProduits?.[0]?.prixUnitaire) + ' F CFA'}
                </StyledText>
                <StyledButton
                    className={isAdded(product) ? "mt-3 bg-red-500 p-2 rounded-lg" : "mt-3 bg-green-500 p-2 rounded-lg"}
                    onPress={() => addCart(product)}>
                    <StyledText
                        className="text-white text-center">{isAdded(product) ? "Retirer du panier" : "Ajouter au panier"}</StyledText>
                </StyledButton>
            </StyledView>
        </View>
    );
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
            {loading ? (<ActivityIndicator className="mt-5" size="large" color="blue"/>) : (
                <View className=' mb-8'>
                    <StyledView style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                        {products.map(product => (
                            <StyledView key={product.id} style={{width: '50%'}}>
                                <ProductCard product={product}/>
                            </StyledView>

                        ))}
                    </StyledView>
                </View>
            )}
            <Pressable className=" px-2 flex">
                <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
                    <Text className="text-blue-600 text-[14px] font-semibold pr-2 ">Voir tout</Text>
                    <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10} light
                                 className='items-center flex'/>
                </View>
            </Pressable>
        </ScrollView>

    )
};

export default function LavageDetail() {
    return (
        <Provider store={store}>
            <LavageDetailApp/>
        </Provider>
    )
};
