import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Formulaire from '../../components/Formulaire'


const Infos = () => {
  return (
    <SafeAreaView>
        <Back title = "Informations personnelles"/>   
        <Formulaire/>
    </SafeAreaView>
  )
}

export default Infos
