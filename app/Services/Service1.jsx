import { View, Text } from 'react-native'
import React from 'react'
import Back from '../../components/Back'
import Entete1 from '../../components/Entete1'
import ServiceList from '../../components/ServiceList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

const Service1 = () => {
  return (
    <ScrollView>
    <SafeAreaView>
    <Back title='Menage à lunité'/>
    <Entete1 />
    <ServiceList/>
</SafeAreaView>
</ScrollView>

  )
}

export default Service1