import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Entete1 from '../../components/Entete1'
import { ScrollView } from 'react-native'
import DesinfectionDetail from '../ServiceSection/DesinfectionDetail'

const Desinfection = () => {
  return (
    <SafeAreaView >
    <Back title ='Désinfection à l unité'/>
    <ScrollView className='px-1'>
    <Entete1/>
    <DesinfectionDetail/>
    </ScrollView>

</SafeAreaView>
  )
}

export default Desinfection