import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Picker } from '@react-native-picker/picker';
import Back from '../../components/Back';

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
    <Container className="flex-1 bg-white">
      <Back title='Contrat' />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <Container className="p-4">
          <Label className="text-md text-left font-bold mb-4">Description des tâches de la Nounou</Label>
          <Input
            className="border p-2 mb-4 w-full rounded"
            placeholder="Ma nounou devra faire la lessive, s'occuper des enfants..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          <Label className="text-md text-left font-bold mb-4">Nombre d'enfant</Label>
          <Input
            className="border p-2 mb-4 w-full rounded"
            placeholder="Nombre d'enfants"
            keyboardType="phone-pad"
            value={nombreEnfants}
            onChangeText={setNombreEnfants}
          />
          <Label className="text-md text-left font-bold mb-4">Durée de service</Label>
          <Picker
            selectedValue={frequence}
            style={{ height: 50, width: '100%' }}
            onValueChange={(itemValue) => setFrequence(itemValue)}
          >
            <Picker.Item label="Tous les jours" value="tous les jours" />
            <Picker.Item label="Tous les week-ends" value="tous les week end" />
            <Picker.Item label="Tous les 15 jours" value="tous les 15 jours" />
            <Picker.Item label="Autre" value="autre" />
          </Picker>
          {frequence === 'autre' && (
            <Input
              className="border p-2 mb-4 w-full rounded"
              placeholder="Autre durée (Préciser)"
              value={autreDuree}
              onChangeText={setAutreDuree}
            />
          )}
          <Label className="text-md text-left font-bold mb-4">Date</Label>
          <Input
            className="border p-2 mb-4 w-full rounded"
            placeholder="Date de début"
            value={dateDebut}
            onChangeText={setDateDebut}
          />
          <Label className="text-md text-left font-bold mb-4">Heure</Label>
          <Input
            className="border p-2 mb-4 w-full rounded"
            placeholder="Heure"
            value={heure}
            onChangeText={setHeure}
          />
          <Label className="text-md text-left font-bold mb-4">Adresse</Label>
          <Input
            className="border p-2 mb-4 w-full rounded"
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
      </ScrollView>
      <Button
        className="bg-blue-500 p-4 rounded w-full mr-2 ml-2 justify-center absolute bottom-0"
        onPress={handleSubmit}
      >
        <Text className="text-center text-white font-bold">Valider</Text>
      </Button>
    </Container>
  );
};

export default Contrats;
