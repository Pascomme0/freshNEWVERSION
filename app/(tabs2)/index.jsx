import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entete1 from '../../components/Entete1'
import CategoriesScreen1 from '../../components/Categories1'
import Images from '../../components/Images'
import ProductList1 from '../../components/ProductList1'
import { ScrollView } from 'react-native'

const index = () => {
    return (

        <SafeAreaView className='bg-white' >
            <ScrollView className='px-2 bg-white' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Entete1 />
                <CategoriesScreen1 />
                <Images />
                <ProductList1 />
            </ScrollView>
        </SafeAreaView>

    )
}

export default index