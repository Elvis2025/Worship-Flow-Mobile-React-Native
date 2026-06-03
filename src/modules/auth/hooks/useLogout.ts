import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { authService } from '../services/authService';
export function useLogout() { return useMutation({ mutationFn: authService.logout, onSuccess: () => router.replace('/(auth)/login') }); }
