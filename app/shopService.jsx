import {View, Text, ScrollView,} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Back from '../components/Back'
import {Provider} from "react-redux";
import {store} from "./store";
import ShoppingCartService from "../components/ShoppingCartService";

const shopService = () => {
    return (
        <Provider store={store}>
            <SafeAreaView>
                <ScrollView>
                    <Back title='Mon panier'/>

                    <ShoppingCartService/>
                </ScrollView>
            </SafeAreaView>
        </Provider>

    )
}

export default shopService