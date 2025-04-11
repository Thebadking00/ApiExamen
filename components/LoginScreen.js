import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://18.116.19.232/usuarios'); // Conexión al endpoint de usuarios
      if (response.ok) {
        const users = await response.json(); // Obtener la lista de usuarios
        const foundUser = users.find(user => user.email === email && user.password === password);
        
        if (foundUser) {
          Alert.alert('Éxito', `Bienvenido ${foundUser.name}`);
          onLogin();
        } else {
          Alert.alert('Error', 'Credenciales incorrectas');
        }
      } else {
        Alert.alert('Error', 'No se pudo obtener la lista de usuarios');
      }
    } catch (err) {
      Alert.alert('Error', `No se pudo conectar al servidor: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
});

export default LoginScreen;