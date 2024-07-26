import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Back from '../../components/Back'
import Entete1 from '../../components/Entete1'
import { SafeAreaView } from 'react-native-safe-area-context';
import LavageLuxe from '../ServiceSection/LavageLuxe';
import LavageLuxePro from '../ServiceSection/LavageLuxePro';
import LavageNormal from '../ServiceSection/LavageNormal';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Auto = () => {
  const [selectedTab, setSelectedTab] = useState('normal');

  const renderContent = () => {
    switch (selectedTab) {
      case 'normal':
        return (
          <StyledView className="flex flex-row justify-between">
            < LavageNormal/>
          </StyledView>
        );
      case 'luxe':
        return (
          <StyledView className="flex flex-row justify-between">
            < LavageLuxe/>
          </StyledView>
        );
      case 'luxe_pro':
        return (
          <StyledView className="flex flex-row justify-between">
             < LavageLuxePro/>
          </StyledView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 py-4 px-3 bg-white">
      <Back/>
      <Entete1/>
      <StyledView className="flex flex-row justify-around mb-4">
        <StyledTouchableOpacity className='rounded-lg ' onPress={() => setSelectedTab('normal')}>
          <StyledText className={`px-4 py-2 ${selectedTab === 'normal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Lavage normal</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className='rounded-xl px-4'  onPress={() => setSelectedTab('luxe')}>
          <StyledText className={`px-4 py-2 ${selectedTab === 'luxe' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Lavage luxe</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className='w-33 rounded-2xl '  onPress={() => setSelectedTab('luxe_pro')}>
          <StyledText className={`px-4 py-2 ${selectedTab === 'luxe_pro' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Lavage luxe pro</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <ScrollView>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auto;