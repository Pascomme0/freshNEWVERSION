import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

const TotalEventComponent = () => {
  const [numberOfPlaces, setNumberOfPlaces] = useState('150');
  const [numberOfGuests, setNumberOfGuests] = useState('150');
  const [date, setDate] = useState('Yopougon Niangon Sud à Gauche');
  const [time, setTime] = useState('Yopougon Niangon Sud à Gauche');
  const price = '50 000 F';
  const router = useRouter();

  return (
    <View className="h-full p-4  bg-white">
      <View className="mb-4">
        <Text className="text-lg font-semibold">Nombre de place salle</Text>
        <TextInput
          className="border p-2 mt-2 rounded"
          value={numberOfPlaces}
          onChangeText={setNumberOfPlaces}
          keyboardType="numeric"
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold">Nombre d’invités</Text>
        <TextInput
          className="border p-2 mt-2 rounded"
          value={numberOfGuests}
          onChangeText={setNumberOfGuests}
          keyboardType="numeric"
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold">Date</Text>
        <TextInput
          className="border p-2 mt-2 rounded"
          value={date}
          onChangeText={setDate}
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold">Heure</Text>
        <TextInput
          className="border p-2 mt-2 rounded"
          value={time}
          onChangeText={setTime}
        />
      </View>
      <View className="mb-4 h-28 p-4 bg-blue-100 rounded">
        <Text className="text-xl font-bold text-center text-blue-600">
          Prix
        </Text>
        <Text className="text-2xl font-bold text-center text-blue-600">
          {price}
        </Text>
      </View>
      <View className="mt-4 ">
        <Button className="" title="Valider" onPress={() => router.push('/')} />
      </View>
    </View>
  );
};

export default TotalEventComponent;
