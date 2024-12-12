import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entete from '../components/Entete'
import Back from '../components/Back'
import Ory from '../components/Ory'
import {Provider} from "react-redux";
import {store} from "./store";
const category = () => {
  return (
      <Provider store={store}>
          <SafeAreaView>
              <Back/>
              <Entete/>
              <Ory/>
          </SafeAreaView>
      </Provider>
  )
}

export default category