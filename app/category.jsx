import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entete from '../components/Entete'
import Back from '../components/Back'
import Ory from '../components/Ory'
const category = () => {
  return (
    <SafeAreaView>
        <Back/>
        <Entete/>
        <Ory/>
    </SafeAreaView>
    
  )
}

export default category