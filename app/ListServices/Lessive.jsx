import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Entete1 from '../../components/Entete1'
import { ScrollView } from 'react-native'
import LessiveDetail from '../ServiceSection/LessiveDetail'

const Lessive = () => {
  return (
    <SafeAreaView >
        <Back title ='Lavage et répassage'/>
        <ScrollView className='px-1'>
        <Entete1/>
        <LessiveDetail/>
        </ScrollView>

    </SafeAreaView>
  )
}

export default Lessive