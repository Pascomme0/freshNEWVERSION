// categories.data.js

// app/_layout.jsx (Expo Router)
import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { service } from '../constants/servicedata';
import { FontAwesome } from '@expo/vector-icons';


export default function CategoriesScreen1() {
    const navigation = useNavigation();
    const renderCategory = ({ item }) => (

        <Link href={item.lien} asChild className=''>
            <Pressable className="items-center pr-5">
                <View style={{ backgroundColor: 'rgba(210, 237, 254, 1)' }} className=' rounded-full w-[60px] h-[60px] items-center justify-center'>
                    <Image source={item.icon} className="justify-center items-center w-8 h-8" />
                </View>
                <View className='flex '>
                <Text className="text-center  font-light text-[13px] pt-1">{item.label}</Text>
                </View>
            </Pressable>
        </Link>
    );

    return (
        <View className=" pb-4">
            <View className='pb-4 '>
                <Text className='text-[20px] '>Catégories</Text>
            </View>
            <ScrollView className="" showsHorizontalScrollIndicator={false}>
                <FlatList
                    horizontal
                    data={service}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCategory}
                    showsHorizontalScrollIndicator={false}

                    className=''
                />
            </ScrollView>
            <Link push href='/categoryservice' asChild className=''>
            <Pressable className=" px-2 flex">
                <View className=' flex flex-row items-center justify-end pt-4 pr-3  '>
                    <Text className="text-blue-600 text-[14px] font-semibold pr-2 ">Voir tout</Text> 
                    <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10}  light className='items-center flex' />
                </View>
            </Pressable>
        </Link>
        </View>
    );
}