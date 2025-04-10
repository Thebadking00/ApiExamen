import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function RegisterScreen({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const res = await fetch('http://TU_IP_LOCAL:5000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        Alert.alert('Registrado correctamente');
        onRegister();
      } else {
        Alert.alert('Error al registrar');
      }
    } catch {
      Alert.alert('Error de conexión');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nombre</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1 }} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1 }} />
      <Text>Contraseña</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1 }} />
      <Button title="Registrarse" onPress={register} />
    </View>
  );
}
