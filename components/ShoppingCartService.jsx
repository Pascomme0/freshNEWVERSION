import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable, Alert} from 'react-native';
import {styled} from 'nativewind';
import prod from '../assets/images/prod.png';
import {ScrollView} from 'react-native';
import {Link} from 'expo-router';
import {FontAwesome} from '@expo/vector-icons';
import {Provider, useDispatch, useSelector} from "react-redux";
import {setDetailPanier, removeDetailPanier, updatedQuantity} from "../app/panierServiceSlice";
import {store} from "../app/store";
import img from "../assets/images/prod.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = styled(View, 'flex flex-row items-center justify-between bg-gray-200 p-4 mb-2 rounded-md w-[90%]');
const ItemInfo = styled(View, 'flex-1 flex flex-row items-center pr-2');
const ItemImage = styled(Image, 'w-14 h-14 mr-4 rounded-md');
const ItemDetails = styled(View, 'flex-1');
const ItemName = styled(Text, 'text-md font-semibold');
const ItemPrice = styled(Text, 'text-gray-500 text-[12px] py-1');
const QuantityContainer = styled(View, 'flex flex-row items-center');
const QuantityButton = styled(Pressable, 'p-1 w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center');
const QuantityText = styled(Text, 'mx-2 text-md font-semibold');
const RemoveButton = styled(Pressable, 'ml-4 p-2');

const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'decimal', // Autres options : 'currency', 'percent'
        minimumFractionDigits: 0, // Nombre minimum de décimales
        maximumFractionDigits: 0, // Nombre maximum de décimales
    }).format(number);
}

function ShoppingCartServiceApp() {
    const dispatch = useDispatch();
    const url = "https://admin.freshen-up.net";
    const items = useSelector((state) => state.panierService.detailPanier);
    const totalHt = useSelector((state) => state.panierService.totalHt);
    const adresse = useSelector((state) => state.panierService.adresse);
    const paiement = useSelector((state) => state.panierService.paiement);
    const totalRemise = useSelector((state) => state.panierService.totalRemise);
    const service = useSelector((state) => state.panierService.service);

    const handleQuantityChange = (index, isIncrement) => {
        let newQte = +items[index].quantity;
        if (isIncrement) {
            if (items[index].produit.quantity === +items[index].quantity) {
                Alert.alert("Erreur", "Stock insuffisant");
            } else {
                newQte += 1;
            }
        } else {
            newQte -= 1;
        }
        const id = items[index].produit.id;
        dispatch(updatedQuantity({id, quantity: newQte}));
        // console.log(items);
    };

    const handleRemoveItem = (index) => {
        dispatch(removeDetailPanier(items[index].produit.id));
    };

    const price = (product, service) => {
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
        return prix;
    }

    useEffect(() => {
        const savePanier = async () => {
            const panier = await AsyncStorage.getItem('panierService');
            let newObject = {
                service: service,
                detailPanier: items,
                totalHt,
                paiement,
                totalRemise,
                adresse
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
        savePanier();
    }, [items, totalHt, totalRemise]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="py-4 justify-center items-center">
                {items.length === 0 && <Text className="text-center mt-5 mb-5">Votre panier est vide</Text>}
                {items.map((item, index) => (
                    <Item key={index}>
                        <ItemInfo>
                            <ItemImage source={item.produit?.imageProduits?.[0].path ? { uri: url + item.produit?.imageProduits[0].path } : img}/>
                            <ItemDetails>
                                <ItemName>{item.produit.libelle}</ItemName>
                                <ItemPrice>{formatNumber(price(item.produit, service))} F CFA</ItemPrice>
                            </ItemDetails>
                        </ItemInfo>
                        <QuantityContainer>
                            <QuantityButton
                                disabled={item.quantity === 1}
                                onPress={() => handleQuantityChange(index, false)}
                            >
                                <Text className="text-sm font-bold">-</Text>
                            </QuantityButton>
                            <QuantityText>{item.quantity}</QuantityText>
                            <QuantityButton onPress={() => handleQuantityChange(index, true)}>
                                <Text className="text-sm">+</Text>
                            </QuantityButton>
                        </QuantityContainer>
                        <RemoveButton onPress={() => handleRemoveItem(index)}>
                            <FontAwesome name="trash" size={20} color="red"/>
                        </RemoveButton>
                    </Item>
                ))}
                <View className='bg-gray-200 py-6 mb-6 rounded-lg mx-1 justify-center mx-2 mt-16 w-90'>
                    <View className="py-3 w-[]  px-8  flex flex-row justify-between items-center border-b border-gray-300 pb-4">
                        <Text className='mr-4'>Sous-total</Text>
                        <Text className='ml-4'>{formatNumber(totalHt)} Fcfa</Text>
                    </View>
                    <View className="border-b border-gray-300 pb-4 py-3 px-8 flex flex-row justify-between items-center">
                        <Text style={(
                            { color: 'rgba(0, 0, 0, 0.5)' }
                        )} className='text-[13px] mr-4'>Remise</Text>
                        <Text style={(
                            { color: 'rgba(0, 0, 0, 0.5)' }
                        )} className='text-[13px] ml-4'>{formatNumber(totalRemise)} Fcfa</Text>
                    </View>
                    <View className="py-3 px-8 flex flex-row justify-between items-center">
                        <Text className='mr-4'>Total</Text>
                        <Text className='ml-4'>{formatNumber(totalHt - totalRemise)} Fcfa</Text>
                    </View>
                </View>
                {items.length > 0 && <Link push href="/FormCom" asChild>
                    <Pressable style={{backgroundColor: 'rgba(43, 187, 104, 1)', borderRadius: 8}}
                               className="w-[284px] p-2 my-6 justify-center">
                        <Text className="text-white text-lg text-center font-bold">Valider mon panier</Text>
                    </Pressable>
                </Link>}
            </View>
        </ScrollView>
    );
};

export default function ShoppingCartService() {
    return (
        <Provider store={store}>
            <ShoppingCartServiceApp/>
        </Provider>
    )
};
