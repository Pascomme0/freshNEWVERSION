import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Entete1 from '../../components/Entete1'
import { ScrollView } from 'react-native'
import MenageDetail from '../ServiceSection/MenageDetail'

const Menage = () => {
  return (
    <SafeAreaView >
    <Back title ='Ménage à l unité'/>
    <ScrollView className='px-2'>
    <Entete1/>
    <MenageDetail/>
    </ScrollView>
</SafeAreaView>
  )
}

export default Menage