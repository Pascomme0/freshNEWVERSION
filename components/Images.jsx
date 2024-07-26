import { View, Text, Image } from 'react-native'
import React from 'react'

const Images = () => {
  return (
    <View className='w-full h-[220px] pb-4'>
      <Text className="font-bold text-[19px] pb-3">Bon plans</Text>
      <View className='object-cover w-full h-full '>
        <Image className='w-full rounded-md h-full object-cover object-center' source={require('../assets/images/prod.png')} />
      </View>
    </View>
  )
}

export default Images