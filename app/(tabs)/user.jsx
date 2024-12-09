import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ent from '../../components/Ent'
import Profile from '../../components/Profile'
import ProfilSection from '../../components/ProfilSections'
import ProfilSections from '../../components/ProfilSections'
import { store } from '../store';
import {Provider} from "react-redux";

function App() {
    return (
        <SafeAreaView>
        <Ent/>
        <Profile/>
        <ProfilSections/>
        </SafeAreaView>
    )
}
export default function user() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
