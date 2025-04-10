import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

function UserForm({ selectedUser, onUserSaved }) {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (selectedUser) setUser(selectedUser);
  }, [selectedUser]);

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    if (user.id) {
      await axios.put(`http://localhost:5000/usuarios/${user.id}`, user);
    } else {
      await axios.post('http://localhost:5000/usuarios', user);
    }
    setUser({ name: '', email: '', password: '' });
    onUserSaved();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{user.id ? 'Editar Usuario' : 'Crear Usuario'}</Text>
      <TextInput
        placeholder="Nombre"
        value={user.name}
        onChangeText={(text) => handleChange('name', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={user.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title={user.id ? 'Actualizar' : 'Crear'} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
    form: {
      padding: 10,
      backgroundColor: '#FFFFFF', // Fondo blanco
      borderRadius: 10, // Opcional: Esquinas redondeadas
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center', // Centrar título
    },
  });

export default UserForm;
