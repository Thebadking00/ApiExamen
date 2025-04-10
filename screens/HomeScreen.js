import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function HomeScreen() {
  const [editingUser, setEditingUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (user) => setEditingUser(user);
  const handleFinish = () => {
    setEditingUser(null);
    setRefreshKey(old => old + 1);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <UserForm selectedUser={editingUser} onFinish={handleFinish} />
      <UserList key={refreshKey} onEdit={handleEdit} />
    </ScrollView>
  );
}
