import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entete1 from '../../components/Entete1'
import Profile from '../../components/Profile'
import ProfilSectionsService from '../../components/ProfilSectionsService'

const user = () => {
  return (
    <SafeAreaView className = 'bg-white'>
      <Entete1/>
      <Profile/>
      <ProfilSectionsService/>
    </SafeAreaView> 
  )
}
export default user;