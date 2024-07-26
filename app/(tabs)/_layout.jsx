// app/_layout.js
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:false,headerShadowVisible:false,
        tabBarStyle: {
          backgroundColor: '#ffffff', // Couleur de fond de la barre de navigation
          borderTopWidth: 0, // Supprimer la bordure supérieure
          height: 60, // Hauteur de la barre de navigation
          paddingBottom: 10, // Padding en bas pour les icônes
          paddingTop: 10, // Padding en haut pour les icônes
        },
        tabBarActiveTintColor: '#6200ea', // Couleur des icônes actives
        tabBarInactiveTintColor: '#828282', // Couleur des icônes inactives
        tabBarShowLabel: false, // Cacher les labels des onglets
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color,size}) => (
            <FontAwesome name="home" color={color} size={size } />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-bag" color={color} size={size } />
          ),
        }}
      />
      <Tabs.Screen
        name="alerte"
        options={{
          title: 'Alerte',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
