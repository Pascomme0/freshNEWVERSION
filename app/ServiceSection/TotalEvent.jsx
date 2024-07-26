import { View, Text } from 'react-native'
import React from 'react'
import Back from '../../components/Back'
import { SafeAreaView } from 'react-native-safe-area-context'
import TotalEventComponent from '../../components/TotalEventComponent'

const TotalEvent = () => {
  return (
    <SafeAreaView>
      <Back title='contrat de cuisine'/>
      <TotalEventComponent/>
    </SafeAreaView>
  )
}

export default TotalEvent