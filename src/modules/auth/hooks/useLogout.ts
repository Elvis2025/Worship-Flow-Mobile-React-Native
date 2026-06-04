import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { authService } from '../services/authService';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      router.replace('/(auth)/login');
    },
  });
}
