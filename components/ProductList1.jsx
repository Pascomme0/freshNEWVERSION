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
    ActivityIndicator, Alert
} from 'react-native';
import {styled} from 'nativewind';
import img from '../assets/images/lave.png'
import couette from '../assets/images/couette.jpg'
import rideaux from '../assets/images/repair.png'
import vet from '../assets/images/vetement.jpg'
import drap from '../assets/images/drap.png'
import {FontAwesome} from '@expo/vector-icons';
import {Link, router, useNavigation} from 'expo-router';
import axios from "axios";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setAdresse, setDetailPanier, setService, pushDetailPanier, removeDetailPanier} from "../app/panierServiceSlice";

function ProductList1App() {
    const StyledView = styled(View);
    const StyledText = styled(Text);
    const StyledImage = styled(Image);
    const StyledButton = styled(TouchableOpacity);
    const url = "https://admin.freshen-up.net";
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
    const dispatch = useDispatch();
    const service = "/api/services/1"
    const detailPanier = useSelector((state) => state.panierService.detailPanier)

    const [loading, setLoading] = useState(false);
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
            try {
                const response = await axios.get(url + "/api/produits?isVente=0&priceProduits.service=/api/services/1");
                // console.log(response.data["hydra:member"])
                setProducts(response.data["hydra:member"]);
            } catch (e) {
                Alert.alert("Erreur", "une erreur s'est produite")
            } finally {
                setLoading(false);
            }
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
        <ScrollView className='pt-8'>
            <View className=' '>
                <Text className="font-bold text-[16px] pl-2 pt-3 pb-1">Les services les plus populaires</Text>
            </View>
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
                <View>
                    <StyledView style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                        {products.map(product => (
                            <StyledView key={product.id} style={{width: '50%'}}>
                                <ProductCard product={product}/>
                            </StyledView>
                        ))}
                    </StyledView>

                    {/*<Link push href='../ListServices/Lessive' asChild className=''>*/}
                    {/*    */}
                    {/*</Link>*/}
                    <Pressable className=" px-2 flex">
                        <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
                            <Text className="text-blue-600 text-[14px] font-semibold pr-2 ">Voir tout</Text>
                            <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10} light
                                         className='items-center flex'/>
                        </View>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    )
}

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledImage = styled(Image);
// const StyledButton = styled(TouchableOpacity);
//
// const products = [
//     {
//         id: 1,
//         name: "Lavage de vetements",
//         price: 5000,
//         image: vet,
//         unit: '10 vetements'
//     },
//     {
//         id: 2,
//         name: "Lavage rideaux",
//         price: 2500,
//         image: rideaux,
//         unit: 'à l unité'
//     },
//     {
//         id: 3,
//         name: "Lavage de drap",
//         price: 1000,
//         image: drap,
//         unit: 'à l unité'
//     },
//     {
//         id: 4,
//         name: "Lavage de couette",
//         price: 3500,
//         image: couette,
//         unit: 'à l unité'
//     }
// ];
//
// const ProductCard = ({ product }) => (
//     <Link push href='../ListServices/Lessive' asChild className=''>
//         <Pressable className="  flex">
//
//             <StyledView className="p-4 bg-white rounded-lg shadow-md mb-4 w-35">
//                 <StyledImage
//                     source={product.image}
//                     className="w-full h-40 rounded-lg"
//                     resizeMode="cover"
//                 />
//                 <StyledText className="mt-2 text-[16px] font-bold">{product.name}</StyledText>
//                 <StyledText style={({ color: 'rgba(0, 0, 0, 0.3)' })} className="mt-1  text-md font-bold">{product.unit}</StyledText>
//                 <StyledText style={(
//                     { color: 'rgba(28, 163, 247, 1)' }
//                 )} className="mt-1 text-lg">{product.price} FCFA</StyledText>
//             </StyledView>
//         </Pressable>
//     </Link>
//
// );
// const ProductList1 = () => (
//
//     <ScrollView className='pt-8'>
//         <View className=' '>
//             <Text className="font-bold text-[16px] pl-2 pt-3 pb-1">Les services les plus populaires</Text>
//         </View>
//
//         <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
//             {products.map(product => (
//                 <StyledView key={product.id} style={{ width: '50%' }}>
//                     <ProductCard product={product} />
//                 </StyledView>
//             ))}
//         </StyledView>
//
//         <Link push href='../ListServices/Lessive' asChild className=''>
//             <Pressable className=" px-2 flex">
//                 <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
//                     <Text className="text-blue-600 text-[14px] font-semibold pr-2 ">Voir tout</Text>
//                     <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10} light className='items-center flex' />
//                 </View>
//             </Pressable>
//         </Link>
//     </ScrollView>
// );

export default function ProductList1() {
    return (
        <Provider store={store}>
            <ProductList1App/>
        </Provider>
    )
};
