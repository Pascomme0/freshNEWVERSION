import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SuiviCmd from '../../components/SuiviCmd'
import Back from '../../components/Back'

const SuiviCom = () => {
    return (
        <SafeAreaView>
            <Back title="Mes commandes"/>
            <SuiviCmd/>
        </SafeAreaView>

    )
}

export default SuiviCom