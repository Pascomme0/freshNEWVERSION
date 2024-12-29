import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import {styled} from 'nativewind';
import {Picker} from '@react-native-picker/picker';
import Back from '../components/Back';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store";
import axios from "axios";
import {router, useLocalSearchParams} from "expo-router";

const Container = styled(View);
const Label = styled(Text);
const Input = styled(TextInput);
const Button = styled(TouchableOpacity);

function ContratsApp() {
    const url = "https://admin.freshen-up.net"
    const [description, setDescription] = useState('');
    const [nombreEnfants, setNombreEnfants] = useState('');
    const [autreDuree, setAutreDuree] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [heure, setHeure] = useState(null);
    const [heureFin, setHeureFin] = useState(null);
    const [adresse, setAdresse] = useState('');
    const [frequence, setFrequence] = useState('tous les jours');
    const [dortChezVous, setDortChezVous] = useState(false);
    const [heureFixe, setHeureFixe] = useState(false);
    const [ages, setAges] = useState('');
    const dispatch = useDispatch();

    // State for DateTimePickerModal
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [pickerField, setPickerField] = useState('');
    const token = useSelector((state) => state.user.token);
    const [loadingConf, setLoadingConf] = useState(false);
    const [isService, setIsService] = useState(false);
    const [commande, setCommande] = useState({});
    const { cmd } = useLocalSearchParams();


    useEffect(() => {
        try {
            setCommande(cmd ? JSON.parse(cmd) : {});
            if (commande.service === "/api/services/10" && commande.service === "/api/services/11" && commande.service === "/api/services/15") {
                setIsService(true);
            } else {
                setIsService(false);
            }
        } catch (error) {
            console.error("Erreur lors de la désérialisation de cmd :", error);
            return <Text>Erreur lors du chargement de la commande.</Text>;
        }

    }, [])

    // Désérialisation de l'objet cmd

    const formatDateTime = (datetime) => {
        if (isService) {
            return datetime
                ? `${datetime.toLocaleDateString()}`
                : '';
        } else {
            return datetime
                ? `${datetime.toLocaleDateString()}  ${datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : '';
        }
    };

    const showDatePicker = (field) => {
        setPickerField(field);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        if (pickerField === 'dateDebut') {
            setDateDebut(date);
        } else if (pickerField === 'dateFin') {
            setDateFin(date);
        }
        hideDatePicker();
    };

    const validate = () => {
        if (!dateDebut) {
            return false;
        }
        return true;
    };

    const showTimePicker = (field) => {
        setPickerField(field);
        setTimePickerVisibility(true);
    };



    const handleSubmit = async () => {
        if (validate()) {
            setLoadingConf(true);
            const dateService = dateDebut;
            try {
                let response = "";
                response = await axios.patch(`${url}${commande['@id']}`, {
                    dateService: dateService ? dateService.toISOString() : null,
                    dateFinService: dateFin ? dateFin.toISOString() : null,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Alert.alert("Succès", "Commande mise à jour")
                router.push('/(tabs2)')
            } catch (AxiosError) {
                console.log(AxiosError)
                Alert.alert('Erreur', 'Erreur lors de la commande');
            } finally {
                setLoadingConf(false);
            }
        } else {
            Alert.alert("Erreur", "Une erreur s'est produite ")
        }
    };

    return (
        <SafeAreaView className='pt-3' style={{flex: 1}}>
            <Back title='Modifier les dates de services'/>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
            >
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}>
                    <Container className="p-4">
                        <Label className="text-md text-left font-bold mb-4">{isService? 'Date de debut' : 'Date service'}</Label>
                        <TouchableOpacity onPress={() => showDatePicker('dateDebut')}>
                            <Input
                                className="text-black h-14 border p-2 mb-4 w-full rounded border-gray-400"
                                placeholder={isService? "Date de début": "Date de service"}
                                value={formatDateTime(dateDebut)}
                                editable={false}
                            />
                        </TouchableOpacity>
                        {isService && (
                            <View>
                                <Label className="text-md text-left font-bold mb-4">Date de fin</Label>
                                <TouchableOpacity onPress={() => showDatePicker('dateFin')}>
                                    <Input
                                        className="text-black h-14 border p-2 mb-4 w-full rounded border-gray-400"
                                        placeholder="Laissez vide si indéterminée"
                                        value={formatDateTime(dateFin)}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode={isService ? "date" : "datetime"}
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                        />
                    </Container>
                    <View style={styles.buttonContainer}>
                        {loadingConf ? <ActivityIndicator size="small" color="#000" /> : (
                            <Button
                                style={styles.button}
                                onPress={handleSubmit}
                            >
                                <Text className="text-center text-white font-bold">Valider</Text>
                            </Button>
                        )}
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    pickerContainer: {
        // backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default function Contrats() {
    return (
        <Provider store={store}>
            <ContratsApp/>
        </Provider>
    )
};
