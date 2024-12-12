// App.js
import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Pressable,
    Alert,
    ActivityIndicator
} from 'react-native';
import {styled} from 'nativewind';
import img from '../assets/images/prod.png'
import {FontAwesome} from '@expo/vector-icons';
import {Link, useNavigation} from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "../app/store";
import axios from "axios";
import {setCategoriesVentes, setProduits, setProduitsCategorie} from "../app/categorySlice";
import {pushDetailPanier, removeDetailPanier, setDetailPanier} from "../app/panierSlice";

const url = "https://admin.freshen-up.net";


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);

const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'decimal', // Autres options : 'currency', 'percent'
        minimumFractionDigits: 0, // Nombre minimum de décimales
        maximumFractionDigits: 0, // Nombre maximum de décimales
    }).format(number);
}


function DetailCateApp() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.category.produitsCategorie);
    const activeCat = useSelector((state) => state.category.activeCat);
    const detailPanier = useSelector((state) => state.panier.detailPanier);
    const totalHt = useSelector((state) => state.panier.totalHt);
    const adresse = useSelector((state) => state.panier.adresse);
    const paiement = useSelector((state) => state.panier.paiement);
    const totalLivraison = useSelector((state) => state.panier.totalLivraison);

    const ProductCard = ({product}) => (
        <Pressable className="  flex">
            <StyledView className="p-4 bg-white rounded-lg shadow-md mb-4 w-35">
                <StyledImage
                    source={product?.imageProduits?.[0].path ? { uri: url + product?.imageProduits[0].path } : img}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                />
                <StyledText className="mt-2 text-lg font-bold">{product?.libelle}</StyledText>
                <StyledText className="mt-1 text-lg text-green-600">{formatNumber(product?.priceProduits?.[0]?.prixUnitaire)} FCFA</StyledText>
                <StyledButton className={isAdded(product) ? "mt-3 bg-red-500 p-2 rounded-lg" : "mt-3 bg-green-500 p-2 rounded-lg"} onPress={() => addCart(product)}>
                    <StyledText className="text-white text-center">{isAdded(product) ? "Retirer du panier" : "Ajouter au panier"}</StyledText>
                </StyledButton>
            </StyledView>
        </Pressable>

    );

    const isAdded = (product) => {
        return detailPanier.some(item => item.produit.id === product.id);
    }

    const addCart = async (product) => {
        if (isAdded(product)) {
            dispatch(removeDetailPanier(product.id));
        } else {
            const qte = product?.quantity ? product.quantity : 0;
            if (qte === 0) {
                Alert.alert("Erreur", "Rupture de stock")
            } else {
                const dat = {
                    produit: product,
                    quantity: 1
                }
                dispatch(pushDetailPanier(dat));
            }
        }
        const panier = {
            detailPanier
        }
        await AsyncStorage.setItem('panier', JSON.stringify(panier));
    }

    useEffect(() => {

        const initialize = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url + '/api/produits?isVente=1&categorieVente=' + activeCat['@id']);
                const data = response.data["hydra:member"];
                dispatch(setProduitsCategorie(data));
            } catch (error) {
                Alert.alert('Erreur', 'Erreur de récupération');
            } finally {
                setLoading(false);
            }
        };

        const checkPanier = async () => {
            const panier = await AsyncStorage.getItem('panier');
            if (panier) {
                const panierParsed = JSON.parse(panier);
                dispatch(setDetailPanier(panierParsed.detailPanier));
            }
        }
        checkPanier();
        initialize();
    }, []);

    useEffect(() => {
        const savePanierToStorage = async () => {
            try {
                const panier = {
                    adresse,
                    detailPanier,
                    totalHt,
                    paiement,
                    totalLivraison
                }
                await AsyncStorage.setItem('panier', JSON.stringify(panier));
            } catch (error) {
                console.error("Erreur lors de la sauvegarde dans AsyncStorage:", error);
            }
        };
        savePanierToStorage();
    }, [detailPanier, totalHt, totalLivraison]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className=''>
                <View className='items-center pb-6'>
                    <Text className="font-bold text-[19px] pt-3">Produits</Text>
                </View>
                {loading ? (<ActivityIndicator size="large" color="#2BBB68"/>) : null}
                <StyledView style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                    {products.map(product => (
                        <StyledView key={product.id} style={{width: '50%'}}>
                            <ProductCard product={product}/>
                        </StyledView>
                    ))}
                </StyledView>
                <Link href='' asChild className=''>
                    <Pressable className="flex">
                        <View className=' flex flex-row items-center justify-end  pr-3 pb-12  '>
                            <FontAwesome name='arrow-right' color="rgb(37, 99 ,235)" size={10} light
                                         className='items-center flex'/>
                        </View>
                    </Pressable>
                </Link>
            </ScrollView>
        </SafeAreaView>
    )
};

export default function DetailCate() {
    return (
        <Provider store={store}>
            <DetailCateApp/>
        </Provider>
    );
};
