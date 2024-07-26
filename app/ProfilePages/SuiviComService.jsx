// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styled } from 'nativewind';
import Back from '../../components/Back';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../../assets/images/user.png'
import { useRouter } from 'expo-router';

const SuiviComService = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('En cours');

    const ordersInProgress = [
        { id: 1, service: 'Nounou', price: '5000 F', status: 'Pas d\'attribution', img: 'image', lien:'' },
        { id: 2, service: 'Nounou', price: '5000 F', status: 'Attribué', img: 'image' , lien:'/ProfilePages/Attribution'},
    ];

    const completedOrders = [
        { id: 1, service: 'Nounou', price: '5000 F', img: 'image', lien:'/ProfilePages/NoterService' },
        { id: 2, service: 'Nounou', price: '5000 F', img: 'image' , lien:'/ProfilePages/NoterService'},
    ];

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
            <ScrollView className="mt-4">
                {activeTab === 'En cours' ? (
                    ordersInProgress.map(order => (
                        <TouchableOpacity key={order.id}  onPress={() => order.status !== 'Pas d\'attribution' && router.push(order.lien)} 
                        disabled={order.status === 'Pas d\'attribution'}>
                            <View key={order.id} className="flex-row items-center mx-3 px-3 py-4 mb-3 bg-[#F5F5F5]">
                                <Image source={image} className="w-16 h-16 rounded-lg" />
                                <View className="ml-4">
                                    <Text className="text-black font-bold">{order.service}</Text>
                                    <Text className="text-black">{order.price}</Text>
                                </View>
                                <View className="ml-auto">
                                    <Text className={`text-white px-4 py-2 rounded-lg ${order.status === 'Attribué' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                                        {order.status}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    completedOrders.map(order => (
                        <TouchableOpacity key={order.id} onPress={() => router.push(order.lien)}>

                        <View key={order.id} className="flex-row items-center mx-3 px-3 py-4 mb-3 bg-[#F5F5F5]">
                            <Image source={image} className="w-16 h-16 rounded-lg" />
                            <View className="ml-4">
                                <Text className="text-black font-bold">{order.service}</Text>
                                <Text className="text-black">{order.price}</Text>
                            </View>
                            <View className="ml-auto px-4 py-2 bg-blue-500 rounded-lg">
                                <Text className="text-white">Noter le service</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default SuiviComService;
