import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styled } from 'nativewind';
import prod from '../assets/images/prod.png'
import { ScrollView } from 'react-native';
import { Link } from 'expo-router';

const Item = styled(View, 'flex flex-row items-center justify-between bg-gray-200 p-4 mb-2 rounded-md w-[90%]');
const ItemInfo = styled(View, 'flex flex-row items-cente');
const ItemImage = styled(Image, 'w-16 h-16 mr-4 rounded-md');
const ItemDetails = styled(View);
const ItemName = styled(Text, 'text-md font-semibold');
const ItemPrice = styled(Text, 'text-gray-500 text-[12px] py-2');
const QuantityContainer = styled(View, 'flex flex-row items-center');
const QuantityButton = styled(Pressable, 'p-2 bg-gray-300 rounded-md ');
const QuantityText = styled(Text, 'mx-4 text-lg font-semibold');

const ShoppingCart = () => {
  const [items, setItems] = useState([
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod},
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri:prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod},
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
  ]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = newQuantity;
    setItems(updatedItems);
  };

  return (
    <ScrollView showsVerticalScrollIndicato={false} >
    <View className="py-4  justify-center items-center">
      
      {items.map((item, index) => (
        <Item key={index}>
          <ItemInfo>
            <ItemImage source={item.imageUri} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemPrice >{item.price} F CFA</ItemPrice>
            </ItemDetails>
          </ItemInfo>
          <QuantityContainer>
            <QuantityButton
              disabled={item.quantity === 1}
              onPress={() => handleQuantityChange(index, item.quantity - 1)}
            >
              <Text className="text-md font-bold">-</Text>
            </QuantityButton>
            <QuantityText>{item.quantity}</QuantityText>
            <QuantityButton onPress={() => handleQuantityChange(index, item.quantity + 1)}>
              <Text className="text-md ">+</Text>
            </QuantityButton>
          </QuantityContainer>
        </Item>
      ))}
      
      <Link push href="/paiement/Paiement" asChild>
        <Pressable style={{ backgroundColor: 'rgba(43, 187, 104, 1)', borderRadius: 8 }} className="w-[284px] p-2 my-6 justify-center">
          <Text className="text-white text-lg  text-center font-bold">Valider mon panier</Text>
        </Pressable>
        </Link>
    </View>
    </ScrollView>
  );
};

export default ShoppingCart;