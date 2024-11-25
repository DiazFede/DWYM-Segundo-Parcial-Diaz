import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button, Modal, TextInput, 
  KeyboardAvoidingView, Platform, Pressable 
} from 'react-native';
import { fetchTeams, addTeam } from '../api/apiservices';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function TeamsScreen() {
  const [teams, setTeams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', description: '', goals: 0, points: 0, logo: '' });
  const [sortedTeams, setSortedTeams] = useState([]);
  const [isSorted, setIsSorted] = useState(false); 
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data);
        setSortedTeams(data); 
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    getTeams();
  }, [isFocused]);

  const renderTeam = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalles de la seleccion', { team: item })}>
      <View style={styles.teamContainer}>
        <Image 
          source={{ uri: item.logo}}
          style={styles.image} 
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.points}>Puntos: {item.points}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddTeam = async () => {
    const teamToAdd = {
      ...newTeam,
      logo: newTeam.logo
    };

    try {
      await addTeam(teamToAdd);
      setModalVisible(false);
      setNewTeam({ name: '', description: '', goals: 0, points: 0, logo: '' });
      const data = await fetchTeams();
      setTeams(data);
      setSortedTeams(data);
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  const handleSortByPuntos = () => {
    const sorted = [...teams].sort((a, b) => b.points - a.points);
    setTeams(sorted);
    setIsSorted(true);
  };

  const handleResetearOrder = () => {
    setTeams(sortedTeams); 
    setIsSorted(false);
  };

  return (
    <View style={styles.container}>
      <View style={Platform.OS === 'android' ? styles.addButtonAndroid : styles.addButtonIOS}>
        <Pressable 
          onPress={() => setModalVisible(true)} 
          style={Platform.OS === 'android' ? styles.buttonAndroid : styles.buttonIOS}
        >
          <Text style={Platform.OS === 'android' ? styles.buttonTextAndroid : styles.buttonTextIOS}>
            {Platform.OS === 'android' ? 'Nuevo equipo' : 'Crear Equipo'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.sortButtons}>
        <Button 
          title="Ordenar por puntos" 
          onPress={handleSortByPuntos} 
          disabled={isSorted}
        />
        <Button 
          title="Restablecer orden" 
          onPress={handleResetearOrder} 
          disabled={!isSorted}
        />
      </View>
      <FlatList
        data={teams}
        renderItem={renderTeam}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalView}
        >
          <TextInput
            placeholder="Seleccion"
            value={newTeam.name}
            onChangeText={(text) => setNewTeam({ ...newTeam, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripcion"
            value={newTeam.description}
            onChangeText={(text) => setNewTeam({ ...newTeam, description: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Goles"
            value={String(newTeam.goals)}
            onChangeText={(text) => setNewTeam({ ...newTeam, goals: parseInt(text, 10) })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Puntos"
            value={String(newTeam.points)}
            onChangeText={(text) => setNewTeam({ ...newTeam, points: parseInt(text, 10) })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Logo"
            value={newTeam.logo}
            onChangeText={(text) => setNewTeam({ ...newTeam, logo: text })}
            style={styles.input}
          />
          <Button title="Agregar Seleccion" onPress={handleAddTeam} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  teamContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  image: { width: 50, height: 50, marginRight: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  points: { fontSize: 16, color: 'gray', marginLeft: 20 },
  modalView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 10, width: 200, paddingHorizontal: 10 },
  sortButtons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  addButtonAndroid: { alignItems: 'flex-start', marginVertical: 10 },
  addButtonIOS: { alignItems: 'flex-end', marginVertical: 10 },
  buttonAndroid: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonIOS: { backgroundColor: 'green', padding: 10, borderRadius: 5 },
  buttonTextAndroid: { color: 'white', fontWeight: 'bold' },
  buttonTextIOS: { color: 'black', fontWeight: 'bold' },
});
