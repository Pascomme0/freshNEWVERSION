import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator} from 'react-native';
import {styled} from 'nativewind';
import {SafeAreaView} from 'react-native-safe-area-context';
import image from '../../assets/images/user.png';
import Back from '../../components/Back';
import {Provider, useSelector} from "react-redux";
import {store} from "../store";
import {router, useLocalSearchParams} from "expo-router";
import axios from "axios";
const StyledText = styled(Text);


function NoterServiceApp() {
    const url = "https://admin.freshen-up.net"
    const {cmd} = useLocalSearchParams()
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [loadingConf, setLoadingConf] = useState(false);
    const [parsedCmd, setParsedCmd] = useState(cmd ? JSON.parse(cmd) : {});
    const token = useSelector((state) => state.user.token);

    const handleRating = (star) => {
        setRating(star);
    };

    const validate = () => {
        return !!rating;

    }

    const handleSubmit = async () => {
        if (validate()) {
            setLoadingConf(true);
            try {
                let response = "";
                response = await axios.post(`${url}/api/notices`, {
                    rate: +rating,
                    comment: description,
                    document: parsedCmd['@id'],
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Alert.alert("Succès", "Merci de votre coopération")
                router.push('/(tabs2)')
            } catch (AxiosError) {
                Alert.alert('Erreur', "Erreur lors de l'évaluation");
            } finally {
                setLoadingConf(false);
            }
        } else {
            Alert.alert("Erreur", "Une erreur s'est produite ")
        }
    };

    const images = {
        LESSIVE: require('../../assets/images/Lessive.png'),
        MENAGE: require('../../assets/images/Menage.png'),
        DESINSECTISATION: require('../../assets/images/Desinsectisation.png'),
        DERATISATION: require('../../assets/images/Deratisation.png'),
        DESINFECTION: require('../../assets/images/Desinfection.png'),
        LAVAGE: require('../../assets/images/Lavage.png'),
        LAVAGE_AUTO_NORMAL: require('../../assets/images/Lavageauto.png'),
        LAVAGE_AUTO_LUXE: require('../../assets/images/Lavageauto.png'),
        LAVAGE_AUTO_LUXE_PRO: require('../../assets/images/Lavageauto.png'),
        NOUNOU: require('../../assets/images/nounou.png'),
        CUISINIERE: require('../../assets/images/Cuisinière.png'),
        VAISELLE_AFTER_EVENT: require('../../assets/images/Vaisselle.png'),
        RANGEMENT_AFTER_EVENT: require('../../assets/images/Vaisselle.png'),
        VAISSELLE_RANGEMENT_AFTER_EVENT: require('../../assets/images/Vaisselle.png'),
        SERVICE_ENTREPRISE_ECOLE: require('../../assets/images/Menage.png'),
        DEFAULT: require('../../assets/images/Menage.png'),
    };

    const serviceMatch = (service) => {
        return images[service] || images.DEFAULT;
    }

    return (
        <SafeAreaView className="flex-1 bg-white items-center">
            <Back title='Noter le service'/>
            <Image source={serviceMatch(parsedCmd.service.code)} className="w-52 h-52 rounded-lg mt-8"/>
            <Text className="text-blue-500 text-2xl font-bold mt-6 ">{parsedCmd.service.label}</Text>
            <Text className="text-black text-lg mt-6">Que pensez vous de notre service ?</Text>
            <View className="mb-4 w-80">
                <TextInput
                    className="h-20 border border-gray-300 w-full p-2 rounded shadow-sm"
                    placeholder="Remarques ou autres"
                    multiline
                    numberOfLines={5}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <Text className="text-black text-lg mt-6">Quelle est votre note ?</Text>
            <View className="flex-row mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                        <Text
                            className={`text-6xl px-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 w-80 h-12 px-4 py-2 rounded-lg mt-6">
                {loadingConf ? (<ActivityIndicator color="white"/>) : (
                    <Text className="text-white text-lg text-center">Valider</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default function NoterService() {
    return (
        <Provider store={store}>
            <NoterServiceApp/>
        </Provider>
    )
};
