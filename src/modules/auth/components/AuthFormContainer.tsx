import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
export function AuthFormContainer({ children }: PropsWithChildren) { return <LinearGradient colors={['#090B1A', '#141B3D', '#271449']} style={{ flex: 1 }}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}><ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>{children}</ScrollView></KeyboardAvoidingView></LinearGradient>; }
