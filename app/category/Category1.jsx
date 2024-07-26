import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Entete from '../../components/Entete'
import DetailCate from '../../components/DetailCate'
import { ScrollView } from 'react-native'

const Category1 = () => {
  return (
    <SafeAreaView >
        <Back title ='Categories'/>
        <ScrollView className='px-4'>
        <Entete/>
             <DetailCate/>
        </ScrollView>
    </SafeAreaView>
    
  )
}

export default Category1