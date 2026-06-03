import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { authService } from '../services/authService';
export function useLogin() { return useMutation({ mutationFn: authService.login, onSuccess: () => router.replace('/(tabs)') }); }
