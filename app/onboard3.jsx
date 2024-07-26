import { Button, Image, ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Link } from "expo-router";

export default function Index() {
  const inset = useSafeAreaInsets()
  return (
    <SafeAreaProvider>
      <View style={{ paddingTop: inset.top }} className="flex flex-col   bg-white h-screen">
        <View className="w-full h-[60%] flex items-center ">
          <ImageBackground resizeMode="cover" className="w-full h-full items-center" source={require('@/assets/images/Shop.png')}></ImageBackground>
        </View>

        <View className=" h-[50%] flex flex-col bg-white rounded-t-2xl px-4 w-full">
          <View className="mt-10">
            <Text className="text-center text-[20px]  tracking-widest font-bold">
              Faites des achats en toute
            </Text>
            <Text className="text-center text-[20px]  tracking-widest font-bold ">
              sécurité
            </Text>
          </View>
          <View className=" z-50 fixed flex flex-row  items-center mt-[20%] justify-around  pt-6">
          <Link replace href={"/onboard2"} asChild>
              <Pressable>
                <View className="rounded-md px-4 w-[72px] h-[52px] text-white  mt-5 bg-[#1DA6F8] flex items-center justify-center mb-4">
                  <FontAwesome name="arrow-left" size={20} color="white" light />
                </View>
              </Pressable>
            </Link>
            <View className="flex flex-row gap-2  justify-center ">  
              <View className="w-[8px] rounded-xl bg-slate-300 h-[8px"></View>
              <View className="w-[8px] rounded-xl bg-slate-300 h-[8px]"></View>
              <View className="w-[15px] rounded-md bg-blue-300 h-[8px]"></View>
              <View className="w-[8px] rounded-xl bg-slate-300 h-[8px]"></View>


            </View>
            <Link replace href={"/onboard4"} asChild>
              <Pressable>
                <View className="rounded-md px-4 w-[72px] h-[52px] text-white  mt-5 bg-[#1DA6F8] flex items-center justify-center mb-4">
                  <FontAwesome name="arrow-right" size={20} color="white" light />
                </View>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
