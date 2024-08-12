import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styled } from 'nativewind';
import prod from '../assets/images/prod.png';
import { ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const Item = styled(View, 'flex flex-row items-center justify-between bg-gray-200 p-4 mb-2 rounded-md w-[90%]');
const ItemInfo = styled(View, 'flex-1 flex flex-row items-center pr-2');
const ItemImage = styled(Image, 'w-14 h-14 mr-4 rounded-md');
const ItemDetails = styled(View, 'flex-1');
const ItemName = styled(Text, 'text-md font-semibold');
const ItemPrice = styled(Text, 'text-gray-500 text-[12px] py-1');
const QuantityContainer = styled(View, 'flex flex-row items-center');
const QuantityButton = styled(Pressable, 'p-1 w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center');
const QuantityText = styled(Text, 'mx-2 text-md font-semibold');
const RemoveButton = styled(Pressable, 'ml-4 p-2');

const ShoppingCart = () => {
  const [items, setItems] = useState([
    { name: 'Spray toilettes ', price: 5000, quantity: 1, imageUri: prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
    { name: 'Spray toilettes', price: 5000, quantity: 1, imageUri: prod },
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

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="py-4 justify-center items-center">
        {items.map((item, index) => (
          <Item key={index}>
            <ItemInfo>
              <ItemImage source={item.imageUri} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price} F CFA</ItemPrice>
              </ItemDetails>
            </ItemInfo>
            <QuantityContainer>
              <QuantityButton
                disabled={item.quantity === 1}
                onPress={() => handleQuantityChange(index, item.quantity - 1)}
              >
                <Text className="text-sm font-bold">-</Text>
              </QuantityButton>
              <QuantityText>{item.quantity}</QuantityText>
              <QuantityButton onPress={() => handleQuantityChange(index, item.quantity + 1)}>
                <Text className="text-sm">+</Text>
              </QuantityButton>
            </QuantityContainer>
            <RemoveButton onPress={() => handleRemoveItem(index)}>
              <FontAwesome name="trash" size={20} color="red" />
            </RemoveButton>
          </Item>
        ))}
        <Link push href="/paiement/Paiement" asChild>
          <Pressable style={{ backgroundColor: 'rgba(43, 187, 104, 1)', borderRadius: 8 }} className="w-[284px] p-2 my-6 justify-center">
            <Text className="text-white text-lg text-center font-bold">Valider mon panier</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
};

export default ShoppingCart;
