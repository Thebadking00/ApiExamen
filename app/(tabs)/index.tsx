import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';
import LoginScreen from '../../components/LoginScreen';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleEdit = (user: any) => setSelectedUser(user);
  const handleUserSaved = () => {
    setSelectedUser(null);
    setRefresh(!refresh); // fuerza renderizado del UserList
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          <Text style={styles.title}>CRUD de Usuarios</Text>
          <UserForm selectedUser={selectedUser} onUserSaved={handleUserSaved} />
          <UserList onEdit={handleEdit} key={refresh.toString()} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#FFFFFF', // Aquí establecemos el color blanco
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});