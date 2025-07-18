import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../hooks/AuthContext';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="welcome/index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/preference" options={{ headerShown: false }} />
          <Stack.Screen name="home/profile" options={{ headerShown: false }} />
          <Stack.Screen name="home/track" options={{ headerShown: false }} />
          <Stack.Screen name="plan/index" options={{ headerShown: false }} />
          <Stack.Screen name="pland/index" options={{ headerShown: false }} />
          <Stack.Screen name="reg/index" options={{ headerShown: false }} />
          <Stack.Screen name="settings/_layout" options={{ headerShown: false }} />
          <Stack.Screen name="settings/account" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
          <Stack.Screen name="admin/index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
