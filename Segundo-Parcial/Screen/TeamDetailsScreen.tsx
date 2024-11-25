import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TextInput } from 'react-native';
import { deleteTeam, updateTeam } from '../api/apiservices';

export default function TeamDetailsScreen({ route, navigation }) {
  const { team } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTeam, setUpdatedTeam] = useState({ ...team });

  const handleDelete = async () => {
    try {
      await deleteTeam(team.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting selecion:', error);
    }
  }

  const handleSaveEdit = async () => {
    try {
      await updateTeam(team.id, updatedTeam);
      setIsEditing(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedTeam((prev) => ({
      ...prev,
      [field]: field === 'goals' || field === 'points' ? parseInt(value, 10) : value,
    }));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: team.logo }} style={styles.image} />
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={updatedTeam.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={updatedTeam.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Descripcion"
          />
          <TextInput
            style={styles.input}
            value={String(updatedTeam.goals)}
            onChangeText={(text) => handleChange('goals', text)}
            placeholder="Goles"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={String(updatedTeam.points)}
            onChangeText={(text) => handleChange('points', text)}
            placeholder="Puntos"
            keyboardType="numeric"
          />
          <Button title="Guardar Cambios" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{team.name}</Text>
          <Text>{team.description}</Text>
          <Text>Goles: {team.goals}</Text>
          <Text>Puntos: {team.points}</Text>
          <Button title="Edit" onPress={() => setIsEditing(true)} />
          <Button title="Delete" color="red" onPress={handleDelete} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  image: { width: 100, height: 100 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});
