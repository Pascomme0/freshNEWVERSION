import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import logo from '../assets/images/fresh.png';
import { Link } from 'expo-router';

export default function login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-1 justify-center items-center">
        <Image
          source={logo}
          className="w-40 h-28 mb-8"
          resizeMode="contain"
        />
        
        <View className="w-full space-y-4">
          <TextInput
            placeholder="Mail"
            className="w-full bg-gray-100 rounded-md p-4 text-base"
          />
          
          <View className="relative">
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              className="w-full bg-gray-100 rounded-md p-4 pr-12 text-base"
            />
            <TouchableOpacity 
              onPress={togglePasswordVisibility}
              className="absolute right-4 top-4"
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="gray" 
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity>
            <Text className="text-right text-blue-500">Mot de passe oublié?</Text>
          </TouchableOpacity>

          <Link replace href={"/service"} asChild>
          <TouchableOpacity className="bg-blue-500 rounded-md p-4">
            <Text className="text-white text-center font-bold">Login</Text>
          </TouchableOpacity>
          </Link>

        </View>
        
        <View className="flex-row mt-8">
          <Text className="text-gray-600">Pas de compte ? </Text>
          <Link replace href={"/inscription"} asChild>
          <TouchableOpacity >
            <Text className="text-blue-500 font-bold">S'inscrire </Text>
          </TouchableOpacity>
          </Link>
      
        </View>
      </View>
    </SafeAreaView>
  );
}