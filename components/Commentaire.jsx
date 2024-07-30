import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { TailwindProvider } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons'; // Pour les icônes d'étoiles et le crayon
import { BlurView } from 'expo-blur'; // Pour flouter l'arrière-plan

const Commentaire = () => {
  const [commentaires, setCommentaires] = useState([
    { id: 1, nom: 'Ange Roddy', date: '20/02/2024', texte: 'Lorem ipsum dolor sit...', note: 4 },
    // Ajoutez d'autres commentaires ici
  ]);

  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [nouvelleNote, setNouvelleNote] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAjouterCommentaire = () => {
    setModalVisible(true);
  };

  const handleConfirmerCommentaire = () => {
    const newComment = {
      id: commentaires.length + 1,
      nom: 'Nouvel utilisateur',
      date: new Date().toLocaleDateString(),
      texte: nouveauCommentaire,
      note: nouvelleNote,
    };
    setCommentaires([...commentaires, newComment]);
    setNouveauCommentaire('');
    setNouvelleNote(0);
    setModalVisible(false);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity key={index} onPress={() => setNouvelleNote(index + 1)}>
        <FontAwesome
          name={index < nouvelleNote ? 'star' : 'star-o'}
          size={32}
          color={index < nouvelleNote ? 'gold' : 'gray'}
        />
      </TouchableOpacity>
    ));
  };

  return (
      <View className="flex h-screen p-4 mb-4 bg-gray-100">
        {/* Section Commentaires */}
        <ScrollView   className="flex-1  ">
          {commentaires.map(commentaire => (
            <View key={commentaire.id} className="p-4 border border-gray-200 mb-4 rounded-xl">
              <Text className="font-bold">{commentaire.nom}</Text>
              <Text className="text-gray-500">{commentaire.date}</Text>
              <Text>Note: {commentaire.note} ⭐</Text>
              <Text>{commentaire.texte}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Bouton flottant pour ajouter un commentaire */}
        <TouchableOpacity
          onPress={handleAjouterCommentaire}
          style={{
            position: 'absolute',
            bottom: 340,
            right: 0,
            left: 280,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#2BBB68',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <FontAwesome name="pencil" size={24} color="white" />
        </TouchableOpacity>

        {/* Modal pour la note */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <BlurView intensity={160} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View className="bg-white p-4 rounded-lg w-4/5 shadow-2xl border border-gray-400">
              <Text className="text-lg font-bold mb-4">Quelle est votre note ?</Text>
              <View className="flex-row justify-center mb-4">
                {renderStars()}
              </View>
              <TextInput
                value={nouveauCommentaire}
                onChangeText={setNouveauCommentaire}
                placeholder="Mon avis"
                className="p-2 border border-gray-300 rounded-lg mb-4"
                multiline
              />
              <Button title="Laisser votre avis" onPress={handleConfirmerCommentaire} />
              <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-2">
                <Text className="text-center text-blue-500">Annuler</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </View>
  );
};

export default Commentaire;
