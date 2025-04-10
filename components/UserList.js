import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

function UserList({ onEdit }) {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('https://18.116.19.232/usuarios');
    setUsuarios(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`https://18.116.19.232/usuarios/${id}`);
    fetchUsers();
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>{item.name} - {item.email}</Text>
      <View style={styles.buttonRow}>
     
        <Button title="Eliminar" onPress={() => deleteUser(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.userList}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign: 'center', // Opcional: Centrar el título
    },
    userItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    userList: {
      padding: 10,
      backgroundColor: '#FFFFFF', // Fondo blanco
      borderRadius: 10, // Opcional: Bordes redondeados
    },
  });
export default UserList;
