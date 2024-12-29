import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import { styled } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import {Provider, useSelector} from "react-redux";
import {store} from "../app/store";
import axios from "axios";
import {Link} from "expo-router";

const Notification = styled(View, 'flex-row items-center p-4 rounded-lg mb-3');
const NotificationText = styled(Text, 'ml-2 text-green-700');
const NotificationIconWrapper = styled(View, 'w-6 h-6 items-center justify-center');

const NotificationItem = ({ item, backgroundColor = 'rgba(43, 187, 104, 0.1)' }) => {
    const to = item.document.typeDocument.code === "DEMANDE_SERVICE" ? "'/ProfilePages/SuiviComService'" : "/ProfilePages/SuiviCom"
    const isService = (item.document.typeDocument.code === "DEMANDE_SERVICE");
    return !isService && (
        <Link href={to}>
            <Notification style={{ backgroundColor }}>
                <NotificationIconWrapper>
                    <FontAwesome name="bell" size={24} color="#34D399" />
                </NotificationIconWrapper>
                <NotificationText>{item}</NotificationText>
            </Notification>
        </Link>
    );
};

function NotificationsServiceApp() {
    const [notifications, setNotifications] = useState([])
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const url = "https://admin.freshen-up.net";
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url + `/api/notifications?destinataire=${user['@id']}&unread=true`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setNotifications(response.data['hydra:member']);
            } catch (AxiosError) {
                Alert.alert("erreur", "Une erreur s'est produite")
            } finally {
                setLoading(false);
            }

        }
        init();
    }, [])

    return loading ? (
        <ActivityIndicator className="mt-5" color="blue"/>
    ) : (
        <View className="p-4">
            {notifications.map((item, index) => (
                <NotificationItem
                    key={index}
                    message={item}
                    backgroundColor='rgba(43, 187, 104, 0.1)'
                />
            ))}
        </View>
    );
};

export default function NotificationsService() {
    return (
        <Provider store={store}>
            <NotificationsServiceApp/>
        </Provider>
    )
};
