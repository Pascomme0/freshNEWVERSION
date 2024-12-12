import {ActivityIndicator, Alert, FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {Link, router, useNavigation} from 'expo-router';
// import { categories } from '../constants/categoriesdata';
import {FontAwesome} from '@expo/vector-icons';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../app/store";
import axios from "axios";
import {setActiveCat, setCategoriesVentes} from "../app/categorySlice";
import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken, setUser} from "../app/userSlice";

function CategoriesApp() {
    const url = "https://admin.freshen-up.net";
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const categories = useSelector((state) => state.category.categoriesVentes);
    const renderCategory = ({item}) => (

        <Pressable className="items-center pr-5" onPress={() => handleActiveCat(item)}>
            <View style={{backgroundColor: 'rgba(43, 187, 104, 0.2)'}}
                  className=' rounded-full w-[60px] h-[60px] items-center justify-center'>
                <Image source={require('../assets/images/parffum.png')} className="w-11 h-11"/>
            </View>
            <View className='flex '>
                <Text className="text-center  font-light text-[13px] pt-1">{item.libelle}</Text>
            </View>
        </Pressable>
    );

    const handleActiveCat = (cat) => {
        dispatch(setActiveCat(cat));
        router.push(`../category/Category1`)
    }

    useEffect(() => {

        const initialize = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url + '/api/cat_vente_produits');
                const data = response.data["hydra:member"];
                dispatch(setCategoriesVentes(data));
            } catch (error) {
                Alert.alert('Erreur', 'Erreur de récupération');
            } finally {
                setLoading(false);
            }
        };
        initialize();
    }, []);

    return (
        <View className=" pb-4">
            <View className='pb-4 '>
                <Text className='text-[20px] '>Catégories</Text>
            </View>
            <ScrollView className="">
                {loading ? (<ActivityIndicator size="large" color="#2BBB68"/>) : (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={categories}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCategory}
                        className=''
                    />
                )}
            </ScrollView>
            <Link push href='/category' asChild className=''>
                <Pressable className=" px-2 flex">
                    <View className=' flex flex-row items-center justify-end pt-4 pr-3  '>
                        <Text className="text-[#2BBB68] text-[14px] font-semibold pr-2 ">Voir tout</Text>
                        <FontAwesome name='angle-right' color="#2BBB68" size={14} className='items-center flex'/>
                    </View>
                </Pressable>
            </Link>
        </View>
    );
}

export default function CategoriesScreen() {
    return (
        <Provider store={store}>
            <CategoriesApp/>
        </Provider>
    );
}