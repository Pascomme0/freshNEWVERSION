import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Back from '../../components/Back'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RadioButton, Button } from 'react-native-paper';
import { useState } from 'react';
import Ratio from '../../components/Ratio';

const Checkout1 = () => {

    return (
        <SafeAreaView>
            <Back title='Checkout' />
            <Ratio/>
        </SafeAreaView>
    )
}
export default Checkout1