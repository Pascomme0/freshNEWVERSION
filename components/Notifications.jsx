import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';

const Notification = styled(View, 'flex-row items-center p-4 rounded-lg mb-3');
const NotificationText = styled(Text, 'ml-2 text-green-700');
const NotificationIconWrapper = styled(View, 'w-6 h-6 items-center justify-center');

const NotificationItem = ({ message, backgroundColor = 'rgba(43, 187, 104, 0.1)' }) => {
  return (
    <Notification style={{ backgroundColor }}>
      <NotificationIconWrapper>
        <FontAwesome name="bell" size={24} color="#34D399" />
      </NotificationIconWrapper>
      <NotificationText>{message}</NotificationText>
    </Notification>
  );
};

const Notifications = () => {
  const notifications = [
    'Votre commande vient d\'arriver au point de retrait',
    'Votre commande vient d\'arriver au point de retrait',
    'Votre commande vient d\'arriver au point de retrait',
    'Votre commande vient d\'arriver au point de retrait',
    'Votre commande vient d\'arriver au point de retrait',
  ];

  return (
    <View className="p-4">
      {notifications.map((message, index) => (
        <NotificationItem 
          key={index} 
          message={message} 
          backgroundColor='rgba(43, 187, 104, 0.1)' 
        />
      ))}
    </View>
  );
};

export default Notifications;
