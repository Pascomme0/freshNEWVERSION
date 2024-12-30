import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {Provider, useSelector} from "react-redux";
import {store} from "./store";
import {router} from "expo-router";

function PaymentScreen() {
    const paymentUrl = useSelector((state) => state.user.payLink);
    const [loading, setLoading] = useState(true); // URL de paiement générée par votre backend.

    useEffect(() => {
        if (!paymentUrl) {
            router.push('/(tabs)')
        }
    }, [])

    function handleSuccess(url) {
        Alert.alert("succès", "votre paiement est un succès");
        router.push('/(tabs)')
    }

    function handleFailure(url) {
        Alert.alert("erreur", "votre paiement est échec");
        router.push('/(tabs)')
    }

    return (
        <View style={{flex: 1}}>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2BBB68"/>
                    <Text>Chargement de la page de paiement...</Text>
                </View>
            )}
            <WebView
                source={{uri: paymentUrl}}
                onLoadEnd={() => setLoading(false)}
                onShouldStartLoadWithRequest={(request) => {
                    if (request.url.includes("SUCCESS")) {
                        handleSuccess(request.url);
                        return false;
                    } else if (request.url.includes("ERROR")) {
                        handleFailure(request.url);
                        return false;
                    }
                    else if (request.url.includes("CANCELED")) {
                        handleFailure(request.url);
                        return false;
                    }
                    return true;
                }}
                style={{flex: 1}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});

export default function PaymentScreenApp() {
    return (
        <Provider store={store}>
            <PaymentScreen/>
        </Provider>
    )
};
