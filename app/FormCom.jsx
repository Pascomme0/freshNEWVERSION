import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { router } from 'expo-router';
import Back from '../components/Back';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from "@react-native-picker/picker";
import {Provider, useDispatch, useSelector} from "react-redux";
import { store } from "./store";
import {setActiveCommand, setActivePayLink, setClearPanier} from "./panierServiceSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledText = styled(Text);
const StyledView = styled(View);

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

const formatDateTime = (datetime) => {
  return datetime
      ? `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : 'Choisir une date et une heure';
};

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = dimanche, 6 = samedi
};

const handleOrderService = () => {
  router.push('/paiement/Checkout1');
};

function FormComApp() {
  const url = "https://admin.freshen-up.net"
  const [adresse, setAdresse] = useState('');
  const [executionLocation, setExecutionLocation] = useState('');
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [serviceDateTime, setServiceDateTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const service = useSelector((state) => state.panierService.service);
  const detailPanier = useSelector((state) => state.panierService.detailPanier);
  const activeCommand = useSelector((state) => state.panierService.activeCommand);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [isReturnDateEditable, setIsReturnDateEditable] = useState(true);
  const [loadingConf, setLoadingConf] = useState(false)
  const [paiement, setPaiement] = useState('/api/moyen_paiements/1')
  const [atHome, setAtHome] = useState(null)

  useEffect(() => {
    if (executionLocation === "hors_domicile") {
      setAtHome(false)
      setPaiement("api/moyen_paiements/2")
      setIsReturnDateEditable(false); // Rendre la date de retour non modifiable
      if (pickupDateTime) {
        const returnDateTime = new Date(pickupDateTime);
        returnDateTime.setDate(pickupDateTime.getDate() + 3);
        setServiceDateTime(returnDateTime); // Calcul automatique
      }
    } else {
      setAtHome(true)
      setPaiement("api/moyen_paiements/1")
      setIsReturnDateEditable(true);
    }
  }, [executionLocation, pickupDateTime]);

  const showDatePicker = (field) => {
    if (field === 'service' && !isReturnDateEditable) return; // Empêcher l'ouverture si non modifiable
    setCurrentField(field);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (datetime) => {
    if (currentField === 'pickup') {
      setPickupDateTime(datetime);
    } else if (currentField === 'service') {
      setServiceDateTime(datetime);
    }
    hideDatePicker();
  };

  const clearPanierService = async () => {
    const panier = await AsyncStorage.getItem('panierService');
    if (panier) {
      const listPanier = JSON.parse(panier);
      let updatedData = listPanier.filter((item) => item.service !== service)
      await AsyncStorage.setItem('panierService', JSON.stringify(updatedData));
    }

  }

  const resetPanier = async () => {
    dispatch(setClearPanier())
    await clearPanierService()
  }

  const validate = () => {
    if (service === "/api/services/1") {
      if (atHome) {
        return serviceDateTime && !isWeekend(serviceDateTime) && adresse;
      } else {
        return pickupDateTime && executionLocation && !isWeekend(serviceDateTime) && !isWeekend(pickupDateTime) && adresse
      }
    } else {
      return serviceDateTime && !isWeekend(serviceDateTime) && adresse;
    }
  }

  const handleCommand = async () => {
    if (validate()) {
      setLoadingConf(true);
      const dateRamassage = pickupDateTime;
      const dateService = pickupDateTime ? null : serviceDateTime;
      const dateRetour = pickupDateTime ? serviceDateTime : null;
      let det = [];
      // console.log(this.panier.detailDocuments);
      for (let i = 0; i < detailPanier.length; i++) {
        det.push({
          produit: detailPanier[i].produit?.['@id'],
          quantity: detailPanier[i].quantity,
        })
      }
      try {
        let response = "";
        if (activeCommand) {
          response = await axios.patch(`${url}${activeCommand}`, {
            typeDocument: "/api/type_documents/3",
            date: (new Date()).toISOString(),
            atHome,
            description,
            adresse,
            dateRamassage: dateRamassage ? dateRamassage.toISOString() : null,
            dateService: dateService ? dateService.toISOString() : null,
            service,
            dateRetour: dateRetour ? dateRetour.toISOString() : null,
            detailDocuments: det,
            nbAgentRequis: 1,
            paiement:{
              moyenPaiement: paiement
            }
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axios.post(`${url}/api/documents`, {
            typeDocument: "/api/type_documents/3",
            date: (new Date()).toISOString(),
            atHome,
            description,
            adresse,
            dateRamassage: dateRamassage ? dateRamassage.toISOString() : null,
            dateService: dateService ? dateService.toISOString() : null,
            service,
            dateRetour: dateRetour ? dateRetour.toISOString() : null,
            detailDocuments: det,
            nbAgentRequis: 1,
            paiement:{
              moyenPaiement: paiement
            }
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
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
            resetPanier()
            router.push('/(tabs2)');
          }
        }

      } catch (AxiosError) {
        console.log(AxiosError)
        Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'adresse');
      } finally {
        setLoadingConf(false);
      }
    } else {
      Alert.alert("Erreur", 'Remplissez correctement les champs les week-end ne sont pas autorisé.');
    }
  }



  return (
      <SafeAreaView className="flex-1 bg-white">
        <Back title="Commande" />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="bg-white p-4">
          <View className="mb-4">
            <StyledText className="font-bold mb-2">Remarques ou autres</StyledText>
            <TextInput
                className="h-20 border border-gray-300 p-2 rounded shadow-sm"
                placeholder="Remarques ou autres"
                multiline
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
            />
          </View>

          <View className="mb-4">
            <StyledText className="font-bold mb-2">Adresse</StyledText>
            <View style={styles.pickerContainer}>
              <Picker
                  selectedValue={adresse}
                  onValueChange={(value) => setAdresse(value)}
              >
                <Picker.Item label="Sélectionnez une adresse" value="" />
                {user?.adresses?.map((ad, index) => (
                    <Picker.Item key={index} label={ad.commune.label} value={ad['@id']} />
                ))}
              </Picker>
            </View>
          </View>

          {service === '/api/services/1' ? (
              <View>
                <View className="mb-4">
                  <StyledText className="font-bold mb-2">Lieu d'exécution</StyledText>
                  <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={executionLocation}
                        onValueChange={(value) => {
                          setExecutionLocation(value);
                          if (value !== 'hors_domicile') {
                            setPickupDateTime(null);
                            setServiceDateTime(null);
                          }
                        }}
                    >
                      <Picker.Item label="Choisissez une option" value="" />
                      <Picker.Item label="À domicile" value="domicile" />
                      <Picker.Item label="Hors domicile" value="hors_domicile" />
                    </Picker>
                  </View>
                </View>

                {executionLocation === 'hors_domicile' && (
                    <View className="mb-4">
                      <StyledText className="font-bold mb-2">Date et heure de ramassage</StyledText>
                      <TouchableOpacity
                          className="h-12 border border-gray-300 p-2 rounded shadow-sm"
                          onPress={() => showDatePicker('pickup')}
                      >
                        <Text>{formatDateTime(pickupDateTime)}</Text>
                      </TouchableOpacity>
                    </View>
                )}

                <View className="mb-4">
                  <StyledText className="font-bold mb-2">
                    {executionLocation === 'hors_domicile' ? 'Date et heure de retour' : 'Date et heure de service'}
                  </StyledText>
                  <TouchableOpacity
                      className={`h-12 border border-gray-300 p-2 rounded shadow-sm ${
                          !isReturnDateEditable ? 'bg-gray-100' : ''
                      }`}
                      onPress={() => showDatePicker('service')}
                  >
                    <Text>{formatDateTime(serviceDateTime)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
          ) : (
              <View className="mb-4">
                <StyledText className="font-bold mb-2">
                  Date et heure de service
                </StyledText>
                <TouchableOpacity
                    className={`h-12 border border-gray-300 p-2 rounded shadow-sm`}
                    onPress={() => showDatePicker('service')}
                >
                  <Text>{formatDateTime(serviceDateTime)}</Text>
                </TouchableOpacity>
              </View>
          )}
        </ScrollView>

        <StyledView className="absolute bottom-0 w-full p-4 bg-white shadow-lg">
          <TouchableOpacity className="bg-blue-500 p-4 rounded-lg" onPress={handleCommand}>
            {loadingConf ? <ActivityIndicator size="small" color="#fff" /> : (
                <StyledText className="text-white text-center text-lg">Commander le service</StyledText>
            )}
          </TouchableOpacity>
        </StyledView>

        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime" // Mode datetime activé
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
        />
      </SafeAreaView>
  );
}

export default function FormCom() {
  return (
      <Provider store={store}>
        <FormComApp />
      </Provider>
  );
}
