import { View, Text, ScrollView,} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../../components/Back'
import ShoppingCart from '../../components/ShoppingCart'

const shop = () => {
  return (
   
       <SafeAreaView>
         <ScrollView>
         <Back title='Mon panier'/>

    <ShoppingCart/>
    </ScrollView>
 </SafeAreaView>
  

    
    
  )
}

export default shop