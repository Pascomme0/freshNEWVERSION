import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons'; // Bibliothèque pour les icônes

export default function TopBar({ title }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 25
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
