import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { router } from 'expo-router';
import Back from '../components/Back';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const StyledText = styled(Text);
const StyledView = styled(View);

const handleOrderService = () => {
  router.push('/paiement/Checkout1');
};

const FormCom = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ pickup: '', dropoff: '' });
  const [timeField, setTimeField] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
    
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const showTimePicker = (field) => {
    setTimeField(field);
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    setSelectedTime((prevState) => ({ ...prevState, [timeField]: time }));
    hideTimePicker();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Back title='Commande'/>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="bg-white p-4">
        <View className="mb-4">
          <StyledText className="font-bold mb-2">Remarques ou autres</StyledText>
          <TextInput
            className="h-20 border border-gray-300 p-2 rounded shadow-sm"
            placeholder="Remarques ou autres"
            multiline
            numberOfLines={5}
          />
        </View>
        
        <View className="mb-4">
          <StyledText className="font-bold mb-2">Date de ramassage</StyledText>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              className="text-black h-12 border border-gray-300 p-2 rounded shadow-sm"
              placeholder="Date de ramassage"
              value={selectedDate}
              editable={false}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        
        <View className="mb-4">
          <StyledText className="font-bold mb-2">Heure de ramassage</StyledText>
          <TouchableOpacity onPress={() => showTimePicker('pickup')}>
            <TextInput
              className="text-black h-12 border border-gray-300 p-2 rounded shadow-sm"
              placeholder="Heure de ramassage"
              value={selectedTime.pickup}
              editable={false}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>

        <View className="mb-4">
          <StyledText className="font-bold mb-2">Adresse</StyledText>
          <TextInput
            className="h-12 border border-gray-300 p-2 rounded shadow-sm"
            placeholder="Votre localisation"
            multiline
          />
        </View>
      </ScrollView>
      <StyledView className="absolute bottom-0 w-full p-4 bg-white shadow-lg">
        <TouchableOpacity 
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handleOrderService}
        >
          <StyledText className="text-white text-center text-lg">Commander le service</StyledText>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
};

export default FormCom;
