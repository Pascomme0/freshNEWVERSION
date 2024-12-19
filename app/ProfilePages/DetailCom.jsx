import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';
import { Provider, useSelector } from "react-redux";
import { store } from "../store";
import Back from "../../components/Back";

const url = "https://admin.freshen-up.net";

// Composants stylés
const ProductCard = styled(TouchableOpacity, 'flex-row items-center rounded-lg shadow-md py-4 mb-4');
const ProductImage = styled(Image, 'w-20 h-20 rounded-md');
const ProductInfo = styled(View, 'flex-1 mr-2');
const ProductName = styled(Text, 'text-md font-bold');
const ProductPrice = styled(Text, 'text-[12px] text-gray-600 py-1');

// Page pour afficher les détails de la commande
function DetailComApp() {
    const { cmd } = useLocalSearchParams(); // Récupère les paramètres depuis l'URL
    const [loading, setLoading] = useState(false);

    // Désérialisation de l'objet cmd
    let parsedCmd = {};
    try {
        parsedCmd = cmd ? JSON.parse(cmd) : {};
    } catch (error) {
        console.error("Erreur lors de la désérialisation de cmd :", error);
        return <Text>Erreur lors du chargement de la commande.</Text>;
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    return loading ? (
        <SafeAreaView>
            <Back title="Détail de la commande" />
            <ActivityIndicator size="large" color="blue" />
        </SafeAreaView>
    ) : (
        <SafeAreaView>
            <Back title="Détail de la commande" />
            <ScrollView className="p-4 bg-gray-100">
                {/* Détails de la commande */}
                <View className="flex flex-col justify-between items-center mb-4">
                    <Text className="text-lg font-bold">Commande N° {parsedCmd?.reference}</Text>
                    <Text className="text-md font-bold">Passée le {format(new Date(parsedCmd?.date || new Date()), "dd/MM/yyyy")}</Text>
                    <Text className="text-md bg-green-300 font-bold">
                        Statut: {(parsedCmd?.status === 'VALIDATED'
                        ? "Confirmée"
                        : parsedCmd?.status === 'ON_DELIVERING'
                            ? "En cours de livraison"
                            : parsedCmd?.status === "DELIVERED"
                                ? "Livrée"
                                : "Annulée")}
                    </Text>
                </View>

                {/* Produits de la commande */}
                {parsedCmd?.detailDocuments?.map((dd) => (
                    <ProductCard key={dd.id}>
                        <ProductImage source={{ uri: url + dd.produit.imageProduits[0]?.path }} />
                        <View className="flex-column ml-4">
                            <ProductInfo>
                                <ProductName>{dd.produit.libelle}</ProductName>
                                <ProductPrice>Quantité: {dd.quantity}</ProductPrice>
                                <ProductPrice>Prix Unitaire: {formatNumber(dd.prixUnitaire)} F CFA</ProductPrice>
                                <ProductPrice>Sous total: {formatNumber(dd.montantTotal)} F CFA</ProductPrice>
                            </ProductInfo>
                        </View>
                    </ProductCard>
                ))}

                {/* Résumé de la commande */}
                <View className='bg-gray-200 py-6 rounded-lg mb-5 mx-2 justify-center mt-16 w-90'>
                    <View className="py-3 px-8 flex flex-row justify-between items-center border-b border-gray-300 pb-4">
                        <Text className='mr-4'>Total Brut</Text>
                        <Text className='ml-4'>{formatNumber(parsedCmd.montantBrut)} F CFA</Text>
                    </View>
                    <View className="border-b border-gray-300 pb-4 py-3 px-8 flex flex-row justify-between items-center">
                        <Text className='text-[13px] mr-4'>Livraison</Text>
                        <Text className='text-[13px] ml-4'>{formatNumber(parsedCmd.montantLivraison)} F CFA</Text>
                    </View>
                    <View className="py-3 px-8 flex flex-row justify-between items-center">
                        <Text className='mr-4'>Total</Text>
                        <Text className='ml-4'>{formatNumber(parsedCmd.montantTotal)} F CFA</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Composant exporté avec Redux
export default function DetailCom() {
    return (
        <Provider store={store}>
            <DetailComApp />
        </Provider>
    );
}
