import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Checkout from '../../components/Checkout'

const Paiement = () => {
  return (
   <SafeAreaView>
        <Back title='Checkout'/>
        <Checkout/>
   </SafeAreaView>
  )
}

export default Paiement