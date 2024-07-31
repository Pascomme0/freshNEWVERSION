import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../components/Back';
import { router } from 'expo-router';

const DevisCom = () => {
  const [duration, setDuration] = useState('');
  const [showOtherField, setShowOtherField] = useState(false);
  const [other, setOther] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleDurationChange = (value) => {
    setDuration(value);
    setShowOtherField(value === 'Autre');
    setShowMenu(false);
  };

  const handleOrderService = () => {
    router.push('/paiement/Checkout1');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Back title='Fiche de demande' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          className="bg-white p-4"
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <View className="mb-4">
            <Text className="text-[16px] font-bold mb-2">Durée du service</Text>
            <TouchableOpacity
              className="justify-center h-12 border border-gray-300 p-2 rounded shadow-sm"
              onPress={() => setShowMenu(!showMenu)}
            >
              <Text className='text-gray-700 justify-center'>{duration || 'Sélectionner la durée'}</Text>
            </TouchableOpacity>
            {showMenu && (
              <View className="border rounded border-gray-300">
                <TouchableOpacity
                  className="p-2"
                  onPress={() => handleDurationChange('Tous les jours')}
                >
                  <Text>Tous les jours</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2"
                  onPress={() => handleDurationChange('Tous les Week-ends')}
                >
                  <Text>Tous les Week-ends</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2"
                  onPress={() => handleDurationChange('Une fois tous les 15 jours')}
                >
                  <Text>Une fois tous les 15 jours</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2"
                  onPress={() => handleDurationChange('Autre')}
                >
                  <Text>Autre</Text>
                </TouchableOpacity>
              </View>
            )}
            {showOtherField && (
              <TextInput
                className="border p-2 mt-2 rounded"
                placeholder="Autre"
                value={other}
                onChangeText={setOther}
              />
            )}
            <Text className="text-[16px] font-bold mt-4 mb-2">Date de traitement du service</Text>
            <TouchableOpacity
              className="h-12 justify-center border border-gray-300 p-2 rounded shadow-sm"
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{date.toLocaleDateString() || 'Sélectionner une date'}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Text className="text-[16px] font-bold mt-4 mb-2">Heure de traitement du service</Text>
            <TouchableOpacity
              className="text-black justify-center h-12 border border-gray-300 p-2 rounded shadow-sm"
              onPress={() => setShowTimePicker(true)}
            >
              <Text className='text-black justify-center items-center'>{time.toLocaleTimeString() || 'Sélectionner une heure'}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
            <Text className="text-[16px] font-bold mt-4 mb-2">Remarques ou autres</Text>
            <TextInput
              className="h-20 border border-gray-300 p-2 rounded shadow-sm"
              placeholder="Remarques ou autres"
              multiline={true}
            />
            <Text className="text-[16px] font-bold mt-4 mb-2">Localisation de l'école</Text>
            <TextInput
              className="h-12 border border-gray-300 p-2 rounded shadow-sm"
              placeholder="Localisation "
            />
          </View>
        </ScrollView>
        <View className="absolute bottom-0 w-full p-4 bg-white shadow-lg">
          <TouchableOpacity 
            className="bg-blue-500 p-4 rounded-lg"
            onPress={handleOrderService}
          >
            <Text className="text-white text-center text-lg">Soumettre</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DevisCom;
