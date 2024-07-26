import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <Stack screenOptions={{title:"Freshenup&Co",headerShown:false,headerShadowVisible:false}}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(tabs2)' />
      <Stack.Screen name='Avis' />

    </Stack>
  );
}

