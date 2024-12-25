// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
// import { styled } from 'nativewind';
// import douche from '../../assets/images/douche.jpg';
// import car from '../../assets/images/car.jpg';
// import grosengin from '../../assets/images/grosengin.jpg';
// import chambre from '../../assets/images/chambre.jpg';
// import école from '../../assets/images/école.jpg';
// import entreprise from '../../assets/images/entreprise.jpg';
//
// import { FontAwesome } from '@expo/vector-icons';
// import { Link, useNavigation } from 'expo-router';
//
// // Définir les styles en utilisant NativeWind
// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledImage = styled(Image);
// const StyledButton = styled(TouchableOpacity);
//
// const products = [
//
//     {
//         id: 1,
//         name: "Car et bus",
//         price: 2500,
//         image: car,
//     },
//     {
//         id: 2,
//         name: "Gros engin",
//         price: 1000,
//         image: grosengin,
//     },
//
// ];
//
// const ProductCard = ({ product }) => (
//     <Link push href='/' asChild className=''>
//         <Pressable className="flex">
//             <StyledView className="p-4 bg-white shadow-md mb-4 w-35">
//                 <StyledImage
//                     source={product.image}
//                     className="w-full h-40 rounded-lg"
//                     resizeMode="cover"
//                 />
//                 <StyledText className="mt-2 text-[16px] font-bold">{product.name}</StyledText>
//                 <StyledText style={{ color: 'rgba(28, 163, 247, 1)' }} className="mt-1 text-lg">
//                     {product.price === 'sur devis' ? product.price : `${product.price} FCFA`}
//                 </StyledText>
//             </StyledView>
//         </Pressable>
//     </Link>
// );
//
// const LavageNormal = () => (
//     <ScrollView className='bg-white'>
//         <View className='mb-10 '>
//         <Link push href='/DetailsService' asChild className=''>
//             <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
//                 {products.map(product => (
//                     <StyledView key={product.id} style={{ width: '50%' }}>
//                         <ProductCard product={product} />
//                     </StyledView>
//                 ))}
//             </StyledView>
//         </Link>
//         </View>
//
//
//     </ScrollView>
// );
//
// export default LavageNormal;


// App.js
import React, {useEffect, useState} from 'react';
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
import couette from '../../assets/images/couette.jpg'
import rideaux from '../../assets/images/repair.png'
import vet from '../../assets/images/vetement.jpg'
import drap from '../../assets/images/drap.png'
import {FontAwesome} from '@expo/vector-icons';
import {Link, router, useNavigation} from 'expo-router';
import {useRouter} from 'expo-router';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../store";
import axios from "axios";
import img from "../../assets/images/prod.png";
import {pushDetailPanier, removeDetailPanier, setAdresse, setDetailPanier, setService} from "../panierServiceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LavageNormalApp() {
    const url = "https://admin.freshen-up.net";
    const StyledView = styled(View);
    const StyledText = styled(Text);
    const StyledImage = styled(Image);
    const StyledButton = styled(TouchableOpacity);
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Lavage de vetements",
            price: 5000,
            image: vet,
            unit: '10 vetements'
        },
        {
            id: 2,
            name: "Lavage rideaux",
            price: 2500,
            image: rideaux,
            unit: 'à l unité'
        },
        {
            id: 3,
            name: "Lavage de drap",
            price: 1000,
            image: drap,
            unit: 'à l unité'
        },
        {
            id: 4,
            name: "Lavage de couette",
            price: 3500,
            image: couette,
            unit: 'à l unité'
        },
        {
            id: 5,
            name: "Drap",
            price: 3500,
            image: couette,
            unit: 'à l unité'
        },
        {
            id: 6,
            name: "Coussin",
            price: 3500,
            image: couette,
            unit: 'à l unité'
        }

    ]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const service = "/api/services/7"
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
            const response = await axios.get(url + "/api/produits?isVente=0&priceProduits.service=/api/services/7");
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


    const ProductCard = ({product}) => {
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
                        source={product?.imageProduits?.[0].path ? {uri: url + product?.imageProduits?.[0].path} : ''}
                        className="w-full h-40 rounded-lg"
                        resizeMode="cover"
                    />
                    <StyledText className="mt-2 text-[16px] font-bold">{product?.libelle}</StyledText>
                    <StyledText style={{color: 'rgba(28, 163, 247, 1)'}} className="mt-1 text-lg">
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
                    onPress={() => router.push("/shopService")}>
                    <StyledText className="text-white text-center">Voir mon panier</StyledText>
                </StyledButton>
            </View>
            {loading ? (
                <ActivityIndicator className="mt-10" size="large" color="blue"/>) : (
                <View className=' mb-10'>
                    <Link push href='/DetailsService' asChild className=''>
                        <StyledView style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                            {products.map(product => (
                                <StyledView key={product.id} style={{width: '50%'}}>
                                    <ProductCard product={product}/>
                                </StyledView>
                            ))}
                        </StyledView>
                    </Link>
                </View>
            )}


        </ScrollView>
    );
}

export default function LavageNormal() {
    return (
        <Provider store={store}>
            <LavageNormalApp/>
        </Provider>
    )
};
