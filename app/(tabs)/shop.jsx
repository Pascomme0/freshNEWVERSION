import {View, Text, ScrollView,} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Back from '../../components/Back'
import ShoppingCart from '../../components/ShoppingCart'
import {Provider} from "react-redux";
import {store} from "../store";

const shop = () => {
    return (
        <Provider store={store}>
            <SafeAreaView>
                <ScrollView>
                    <Back title='Mon panier'/>

                    <ShoppingCart/>
                </ScrollView>
            </SafeAreaView>
        </Provider>

    )
}

export default shop