import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import { styled } from 'nativewind';
import { Picker } from '@react-native-picker/picker';
import Back from '../../components/Back';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Container = styled(View);
const Label = styled(Text);
const Input = styled(TextInput);
const Button = styled(TouchableOpacity);
const RadioGroup = styled(View);
const RadioButton = styled(TouchableOpacity);
const RadioLabel = styled(Text);

const Contrats = () => {
  const [description, setDescription] = useState('');
  const [nombreEnfants, setNombreEnfants] = useState('');
  const [autreDuree, setAutreDuree] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [heure, setHeure] = useState('');
  const [adresse, setAdresse] = useState('');
  const [frequence, setFrequence] = useState('tous les jours');
  const [dortChezVous, setDortChezVous] = useState('');

  // State for DateTimePickerModal
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pickerField, setPickerField] = useState('');

  const showDatePicker = (field) => {
    setPickerField(field);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    if (pickerField === 'dateDebut') {
      setDateDebut(date.toDateString());
    }
    hideDatePicker();
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
    }
    hideTimePicker();
  };

  const handleSubmit = () => {
    console.log({
      description,
      nombreEnfants,
      autreDuree,
      dateDebut,
      heure,
      adresse,
      frequence,
      dortChezVous,
    });
  };

  return (
    <SafeAreaView className='pt-3' style={{ flex: 1 }}>
                  <Back title='Contrat' />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
          <Container className="p-4">
            <Label className="text-md text-left font-bold mb-4">Description des tâches de la Nounou</Label>
            <Input
              className="border p-2 mb-4 w-full rounded border-gray-400"
              placeholder="Ma nounou devra faire la lessive, s'occuper des enfants..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <Label className="text-md text-left font-bold mb-4">Nombre d'enfant</Label>
            <Input
              className="border p-2 mb-4 w-full rounded border-gray-400 h-14"
              placeholder="Nombre d'enfants"
              keyboardType="phone-pad"
              value={nombreEnfants}
              onChangeText={setNombreEnfants}
            />
            <Label className="text-md text-left font-bold mb-4">Durée de service</Label>
            <Picker
              selectedValue={frequence}
              style={{ height: 50, width: '100%',}}
              onValueChange={(itemValue) => setFrequence(itemValue)}
            >
              <Picker.Item label="Tous les jours" value="tous les jours" />
              <Picker.Item label="Tous les week-ends" value="tous les week end" />
              <Picker.Item label="Tous les 15 jours" value="tous les 15 jours" />
              <Picker.Item label="Autre" value="autre" />
            </Picker>
            {frequence === 'autre' && (
              <Input
                className="border p-2 mb-4 w-full rounded border-gray-400"
                placeholder="Autre durée (Préciser)"
                value={autreDuree}
                onChangeText={setAutreDuree}
              />
            )}
            <Label className="text-md text-left font-bold mb-4">Date</Label>
            <TouchableOpacity onPress={() => showDatePicker('dateDebut')}>
              <Input
                className="text-black h-14 border p-2 mb-4 w-full rounded border-gray-400"
                placeholder="Date de début"
                value={dateDebut}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <Label className="text-md text-left font-bold mb-4">Heure</Label>
            <TouchableOpacity onPress={() => showTimePicker('heure')}>
              <Input
                className="text-black border p-2 mb-4 w-full rounded border-gray-400 h-14"
                placeholder="Heure"
                value={heure}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
            <Label className="text-md text-left font-bold mb-4 ">Adresse</Label>
            <Input
              className="border p-2 mb-4 w-full rounded border-gray-400 h-14"
              placeholder="Adresse"
              value={adresse}
              onChangeText={setAdresse}
            />
            <Label className="text-md text-left font-bold mb-4">La nounou dort-elle chez vous ?</Label>
            <RadioGroup className="flex flex-row mb-4">
              <RadioButton
                className="mr-4"
                onPress={() => setDortChezVous('oui')}
              >
                <RadioLabel className={`p-2 ${dortChezVous === 'oui' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Oui
                </RadioLabel>
              </RadioButton>
              <RadioButton
                onPress={() => setDortChezVous('non')}
              >
                <RadioLabel className={`p-2 ${dortChezVous === 'non' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Non
                </RadioLabel>
              </RadioButton>
            </RadioGroup>
          </Container>
          <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text className="text-center text-white font-bold">Valider</Text>
          </Button>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default Contrats;
