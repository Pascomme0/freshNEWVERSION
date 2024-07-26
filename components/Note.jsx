import { View, Text } from 'react-native'
import React from 'react'

const Note = () => {
  return (
    <View className='mt-4 mb-3 '>
      <View className='justify-center items-center'>
        <Text className='text-center text-[90px]'>4.5</Text>
        <Text className="text-yellow-500 text-center text-3xl">★★★★☆</Text>
        <Text className='text-center text-gray-400 text-[16px] pt-3'>20 avis</Text>
      </View>
    </View>
  )
}
export default Note