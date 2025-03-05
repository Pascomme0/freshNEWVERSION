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
import Back from '../../components/Back';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../store";
import axios from "axios";
import {setActiveCommand, setActivePayLink} from "../panierServiceSlice";
import {router} from "expo-router";

const Container = styled(View);
const Label = styled(Text);
const Input = styled(TextInput);
const Button = styled(TouchableOpacity);
const RadioGroup = styled(View);
const RadioButton = styled(TouchableOpacity);
const RadioLabel = styled(Text);
const StyledText = styled(Text);
const StyledView = styled(View);

function ContratsCuisineApp() {
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
  const [heureFixe, setHeureFixe] = useState(true);
  const [ages, setAges] = useState('');
  const dispatch = useDispatch();

  // State for DateTimePickerModal
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pickerField, setPickerField] = useState('');
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [loadingConf, setLoadingConf] = useState(false);

  const formatDateTime = (datetime) => {
    return datetime
        ? `${datetime.toLocaleDateString()}`
        : '';
  };

  useEffect(() => {
    if (!heureFixe) {
      setHeure(null);
      setHeureFin(null);
    }
  }, [heureFixe])

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

  const validateSimpleDate = (inputDate) => {

    const now = new Date();
    const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
    );

    if (inputDate < tomorrow) {
      Alert.alert("Erreur", 'La date doit être au moins demain.');
      return false;
    }
    return true;
  };

  const validateDateTime = (inputDateTime) => {

    const now = new Date();
    const tomorrowAt8AM = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        8, 0, 0, 0
    );

    if (inputDateTime < tomorrowAt8AM) {
      Alert.alert("Erreur", 'La date et l’heure doivent être au moins demain à 8h00.');
      return false;
    }

    const hours = inputDateTime.getHours();
    if (hours < 8 || hours >= 17) {
      Alert.alert("Erreur", 'L’heure doit être entre 08:00 et 17:00.');
      return false;
    }
    return true;
  };

  const validateHour = (timeInput) => {

    const [hours, minutes] = timeInput.split(':').map(Number);

    // Plage horaire : 08:00 - 17:00 (exclus)
    if (hours < 8 || hours >= 17) {
      Alert.alert("Erreur",'L’heure doit être entre 08:00 et 17:00.');
      return false;
    }
    return true;
  }

  const validate = () => {
    if (!dateDebut || !adresse) {
      Alert.alert("Erreur", "la date de debut et l'adresse sont requise")
      return false;
    } else if (frequence === 'autre' && !autreDuree) {
      Alert.alert("Erreur", "Veuillez précisez la fréquence de travail")
      return false;
    } else if (heureFixe && !heure && !heureFin) {
      Alert.alert("Erreur", "Veuillez précisez les heures de travail")
      return false;
    } else if (heure > heureFin) {
      Alert.alert("Erreur", "l'heure de fin ne dois pas être inférieur à l'heure de debut")
      return false;
    } else if (dateFin && dateDebut > dateFin) {
      Alert.alert("Erreur", "la date de fin doit être supérieur à la date de debut")
      return false;
    } else if (dateFin && !validateSimpleDate(dateFin)) {
      return false;
    } else if (!validateSimpleDate(dateDebut)) {
      return false;
    } else if(heure && heureFin && !validateHour(heure) && !validateHour(heureFin)) {
      return false;
    }
    return true;
  };

  const showTimePicker = (field) => {
    setPickerField(field);
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    if (pickerField === 'heure') {
      setHeure(time);
    } else if (pickerField === 'heureFin') {
      setHeureFin(time);
    }
    hideTimePicker();
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoadingConf(true);
      const dateService = dateDebut;
      try {
        let response = "";
        response = await axios.post(`${url}/api/documents`, {
          typeDocument: "/api/type_documents/3",
          date: (new Date()).toISOString(),
          adresse: adresse,
          dateService: dateService ? dateService.toISOString() : null,
          dateFinService: dateFin ? dateFin.toISOString() : null,
          service: "/api/services/11",
          description,
          heureDebutService: heure ? "1900-01-01 " + heure : null,
          heureFinService: heureFin ? "1900-01-01 " + heureFin : null,
          joursDeService: (frequence === 'autre') ? autreDuree : frequence,
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
            Alert.alert('Succès', 'Commande confirmée avec succès, nous vous attribuerons un agent sous peu. Vous pouvez consultez l\'etat de vos demandes dans l\'onglet utilisateur.');

            router.push('/(tabs2)');
          }
        }

      } catch (AxiosError) {
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
        <Back title='Contrat'/>

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
        >
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}>
            <Container className="p-4">
              <Label className="text-md text-left font-bold mb-4">Description des tâches de la Cuisinière</Label>
              <Input
                  className="border p-2 mb-4 w-full rounded border-gray-400"
                  placeholder="Ma cuisinière devra faire la cuisine."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
              />
              <Label className="text-md text-left font-bold mb-4">Date de debut</Label>
              <TouchableOpacity onPress={() => showDatePicker('dateDebut')}>
                <Input
                    className="text-black h-14 border p-2 mb-4 w-full rounded border-gray-400"
                    placeholder="Date de début"
                    value={formatDateTime(dateDebut)}
                    editable={false}
                />
              </TouchableOpacity>
              <Label className="text-md text-left font-bold mb-4">Date de fin</Label>
              <TouchableOpacity onPress={() => showDatePicker('dateFin')}>
                <Input
                    className="text-black h-14 border p-2 mb-4 w-full rounded border-gray-400"
                    placeholder="Laissez vide si indéterminée"
                    value={formatDateTime(dateFin)}
                    editable={false}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateConfirm}
                  onCancel={hideDatePicker}
              />
              <Label className="text-md text-left font-bold mb-4">Durée de service</Label>
              <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 16}}>
                <Picker
                    selectedValue={frequence}
                    style={{height: 55, width: '100%'}}
                    onValueChange={(itemValue) => setFrequence(itemValue)}
                >
                  <Picker.Item label="Tous les jours" value="tous les jours"/>
                  <Picker.Item label="Tous les week-ends" value="tous les week end"/>
                  <Picker.Item label="Tous les 15 jours" value="tous les 15 jours"/>
                  <Picker.Item label="Autre" value="autre"/>
                </Picker>
              </View>
              {frequence === 'autre' && (
                  <Input
                      className="border p-2 mb-4 w-full rounded border-gray-400"
                      placeholder="Autre durée (Préciser)"
                      value={autreDuree}
                      onChangeText={setAutreDuree}
                  />
              )}
              {heureFixe && (
                  <View>
                    <Label className="text-md text-left font-bold mb-4">Heure de début de service</Label>
                    <TouchableOpacity onPress={() => showTimePicker('heure')}>
                      <Input
                          className="text-black border p-2 mb-4 w-full rounded border-gray-400 h-14"
                          placeholder="Heure"
                          value={heure}
                          editable={false}
                      />
                    </TouchableOpacity>
                    <Label className="text-md text-left font-bold mb-4">Heure de fin de service</Label>
                    <TouchableOpacity onPress={() => showTimePicker('heureFin')}>
                      <Input
                          className="text-black border p-2 mb-4 w-full rounded border-gray-400 h-14"
                          placeholder="Heure"
                          value={heureFin}
                          editable={false}
                      />
                    </TouchableOpacity>
                  </View>
              )}
              <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
              />
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

export default function ContratsCuisine() {
  return (
      <Provider store={store}>
        <ContratsCuisineApp/>
      </Provider>
  )
};
