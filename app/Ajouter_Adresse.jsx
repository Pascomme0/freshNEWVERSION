// /app/adresses/add.js
import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TopBar from '../components/TopBar';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUser} from "./userSlice";
import {router} from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
    },
    picker: {
        height: 55,
        width: '100%',
    },
    input: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    addButton: {
        marginTop: 16,
        backgroundColor: '#28a745',
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

function AddAdresseApp() {
    const url = 'https://admin.freshen-up.net';
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [commune, setCommune] = useState('');
    const [communes, setCommunes] = useState([]);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // const communes = ['Abidjan', 'Bouaké', 'Yamoussoukro', 'San-Pédro', 'Korhogo'];

    useEffect(() => {
        const getCommunes = async () => {
            try {
                const response = await axios.get(`${url}/api/communes`);
                setCommunes(response.data['hydra:member']);
            } catch (AxiosError) {
                Alert.alert('Erreur', 'Erreur de récupération');
            }
        };
        getCommunes();
    }, []);


    const handleAddAddress = async () => {
        if (commune && description) {
            setLoading(true);
            try {
                const response = await axios.post(`${url}/api/adresses`, {
                    commune,
                    description
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userResponse = await axios.get(url + '/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userData = userResponse.data["hydra:member"][0];
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                dispatch(setUser(userData));
                Alert.alert('Succès', 'Adresse ajoutée avec succès.');
                router.push('/Adresses');
            } catch (AxiosError) {
                Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'adresse');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    };

    return (
        <View style={styles.container}>
            <TopBar title="Ajouter une Adresse" />
            <Text style={styles.label}>Commune</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={commune}
                    onValueChange={(value) => setCommune(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Sélectionnez une commune" value="" />
                    {communes.map((commune, index) => (
                        <Picker.Item key={index} label={commune.label} value={commune['@id']} />
                    ))}
                </Picker>
            </View>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Entrez la description"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
                {loading ? <ActivityIndicator size="small" color="#fff" /> : (
                    <Text style={styles.addButtonText}>Ajouter l'adresse</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

export default function AddAdresse() {
    return (
        <Provider store={store}>
            <AddAdresseApp/>
        </Provider>
    )
}
