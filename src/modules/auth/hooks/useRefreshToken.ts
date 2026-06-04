import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '@/stores/authStore';

export function useRefreshToken() {
  return useMutation({
    mutationFn: authApi.refresh,
    onSuccess: (session) => useAuthStore.getState().setSession(session),
  });
}
