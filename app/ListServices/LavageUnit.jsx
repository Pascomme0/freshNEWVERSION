import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Entete1 from '../../components/Entete1'
import { ScrollView } from 'react-native'
import LavageDetail from '../ServiceSection/LavageDetail'

const LavageUnit = () => {
  return (
    <SafeAreaView >
    <Back title ='Lavage à l unité'/>
    <ScrollView className='px-1'>
    <Entete1/>
    <LavageDetail/>
    </ScrollView>

</SafeAreaView>
  )
}

export default LavageUnit