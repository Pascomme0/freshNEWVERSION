import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import {router, useRouter} from 'expo-router';
import axios from 'axios';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../app/store";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {setActiveCommand, setActivePayLink} from "../app/panierServiceSlice"; // Exemple : ajustez selon la structure de votre projet


const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'decimal', // Autres options : 'currency', 'percent'
        minimumFractionDigits: 0, // Nombre minimum de décimales
        maximumFractionDigits: 0, // Nombre maximum de décimales
    }).format(number);
}

const formatDateTime = (datetime) => {
    return datetime
        ? `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : 'Choisir une date et une heure';
};

const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = dimanche, 6 = samedi
};

function TotalEventComponentApp () {
    const url = "https://admin.freshen-up.net";
    const [numberOfPlaces, setNumberOfPlaces] = useState('100');
    // const [numberOfGuests, setNumberOfGuests] = useState('150');
    const [datetime, setDatetime] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [serviceTypes, setServiceTypes] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [product, setProduct] = useState({})
    const [currentField, setCurrentField] = useState('');
    const [price, setPrice] = useState(0);
    const [loadingConf, setLoadingConf] = useState(false);
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    const [paiement, setPaiement] = useState('/api/moyen_paiements/1');
    const token = useSelector((state) => state.user.token);
    const dispatch= useDispatch();

    const showDatePicker = (field) => {
        setCurrentField(field);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (datetime) => {
        if (currentField === 'datetime') {
            setDatetime(datetime);
        }
        hideDatePicker();
    };

    const priceUnite = (product, service) => {
        let prix = 0;
        let unite = 1;
        if (product === undefined) {
            prix = 0;
            unite = 1;
        } else {
            let tab = product?.priceProduits ?? [];
            for (const price of tab) {
                let id = price?.service?.['@id'] ?? 'nope'
                if (id === service) {
                    prix = price?.prixUnitaire ?? 0;
                    unite = price?.unite ?? 1;
                    break;
                }
            }
        }
        return {prix, unite};
    }

    // Charger les types de service depuis l'API
    useEffect(() => {
        const fetchServiceTypes = async () => {
            try {
                const response = await axios.get(url + '/api/services?code[]=VAISELLE_AFTER_EVENT&code[]=RANGEMENT_AFTER_EVENT&code[]=VAISSELLE_RANGEMENT_AFTER_EVENT'); // Remplacez par l'URL réelle
                setServiceTypes(response.data['hydra:member']);
                const responseProduct = await axios.get(url + '/api/produits?isVente=0&priceProduits.service=/api/services/12')
                setProduct(responseProduct.data['hydra:member'][0]);
            } catch (error) {
                console.error('Erreur lors de la récupération des types de service', error);
            }
        };

        fetchServiceTypes();
    }, []);

    useEffect(() => {
        let prix = priceUnite(product, selectedServiceType).prix;
        let unite = priceUnite(product, selectedServiceType).unite;
        let qteSelled = ((numberOfPlaces / unite) > 1) ? (numberOfPlaces / unite) : 1;
        setPrice(Math.ceil(prix * qteSelled));
    }, [numberOfPlaces, selectedServiceType])

    // Fonction de validation
    const validate = () => {
        if (!numberOfPlaces || !datetime || !selectedAddress || !selectedServiceType) {
            return false;
        }
        return true;
    };

    // Gestion du clic sur "Valider"
    const handleSubmit = async () => {
        if (validate()) {
            setLoadingConf(true);
            const dateService = datetime;
            let det = [];
            det.push({
                produit: product['@id'],
                quantity: +numberOfPlaces,
            })
            try {
                let response = "";
                response = await axios.post(`${url}/api/documents`, {
                    typeDocument: "/api/type_documents/3",
                    date: (new Date()).toISOString(),
                    adresse: selectedAddress,
                    dateService: dateService ? dateService.toISOString() : null,
                    service: selectedServiceType,
                    detailDocuments: det,
                    paiement: {
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
                if (responseConfirmation.data.code === 400) {
                    Alert.alert("Erreur", responseConfirmation.data.message)
                } else {
                    if (responseConfirmation.data.payLink) {
                        dispatch(setActivePayLink(responseConfirmation.data.payLink))
                        router.push('/Paiement-status-service');
                    } else {
                        Alert.alert('Succès', 'Commande confirmée avec succès.');

                        router.push('/(tabs2)');
                    }
                }

            } catch (AxiosError) {
                console.log(AxiosError)
                Alert.alert('Erreur', 'Erreur lors de la commande');
            } finally {
                setLoadingConf(false);
            }
        } else {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs avant de valider.');
        }
    };

    return (
        <View className="h-full p-4 bg-white">
            <View className="mb-4">
                <Text className="text-lg font-semibold">Nombre de places salle</Text>
                <TextInput
                    className="border p-2 mt-2 rounded"
                    value={numberOfPlaces}
                    onChangeText={setNumberOfPlaces}
                    keyboardType="numeric"
                />
            </View>
            <View className="mb-4">
                <Text className="text-lg font-semibold">Date et Heure</Text>
                <TouchableOpacity
                    className={`h-12 border border-gray-300 p-2 rounded shadow-sm`}
                    onPress={() => showDatePicker('datetime')}
                >
                    <Text>{formatDateTime(datetime)}</Text>
                </TouchableOpacity>
            </View>
            <View className="mb-4">
                <Text className="text-lg font-semibold">Adresse</Text>
                <View style={[styles.pickerContainer, styles.border]}>
                    <Picker
                        selectedValue={selectedAddress}
                        onValueChange={(itemValue) => setSelectedAddress(itemValue)}
                    >
                        <Picker.Item label="Sélectionnez une adresse" value="" />
                        {user.adresses.map((address, index) => (
                            <Picker.Item key={index} label={address.commune.label} value={address['@id']} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View className="mb-4">
                <Text className="text-lg font-semibold">Type de Service</Text>
                <View style={[styles.pickerContainer, styles.border]}>
                    <Picker
                        selectedValue={selectedServiceType}
                        onValueChange={(itemValue) => setSelectedServiceType(itemValue)}
                    >
                        <Picker.Item label="Sélectionnez un service" value="" />
                        {serviceTypes.map((service, index) => (
                            <Picker.Item key={index} label={service.label} value={service['@id']} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View className="mb-4 h-28 p-4 bg-blue-100 rounded">
                <Text className="text-xl font-bold text-center text-blue-600">Prix</Text>
                <Text className="text-2xl font-bold text-center text-blue-600">{formatNumber(price)} F CFA</Text>
            </View>
            <View className="mt-4">
                {loadingConf ? <ActivityIndicator size="small" color="#000" /> : (
                    <Button className="" title="Valider" onPress={handleSubmit} />
                )}
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime" // Mode datetime activé
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        marginTop: 8,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    border: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 2,
    },
});

export default function TotalEventComponent() {
    return (
        <Provider store={store}>
            <TotalEventComponentApp/>
        </Provider>
    );
};
