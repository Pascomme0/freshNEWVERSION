// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
// import { styled } from 'nativewind';
// import douche from '../../assets/images/douche.jpg';
// import salon from '../../assets/images/salon.jpg';
// import cuisine from '../../assets/images/cuisine.jpg';
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
//         name: "Salon",
//         price: 2500,
//         image: salon,
//     },
//     {
//         id: 2,
//         name: "Cuisine",
//         price: 1000,
//         image: cuisine,
//     },
//     {
//         id: 3,
//         name: "Chambre",
//         price: 3500,
//         image: chambre,
//     },
//     {
//         id: 4,
//         name: "Ecole",
//         price: 'sur devis',
//         image: école,
//     },
//     {
//         id: 5,
//         name: "Entreprise",
//         price: 'sur devis',
//         image: entreprise,
//     }
// ];
//
// const ProductCard = ({ product }) => (
//     <Link href={`/Deratisation/${product.id}`} asChild>
//     <Pressable className="flex">
//     <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
//             <StyledImage
//                 source={product.image}
//                 className="w-full h-40 rounded-lg"
//                 resizeMode="cover"
//             />
//             <StyledText className="mt-2 text-[16px] font-bold">{product.name}</StyledText>
//             <StyledText style={{ color: 'rgba(28, 163, 247, 1)' }} className="mt-1 text-lg">
//                 {product.price === 'sur devis' ? product.price : `${product.price} FCFA`}
//             </StyledText>
//         </StyledView>
//     </Pressable>
// </Link>
// );
//
// const DeratisationDetail = () => (
//     <ScrollView className='bg-white'>
//         <View className=' mb-10'>
//             <Link push href='/' asChild className=''>
//                 <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
//                     {products.map(product => (
//                         <StyledView key={product.id} style={{ width: '50%' }}>
//                             <ProductCard product={product} />
//                         </StyledView>
//                     ))}
//                 </StyledView>
//             </Link >
//         </View>
//
//
//     </ScrollView>
// );
//
// export default DeratisationDetail;


import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import douche from '../../assets/images/douche.jpg'
import salon from '../../assets/images/salon.jpg'
import cuisine from '../../assets/images/cuisine.jpg'
import chambre from '../../assets/images/chambre.jpg'
import école from '../../assets/images/école.jpg'
import entreprise from '../../assets/images/entreprise.jpg'


import { FontAwesome } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import {Provider} from "react-redux";
import {store} from "../store";
import vet from "../../assets/images/vetement.jpg";
import rideaux from "../../assets/images/repair.png";
import drap from "../../assets/images/drap.png";
import couette from "../../assets/images/couette.jpg";
import axios from "axios";

function DeratisationDetailApp () {
    const StyledView = styled(View);
    const StyledText = styled(Text);
    const StyledImage = styled(Image);
    const StyledButton = styled(TouchableOpacity);
    const url = "https://admin.freshen-up.net";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal', // Autres options : 'currency', 'percent'
            minimumFractionDigits: 0, // Nombre minimum de décimales
            maximumFractionDigits: 0, // Nombre maximum de décimales
        }).format(number);
    }

    useEffect(() =>{
        const initialize = async () => {
            setLoading(true);
            const response = await axios.get(url + "/api/produits?isVente=0&priceProduits.service=/api/services/4");
            // console.log(response.data["hydra:member"])
            setProducts(response.data["hydra:member"]);
            setLoading(false);
        }
        initialize();
    }, [])


    const ProductCard = ({ product }) => (
        <Link href={`/Deratisation/${product?.id}`} asChild>
            <Pressable className="flex">
                <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
                    <StyledImage
                        source={product?.imageProduits?.[0].path ? { uri: url + product?.imageProduits?.[0].path } : ''}
                        className="w-full h-40 rounded-lg"
                        resizeMode="cover"
                    />
                    <StyledText className="mt-2 text-[16px] font-bold">{product?.libelle}</StyledText>
                    <StyledText style={{color: 'rgba(28, 163, 247, 1)'}} className="mt-1 text-lg">
                        {formatNumber(product?.priceProduits?.[0].prixUnitaire) + ' F CFA'}
                    </StyledText>
                </StyledView>
            </Pressable>
        </Link>

    );

    return (
        <ScrollView className='bg-white'>
            <View className='mb-10 '>
                <StyledView style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                    {products.map(product => (
                        <StyledView key={product.id} style={{ width: '50%' }}>
                            <ProductCard product={product} />
                        </StyledView>
                    ))}
                    <StyledView style={{ width: '50%' }}>
                        <Link href={`/Deratisation/4`} asChild>
                            <Pressable className="flex">
                                <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
                                    <StyledImage
                                        source={école}
                                        className="w-full h-40 rounded-lg"
                                        resizeMode="cover"
                                    />
                                    <StyledText className="mt-2 text-[16px] font-bold">Ecole</StyledText>
                                    <StyledText style={{ color: 'rgba(28, 163, 247, 1)' }} className="mt-1 text-lg">
                                        Sur devis
                                    </StyledText>
                                </StyledView>
                            </Pressable>
                        </Link>
                    </StyledView>
                    <StyledView style={{ width: '50%' }}>
                        <Link href={`/Deratisation/5`} asChild>
                            <Pressable className="flex">
                                <StyledView className="p-4 bg-white  shadow-md mb-4 w-35">
                                    <StyledImage
                                        source={entreprise}
                                        className="w-full h-40 rounded-lg"
                                        resizeMode="cover"
                                    />
                                    <StyledText className="mt-2 text-[16px] font-bold">Entreprise</StyledText>
                                    <StyledText style={{ color: 'rgba(28, 163, 247, 1)' }} className="mt-1 text-lg">
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

export default function DeratisationDetail() {
    return (
        <Provider store={store}>
            <DeratisationDetailApp/>
        </Provider>
    )
};

