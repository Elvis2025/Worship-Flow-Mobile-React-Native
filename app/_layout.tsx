import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthBootstrap } from '@/modules/auth/hooks/useAuthBootstrap';
import { colors } from '@/theme/colors';

function RootNavigator() { const { isBootstrapping } = useAuthBootstrap(); if (isBootstrapping) return <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={colors.primary} /></View>; return <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text, contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="(auth)" options={{ headerShown: false }} /><Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="users/[id]" options={{ title: 'Detalle' }} /><Stack.Screen name="users/create" options={{ title: 'Crear usuario' }} /><Stack.Screen name="users/edit/[id]" options={{ title: 'Editar usuario' }} /><Stack.Screen name="users/availability/[id]" options={{ title: 'Disponibilidad' }} /><Stack.Screen name="profile/index" options={{ title: 'Mi perfil' }} /><Stack.Screen name="profile/edit" options={{ title: 'Editar perfil' }} /></Stack>; }
export default function Layout() { const queryClient = useMemo(() => new QueryClient(), []); return <QueryClientProvider client={queryClient}><RootNavigator /></QueryClientProvider>; }
