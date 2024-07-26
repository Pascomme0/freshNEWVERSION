import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { categories } from '../constants/categoriesdata';
import { FontAwesome } from '@expo/vector-icons';


export default function CategoriesScreen() {
    const navigation = useNavigation();
    const renderCategory = ({ item }) => (

        <Link href={`../category/Category${item.id}`} asChild className=''>
            <Pressable className="items-center pr-5">
                <View style={{ backgroundColor: 'rgba(43, 187, 104, 0.2)' }} className=' rounded-full w-[60px] h-[60px] items-center justify-center'>
                    <Image source={item.icon} className="w-11 h-11" />
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
            <ScrollView className="" >
                
                <FlatList
                showsHorizontalScrollIndicator={false}
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCategory}
                    className=''
                />
            </ScrollView>
            <Link push href='/category' asChild className=''>
            <Pressable className=" px-2 flex">
                <View className=' flex flex-row items-center justify-end pt-4 pr-3  '>
                    <Text className="text-[#2BBB68] text-[14px] font-semibold pr-2 ">Voir tout</Text> 
                    <FontAwesome name='angle-right' color="#2BBB68" size={14}  className='items-center flex' />
                </View>
            </Pressable>
        </Link>
        </View>
    );
}