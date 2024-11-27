import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ent from '../../components/Ent'
import Profile from '../../components/Profile'
import ProfilSection from '../../components/ProfilSections'
import ProfilSections from '../../components/ProfilSections'


const user = () => {
  return (
    <SafeAreaView>
      <Ent/>
      <Profile/>
      <ProfilSections/>
    </SafeAreaView> 
  )
}
export default user;
