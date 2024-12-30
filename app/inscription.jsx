import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/fresh.png';
import {Link, useRouter} from 'expo-router';
import {Provider, useDispatch} from "react-redux";
import {store} from "./store";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setToken } from './userSlice';
import * as Notifications from "expo-notifications";

function InscriptionApp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    nom: '',
    prenoms: '',
    telephone: '',
    phone2: '',
    password: '',
    confirmPassword: '',
  });
  const url = "https://admin.freshen-up.net";
  const [otp, setOtp] = useState('');
  const [page, setPage] = useState('REGISTER');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const validator = () => {
    return form.email && form.nom && form.prenoms && form.telephone && form.password && form.confirmPassword && (form.password === form.confirmPassword);
  };

  const handlePage = (value) => {
    setPage(value);
  };

  const handleOTPChange = (value) => {
    setOtp(value);
  }

  const registerForPushNotificationsAsync = async (token) => {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Vous ne pourrais pas recevoir les notifications');
      return;
    }
    try {
      const tokenExpo = (await Notifications.getExpoPushTokenAsync()).data;
      const response = await axios.post("https://admin.freshen-up.net/api/users/set_expo_token", {
        expoPushToken: tokenExpo
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (e) {
      Alert.alert("Erreur", "une erreur s'est produite")
    }

  };

  const handleRegistration = async () => {
    setLoading(true);
    try {
      await axios.post(url + '/api/users', {
        'username': form.email,
        'email': form.email,
        'plainPassword': form.password,
        'phone': form.telephone,
        'firstName': form.prenoms,
        'lastName': form.nom,
        'typeUser': "/api/type_users/3"
      });
      setPage('OTP');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite dans le traitement');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpTest = async (username, password, otp) => {
    setLoading(true);
    try {
      const response = await axios.post(url + '/api/users/confirm_phone', {
        'username': username,
        'code': otp,
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

      // Rediriger vers /(tabs)
      await registerForPushNotificationsAsync(token);
      router.push('/service');
    } catch (error) {
      Alert.alert('Erreur', 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  }

  const handleResendOtp = async (username) => {
    setLoading(true);
    try {
      await axios.post(url + '/api/users/send_email_verify_code', {
        'username': username,
      });
      Alert.alert('Succès', 'Code envoyé avec succès');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite');
    } finally {
      setLoading(false);
    }
  }

  const renderOTPPage = () => {
    return (
        <View className="w-full space-y-4">
          <TextInput
              placeholder="Entrez votre code"
              className="w-full bg-gray-100 rounded-md p-4 text-base"
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={(value) => handleOTPChange(value)}
          />

          <TouchableOpacity className="bg-blue-500 rounded-md p-4" onPress={() => handleOtpTest(form.email, form.password, otp)}>
            {
              loading ? (
                  <ActivityIndicator color="white" />
              ) : (
                  <Text className="text-white text-center font-bold">Valider</Text>
              )
            }
          </TouchableOpacity>
        </View>
    );
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
      <SafeAreaView className="flex-1 bg-white p-4">
        <View className="flex-1 justify-center items-center">
          <Image
              source={logo}
              className="w-48 h-48 mb-4"
              resizeMode="contain"
          />
          {
            page === 'OTP' ? renderOTPPage() : (
                <View className="w-full space-y-4">
                  <TextInput
                      placeholder="Mail"
                      className="w-full bg-gray-100 rounded-md p-4 text-base"
                      value={form.email} onChangeText={(value) => handleInputChange('email', value)}
                  />
                  <TextInput
                      placeholder="Telephone"
                      keyboardType="phone-pad"
                      value={form.telephone} onChangeText={(value) => handleInputChange('telephone', value)}
                      className="w-full bg-gray-100 rounded-md p-4 text-base"
                  />
                  <TextInput
                      placeholder="Nom"
                      className="w-full bg-gray-100 rounded-md p-4 text-base"
                      value={form.nom} onChangeText={(value) => handleInputChange('nom', value)}
                  />
                  <TextInput
                      placeholder="Prenoms"
                      className="w-full bg-gray-100 rounded-md p-4 text-base"
                      value={form.prenoms} onChangeText={(value) => handleInputChange('prenoms', value)}
                  />

                  <View className="relative">
                    <TextInput
                        placeholder="Mot de passe"
                        secureTextEntry={!showPassword}
                        className="w-full bg-gray-100 rounded-md p-4 pr-12 text-base"
                        value={form.password} onChangeText={(value) => handleInputChange('password', value)}password
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

                  <View className="relative">
                    <TextInput
                        placeholder="Confirmer mot de passe"
                        secureTextEntry={!showConfirmPassword}
                        className="w-full bg-gray-100 rounded-md p-4 pr-12 text-base"
                        value={form.confirmPassword} onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    />
                    <TouchableOpacity
                        onPress={toggleConfirmPasswordVisibility}
                        className="absolute right-4 top-4"
                    >
                      <Ionicons
                          name={showConfirmPassword ? "eye-off" : "eye"}
                          size={24}
                          color="gray"
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity className="bg-blue-500 rounded-md p-4" onPress={() => handleRegistration()}>
                    {
                      loading ? (
                          <ActivityIndicator color="white" />
                      ) : (
                          <Text className="text-white text-center font-bold">S'inscrire</Text>
                      )
                    }
                  </TouchableOpacity>
                </View>
            )
          }

          <View className="flex-row mt-8">
            <Text className="text-gray-600">{page === "REGISTER" ? "Déjà un compte ?" : "Vous n'avez pas reçu de code ?"} </Text>
            {
              page === "REGISTER" ? (
                  <Link replace href={"/login"} asChild>
                    <TouchableOpacity>
                      <Text className="text-blue-500 font-bold"> Se connecter </Text>
                    </TouchableOpacity>
                  </Link>
              ) : (
                  <TouchableOpacity onPress={() => handleResendOtp(form.email)}>
                    <Text className="text-blue-500 font-bold"> Renvoyer </Text>
                  </TouchableOpacity>
              )
            }

          </View>
        </View>
      </SafeAreaView>
  );
}

export default function inscription() {
  return (
      <Provider store={store}>
        <InscriptionApp />
      </Provider>
  )
}