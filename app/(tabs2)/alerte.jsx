import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import NotificationsService from "../NotificationService";

const alerte = () => {
  return (
    <SafeAreaView>
      <Back 
      title = "Notifications"
      />
      <NotificationsService backgroundColor = 'rgba(29, 166, 248, 1)' />
    </SafeAreaView>  
  )
}

export default alerte