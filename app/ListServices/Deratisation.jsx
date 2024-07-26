import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Entete1 from '../../components/Entete1'
import { ScrollView } from 'react-native'
import DeratisationDetail from '../ServiceSection/DeratisationDetail'
const Deratisation = () => {
  return (
    <SafeAreaView >
    <Back title ='Dératisation à l unité'/>
    <ScrollView className='px-1'>
    <Entete1/>
    <DeratisationDetail/>
    </ScrollView>

</SafeAreaView>
  )
}

export default Deratisation