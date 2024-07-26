import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Picker } from '@react-native-picker/picker';
import Back from '../../components/Back';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = styled(View);
const Label = styled(Text);
const Input = styled(TextInput);
const Button = styled(TouchableOpacity);

const ContratsCuisine = () => {
  const [description, setDescription] = useState('');
  const [autreDuree, setAutreDuree] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [heure, setHeure] = useState('');
  const [adresse, setAdresse] = useState('');
  const [frequence, setFrequence] = useState('tous les jours');

  const handleSubmit = () => {
    console.log({
      description,
      autreDuree,
      dateDebut,
      heure,
      adresse,
      frequence,
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className='bg-white'
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container className="flex-1 bg-white justify-center">
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
            
            <Label className="text-md text-left font-bold mb-4">Durée de service</Label>
            <Picker
              selectedValue={frequence}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue) => setFrequence(itemValue)}
            >
              <Picker.Item label="Tous les jours" value="tous les jours" />
              <Picker.Item label="Tous les week-ends" value="tous les week-end" />
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
          </Container>
        </ScrollView>
        <View className="items-center mb-10">
          <Button
            className="bg-blue-500 p-4 rounded w-80 h-14 items-center"
            onPress={handleSubmit}
          >
            <Text className="text-center text-lg text-white font-bold">Valider</Text>
          </Button>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default ContratsCuisine;
