import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import Entete from '../../components/Entete'
import DetailCate from '../../components/DetailCate'
import { ScrollView } from 'react-native'
import {Provider} from "react-redux";
import {store} from "../store";

function Category1App() {
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

export default function Category1() {
    return (
        <Provider store={store}>
            <Category1App/>
        </Provider>
    );
};