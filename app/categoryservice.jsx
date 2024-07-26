import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entete1 from '../components/Entete1'
import Back from '../components/Back'
import Ory2 from '../components/Ory2'

const categoryservice = () => {
  return (
    <SafeAreaView>
        <Back/>
        <Entete1/>
        <Ory2/>


    </SafeAreaView>
    
  )
}

export default categoryservice