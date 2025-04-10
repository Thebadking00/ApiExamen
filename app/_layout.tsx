import { Stack } from 'expo-router';
import { useState } from 'react';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </>
      )}
    </Stack>
  );
}
