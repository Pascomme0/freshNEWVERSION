import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button,
    Alert
} from 'react-native';
import {styled} from 'nativewind';
import {useRouter, useLocalSearchParams, router} from 'expo-router';
import {format} from 'date-fns';
import {Provider, useSelector} from "react-redux";
import {store} from "../store";
import Back from "../../components/Back";
import axios from "axios";

const url = "https://admin.freshen-up.net";

// Composants stylés
const ProductCard = styled(TouchableOpacity, 'flex-row items-center rounded-lg shadow-md py-4 mb-4');
const ProductImage = styled(Image, 'w-20 h-20 rounded-md');
const ProductInfo = styled(View, 'flex-1 mr-2');
const ProductName = styled(Text, 'text-md font-bold');
const ProductPrice = styled(Text, 'text-[12px] text-gray-600 py-1');

// Page pour afficher les détails de la commande
function DetailComServiceApp() {
    const {cmd} = useLocalSearchParams(); // Récupère les paramètres depuis l'URL
    const [loading, setLoading] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [parsedCmd, setParsedCmd] = useState(cmd ? JSON.parse(cmd) : {});
    const token = useSelector((state) => state.user.token);

    // // Désérialisation de l'objet cmd
    // let parsedCmd = {};
    // try {
    //     parsedCmd = cmd ? JSON.parse(cmd) : {};
    // } catch (error) {
    //     console.error("Erreur lors de la désérialisation de cmd :", error);
    //     return <Text>Erreur lors du chargement de la commande.</Text>;
    // }

    useEffect(() => {
        try {
            setParsedCmd(cmd ? JSON.parse(cmd) : {});
        } catch (error) {
            console.error("Erreur lors de la désérialisation de cmd :", error);
            return <Text>Erreur lors du chargement de la commande.</Text>;
        }

    }, [])

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    const handleModifyDates = () => {
        router.push({
            pathname: '/UpdateForm',
            params: {
                cmd: cmd,
            },
        });
        // Ajouter la logique pour modifier les dates
    };


    const handleAcceptDevis = async () => {
        setLoadingAccept(true);
        try {
            let response = "";
            response = await axios.get(`${url}${parsedCmd?.['@id']}/confirm_devis`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert("Succès", "Devis Accepté")
            router.push('/(tabs2)')
        } catch (AxiosError) {
            console.log(AxiosError)
            Alert.alert('Erreur', 'Erreur lors de la commande');
        } finally {
            setLoadingAccept(false);
        }
    };

    const handleCancel = async () => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir annulée cette commande ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Confirmer",
                    onPress: async () => {
                        setLoadingCancel(true);
                        try {
                            let response = "";
                            response = await axios.get(`${url}${parsedCmd['@id']}/cancel`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            Alert.alert("Succès", "Commande annulée");
                            router.push('/(tabs2)');
                        } catch (AxiosError) {
                            console.log(AxiosError);
                            Alert.alert('Erreur', "Erreur lors de l'annulation");
                        } finally {
                            setLoadingAccept(false);
                        }
                    },
                },
            ]
        );
    };

    return loading ? (
        <SafeAreaView>
            <Back title="Détail de la commande"/>
            <ActivityIndicator size="large" color="blue"/>
        </SafeAreaView>
    ) : (
        <SafeAreaView style={{ flex: 1 }}>
            <Back title="Détail de la commande"/>
            <ScrollView className="p-4 bg-gray-100">
                {/* Détails de la commande */}
                <View className="flex flex-col justify-between mb-4">
                    <Text className="text-lg font-bold text-center mb-2">Commande N° {parsedCmd?.reference}</Text>
                    <Text className="text-md font-bold mb-2">Passée
                        le {format(new Date(parsedCmd?.date || new Date()), "dd/MM/yyyy")}</Text>
                    {parsedCmd?.dateRamassage && (<Text className="text-md font-bold mb-2">Date de
                        ramassage: {format(new Date(parsedCmd?.dateRamassage || new Date()), "dd/MM/yyyy")}</Text>)}
                    {parsedCmd?.dateService && (<Text className="text-md font-bold mb-2">Date de
                        service: {format(new Date(parsedCmd?.dateService || new Date()), "dd/MM/yyyy")}</Text>)}
                    {parsedCmd?.dateRetour && (<Text className="text-md font-bold mb-2">Date de
                        retour: {format(new Date(parsedCmd?.dateRetour || new Date()), "dd/MM/yyyy")}</Text>)}
                    {parsedCmd?.dateFinService && (<Text className="text-md font-bold mb-2">Date de fin
                        Service: {format(new Date(parsedCmd?.dateFinService || new Date()), "dd/MM/yyyy")}</Text>)}
                    {parsedCmd?.nbPieces && (<Text className="text-md font-bold mb-2">Nombre de pieces du
                        local: {parsedCmd.nbPieces}</Text>)}
                    {parsedCmd?.nbEnfants && (
                        <Text className="text-md font-bold mb-2">Nombre d'enfants: {parsedCmd.nbEnfants}</Text>)}
                    {parsedCmd?.ageEnfants && (
                        <Text className="text-md font-bold mb-2">Ages des enfants: {parsedCmd.ageEnfants}</Text>)}
                    {parsedCmd?.serviceEntreprise && (<Text className="text-md font-bold mb-2">Service
                        demandé: {parsedCmd.serviceEntreprise.label}</Text>)}
                    {(parsedCmd?.service['@id'] === "/api/services/10") && (
                        <Text className="text-md font-bold mb-2">La nounou dort elle chez vous?
                            : {(parsedCmd.atHome === 1) ? "Oui" : "Non"}</Text>)}
                    {parsedCmd?.joursDeService && (<Text className="text-md font-bold mb-2">Fréquence de travail
                        : {parsedCmd.joursDeService}</Text>)}
                    {(parsedCmd?.allDay != null) && (<Text className="text-md font-bold mb-2">Heure fixe?
                        : {(parsedCmd?.allDay) ? "Oui" : "Non"}</Text>)}
                    {parsedCmd?.heureDebutService && (<Text className="text-md font-bold mb-2">Date de debut de la
                        journée: {format(new Date(parsedCmd?.heureDebutService || new Date()), "HH:mm")}</Text>)}
                    {parsedCmd?.heureFinService && (<Text className="text-md font-bold mb-2">Date de fin de la
                        journée: {format(new Date(parsedCmd?.heureFinService || new Date()), "HH:mm")}</Text>)}
                    {parsedCmd?.adresse && (<Text
                        className="text-md font-bold mb-2">Adresse: {parsedCmd.adresse.commune.label} - {parsedCmd.adresse.description}</Text>)}
                    {parsedCmd?.description && (
                        <Text className="text-md font-bold mb-2">Description: {parsedCmd.description}</Text>)}
                </View>

                {/* Produits de la commande */}
                {parsedCmd?.detailDocuments?.map((dd) => (
                    <ProductCard key={dd.id}>
                        <ProductImage source={{uri: url + dd.produit.imageProduits[0]?.path}}/>
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

                {/* Détail du devis */}
                {(parsedCmd.status === 'DEVIS_SENT') && parsedCmd?.devis?.[0]?.detailDocuments?.map((dd) => (
                    <ProductCard key={dd.id}>
                        <View className="flex-column ml-4">
                            <ProductInfo>
                                <ProductName>{dd.designation}</ProductName>
                                <ProductPrice>Quantité: {dd.quantity}</ProductPrice>
                                <ProductPrice>Prix Unitaire: {formatNumber(dd.prixUnitaire)} F CFA</ProductPrice>
                                <ProductPrice>Sous total: {formatNumber(dd.montantTotal)} F CFA</ProductPrice>
                            </ProductInfo>
                        </View>
                    </ProductCard>
                ))}

                {/* Résumé de la commande */}
                {parsedCmd.montantTotal && (
                    <View className='bg-gray-200 py-6 rounded-lg mb-5 mx-2 justify-center mt-16 w-90'>
                        <View
                            className="py-3 px-8 flex flex-row justify-between items-center border-b border-gray-300 pb-4">
                            <Text className='mr-4'>Total Brut</Text>
                            <Text className='ml-4'>{formatNumber(parsedCmd.montantBrut)} F CFA</Text>
                        </View>
                        <View
                            className="border-b border-gray-300 pb-4 py-3 px-8 flex flex-row justify-between items-center">
                            <Text className='text-[13px] mr-4'>Remise</Text>
                            <Text className='text-[13px] ml-4'>{formatNumber(parsedCmd.montantRemise)} F CFA</Text>
                        </View>
                        <View className="py-3 px-8 flex flex-row justify-between items-center">
                            <Text className='mr-4'>Total</Text>
                            <Text className='ml-4'>{formatNumber(parsedCmd.montantTotal)} F CFA</Text>
                        </View>
                    </View>
                )}

                {/* Résumé du devis */}
                {(parsedCmd.status === 'DEVIS_SENT') && (
                    <View className='bg-gray-200 py-6 rounded-lg mb-5 mx-2 justify-center mt-16 w-90'>
                        <View className="py-3 px-8 flex flex-row justify-between items-center">
                            <Text className='mr-4'>Total</Text>
                            <Text className='ml-4'>{formatNumber(parsedCmd.devis?.[0].montantTotal ?? 0)} F CFA</Text>
                        </View>
                    </View>
                )}

                {/* Boutons */}
                <View className="flex flex-row justify-around mb-8">
                    {(parsedCmd.status === "NO_AGENT" || parsedCmd.status === "VALIDATED") ? (
                        <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-md" onPress={handleModifyDates}>
                            <Text className="text-white font-bold">Modifier les dates</Text>
                        </TouchableOpacity>
                    ) : ''}
                    {(parsedCmd.status === "DEVIS_SENT") && (
                        <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-md" onPress={handleAcceptDevis}>
                            <Text className="text-white font-bold">Accepter le devis</Text>
                        </TouchableOpacity>
                    )}
                    {(parsedCmd.status === "VALIDATED" || parsedCmd.status === "NO_AGENT" || parsedCmd.status === "PENDING_DEVIS" || parsedCmd.status === "DEVIS_SENT") && (
                        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-md" onPress={handleCancel}>
                            <Text className="text-white font-bold">Annuler</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Composant exporté avec Redux
export default function DetailComService() {
    return (
        <Provider store={store}>
            <DetailComServiceApp/>
        </Provider>
    );
}
