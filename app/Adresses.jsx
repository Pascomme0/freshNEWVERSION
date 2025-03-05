import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import TopBar from "../components/TopBar";
import {router} from "expo-router";
import {store} from "./store";
import {Provider,useDispatch, useSelector} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    addressItem: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
    },
    commune: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

function AdressesApp() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const activeMenu = useSelector((state) => state.user.activeMenu);

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        setAddresses(user.adresses);
    }, []);

    return (
        <View style={styles.container}>
            <TopBar title="Liste des Adresses" retPage={activeMenu} />
            {addresses.length === 0 ? (<Text style={{alignSelf:"center", verticalAlign:"middle"}}>Aucune adresse</Text>) :
                (
                    <FlatList
                        data={addresses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.addressItem}>
                                <Text style={styles.commune}>{item.commune.label}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        )}
                    />
                )
            }
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/Ajouter_Adresse')}
            >
                <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    );
}


export default function Adresses() {
    return(
        <Provider store={store}>
            <AdressesApp />
        </Provider>
    )
}