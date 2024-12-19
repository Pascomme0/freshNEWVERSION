import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import prod from '../assets/images/prod.png'


const products = [
  {
    id: 1,
    name: 'Spray toilettes',
    price: '5000 F',
    status: 'En cours de livraison',
    statusColor: 'bg-yellow-500',
    image: prod,
    lien: 'Encours'
  },
  {
    id: 2,
    name: 'Spray toilettes',
    price: '5000 F',
    status: 'Non expédié',
    statusColor: 'bg-red-500',
    image: prod,
    lien: 'NonExp'
  },
  {
    id: 3,
    name: 'Spray toilettes',
    price: '5000 F',
    status: 'Prêt pour récupération',
    statusColor: 'bg-green-500',
    image: prod,
    lien: 'Recup'
  },
];

const ProductCard = styled(TouchableOpacity, 'flex-row items-center  rounded-lg  shadow-md py-4 mb-4 ');
const ProductImage = styled(Image, 'w-20 h-20 rounded-md');
const ProductInfo = styled(View, 'flex-1 mr-2');
const ProductName = styled(Text, 'text-md font-bold');
const ProductPrice = styled(Text, 'text-[12px] text-gray-600 py-1');
const ProductStatus = styled(View, 'py-1 px-2 rounded-md');
const ProductStatusText = styled(Text, 'text-white text-center text-md');
import {router, useRouter} from 'expo-router';
import { Link } from 'expo-router';
import {Provider, useSelector} from "react-redux";
import {store} from "../app/store";
import axios from "axios";

function SuiviCmdApp() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.token);
  const url = "https://admin.freshen-up.net";

  const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal', // Autres options : 'currency', 'percent'
      minimumFractionDigits: 0, // Nombre minimum de décimales
      maximumFractionDigits: 0, // Nombre maximum de décimales
    }).format(number);
  }

  const handleDetailCme = (cmd) => {
    router.push({
      pathname: '/ProfilePages/DetailCom',
      params: {
        cmd: JSON.stringify(cmd),
      },
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`${url}/api/documents?typeDocument=/api/type_documents/1&status[]=VALIDATED&status[]=CANCELED&status[]=ON_DELIVERING&status[]=DELIVERED`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCommandes(response.data['hydra:member']);
      setLoading(false);
    };
    fetchData();
  }, []);
  return loading ? (<ActivityIndicator size="large" color="blue" />) : (
      <ScrollView className="p-4 bg-gray-100">
        {commandes.map((cmd) => (
            <ProductCard key={cmd.id} onPress={() => handleDetailCme(cmd)} >
              <ProductImage source={{uri: url + cmd.detailDocuments[0].produit.imageProduits[0].path}} />
              <View className="flex-column ml-4">
                <ProductInfo>
                  <ProductName>Commande {cmd.reference}</ProductName>
                  <ProductPrice>{formatNumber(cmd.montantTotal)} F CFA</ProductPrice>
                </ProductInfo>
                <ProductStatus className={(cmd?.status ==='VALIDATED' ? "bg-green-500" : (cmd?.status === 'ON_DELIVERING' ? "bg-yellow-500" : (cmd?.status === "DELIVERED"? "bg-green-500" : "bg-red-500")))}>
                  <ProductStatusText>{(cmd?.status ==='VALIDATED' ? "Confirmée" : (cmd?.status === 'ON_DELIVERING' ? "En cours de livraison" : (cmd?.status === "DELIVERED"? "Livrée" : "Annulée")))}</ProductStatusText>
                </ProductStatus>
              </View>
            </ProductCard>
        ))}
      </ScrollView>
      );
};

export default function SuiviCmd() {
  return (
      <Provider store={store}>
        <SuiviCmdApp />
      </Provider>
  )
};