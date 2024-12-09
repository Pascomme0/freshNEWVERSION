import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import logo from '../assets/images/fresh.png';
import {Link, useRouter} from 'expo-router';
import {Provider, useDispatch} from "react-redux";
import {store} from "./store";
import axios from "axios";
import {setToken, setUser} from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginApp() {
  const [showPassword, setShowPassword] = useState(false);
  const url = "https://admin.freshen-up.net";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(url + '/api/login', {
        username,
        password,
      });
      const token = response.data.token;
      dispatch(setToken(token));

      const userResponse = await axios.get(url + '/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userResponse.data["hydra:member"][0];
      await AsyncStorage.setItem('credentials', JSON.stringify({ username, password, token }));
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      dispatch(setUser(userData));
      dispatch(setToken(token));
      router.replace('/service');
    } catch (error) {
      Alert.alert('Erreur', 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const checkUser = async () => {
      const credentials = await AsyncStorage.getItem('credentials');
      if (credentials) {
        const { username, password, token } = JSON.parse(credentials);
        await handleLogin(username, password);
      }
    };
    checkUser();
  }, []);

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
                value={username}
                onChangeText={(value) => setUsername(value)}
                placeholder="Mail"
                className="w-full bg-gray-100 rounded-md p-4 text-base"
            />

            <View className="relative">
              <TextInput
                  value={password}
                  onChangeText={(value) => setPassword(value)}
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

            <TouchableOpacity className="bg-blue-500 rounded-md p-4" onPress={() => handleLogin(username, password)}>
              {
                loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white text-center font-bold">Login</Text>
                )
              }
            </TouchableOpacity>

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

export default function login() {
  return (
      <Provider store={store}>
        <LoginApp />
      </Provider>
  );
}