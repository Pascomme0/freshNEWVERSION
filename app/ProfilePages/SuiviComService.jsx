// App.js
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import { styled } from 'nativewind';
import Back from '../../components/Back';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../../assets/images/user.png'
import {router, useRouter} from 'expo-router';
import {Provider, useSelector} from "react-redux";
import {store} from "../store";
import axios from "axios";

function SuiviComServiceApp() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('En cours');
    const [ordersInProgress, setOrdersInProgress] = useState([
        { id: 1, service: 'Nounou', price: '5000 F', status: 'Pas d\'attribution', img: 'image', lien:'' },
        { id: 2, service: 'Nounou', price: '5000 F', status: 'Attribué', img: 'image' , lien:'/ProfilePages/Attribution'},
    ])

    const [completedOrders, setCompletedOrders] = useState([
        { id: 1, service: 'Nounou', price: '5000 F', img: 'image', lien:'/ProfilePages/NoterService' },
        { id: 2, service: 'Nounou', price: '5000 F', img: 'image' , lien:'/ProfilePages/NoterService'},
    ])

    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.user.token);
    const url = "https://admin.freshen-up.net";

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal', // Autres options : 'currency', 'percent'
            minimumFractionDigits: 0, // Nombre minimum de décimales
            maximumFractionDigits: 0, // Nombre maximum de décimales
        }).format(number);
    }

    const handleDetailCme = (cmd) => {
        router.push({
            pathname: '/ProfilePages/DetailComService',
            params: {
                cmd: JSON.stringify(cmd),
            },
        });
    }

    const handleNote = (cmd) => {
        router.push({
            pathname: '/ProfilePages/NoterService',
            params: {
                cmd: JSON.stringify(cmd),
            },
        });
        // Ajouter la logique pour modifier les dates
    };

    const matchStatus = (statut) => {
        switch (statut) {
            case 'VALIDATED':
                return "Pas d'attribution";
            case 'CONFIRMED':
                return "Attribué"
            case 'TAKEN':
                return "Ramasée"
            case 'PENDING_DEVIS':
                return 'En attente de devis'
            case 'DEVIS_SENT':
                return 'Devis établie'
            case 'CANCELED':
                return 'Annulée'
            case 'NO_AGENT':
                return 'Agent indisponible'
        }
    }
    const matchStatusColor = (statut) => {
        switch (statut) {
            case 'VALIDATED':
                return "bg-yellow-500";
            case 'CONFIRMED':
                return "bg-blue-500";
            case 'TAKEN':
                return "bg-green-500";
            case 'PENDING_DEVIS':
            case 'DEVIS_SENT':
                return 'bg-yellow-500'
            case 'CANCELED':
            case 'NO_AGENT':
                return "bg-red-500"
        }
    }

    const images = {
        LESSIVE: require('../../assets/images/Lessive.png'),
        MENAGE: require('../../assets/images/Menage.png'),
        DESINSECTISATION: require('../../assets/images/Desinsectisation.png'),
        DERATISATION: require('../../assets/images/Deratisation.png'),
        DESINFECTION: require('../../assets/images/Desinfection.png'),
        LAVAGE: require('../../assets/images/Lavage.png'),
        LAVAGE_AUTO_NORMAL: require('../../assets/images/Lavageauto.png'),
        LAVAGE_AUTO_LUXE: require('../../assets/images/Lavageauto.png'),
        LAVAGE_AUTO_LUXE_PRO: require('../../assets/images/Lavageauto.png'),
        NOUNOU: require('../../assets/images/nounou.png'),
        CUISINIERE: require('../../assets/images/Cuisinière.png'),
        VAISELLE_AFTER_EVENT: require('../../assets/images/Vaisselle.png'),
        RANGEMENT_AFTER_EVENT: require('../../assets/images/Vaisselle.png'),
        VAISSELLE_RANGEMENT_AFTER_EVENT: require('../../assets/images/Vaisselle.png'),
        SERVICE_ENTREPRISE_ECOLE: require('../../assets/images/Menage.png'),
        DEFAULT: require('../../assets/images/Menage.png'),
    };

    const serviceMatch = (service) => {
        return images[service] || images.DEFAULT;
    }


    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            const response = await axios.get(`${url}/api/documents?typeDocument=/api/type_documents/3&status[]=VALIDATED&status[]=CONFIRMED&status[]=TAKEN&status[]=PENDING_DEVIS&status[]=DEVIS_SENT&status[]=CANCELED&&status[]=NO_AGENT`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrdersInProgress(response.data['hydra:member']);
            const response2 = await axios.get(`${url}/api/documents?typeDocument=/api/type_documents/3&status[]=CLOSED`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompletedOrders(response2.data['hydra:member']);
            setLoading(false);
        }
        initialize()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Back />
            <View className="flex-row justify-around mt-4">
                <TouchableOpacity
                    className={`px-4 py-2  rounded-lg  ${activeTab === 'En cours' ? 'bg-blue-500' : 'bg-gray-200 '}`}
                    onPress={() => setActiveTab('En cours')}
                >
                    <Text className={`text-white ${activeTab !== 'En cours' && 'text-black'}`}>En cours</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`px-4 py-2 rounded-lg ${activeTab === 'Terminés' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onPress={() => setActiveTab('Terminés')}
                >
                    <Text className={`text-white ${activeTab !== 'Terminés' && 'text-black'}`}>Terminés</Text>
                </TouchableOpacity>
            </View>
            {loading ? (<ActivityIndicator className="mt-5" size="large" color="blue" />) : (
                <ScrollView className="mt-4">
                    {activeTab === 'En cours' ? (
                        ordersInProgress.map(order => (
                                <TouchableOpacity key={order.id}  onPress={() => handleDetailCme(order)}
                                >
                                    <View key={order.id} className="flex-row items-center mx-3 px-3 py-4 mb-3 bg-[#F5F5F5]">
                                        {/*<Image source={require(serviceMatch(order.service.code))} className="w-16 h-16 rounded-lg" />*/}
                                        <Image source={serviceMatch(order.service.code)} className="w-16 h-16 rounded-lg" />
                                        <View className="ml-4 w-32">
                                            <Text className="text-black font-bold">{order.service.label}</Text>
                                            <Text className="text-black">{order?.montantTotal ? formatNumber(order.montantTotal) + 'F CFA' : ''}</Text>
                                        </View>
                                        <View className="ml-auto">
                                            <Text className={`text-white px-4 py-2 rounded-lg ${matchStatusColor(order.status)}`}>
                                                {matchStatus(order.status)}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        )
                    ) : (
                        completedOrders.map(order => (
                                <TouchableOpacity key={order.id} onPress={() => handleNote(order)}
                                >

                                    <View key={order.id} className="flex-row items-center mx-3 px-3 py-4 mb-3 bg-[#F5F5F5]">
                                        <Image source={serviceMatch(order.service.code)} className="w-16 h-16 rounded-lg" />
                                        <View className="ml-4">
                                            <Text className="text-black font-bold">{order.service.label}</Text>
                                            <Text className="text-black">{order?.montantTotal ? formatNumber(order.montantTotal) + 'F CFA' : ''}</Text>
                                        </View>
                                        <View className="ml-auto px-4 py-2 bg-blue-500 rounded-lg">
                                            <Text className="text-white">Noter le service</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        )
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

export default function SuiviComService() {
    return (
        <Provider store={store}>
            <SuiviComServiceApp/>
        </Provider>
    )
};
