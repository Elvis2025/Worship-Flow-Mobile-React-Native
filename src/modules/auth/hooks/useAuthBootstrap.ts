import { useEffect } from 'react';
import { router } from 'expo-router';
import { authApi } from '../api/authApi';
import { tokenService } from '../services/tokenService';
import { useAuthStore } from '@/stores/authStore';

export function useAuthBootstrap() {
  const { isBootstrapping, isAuthenticated } = useAuthStore();
  useEffect(() => { let mounted = true; (async () => {
    const store = useAuthStore.getState();
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) { store.clearSession(); store.setBootstrapping(false); router.replace('/(auth)/login'); return; }
    try {
      if (tokenService.shouldRefreshToken()) { const session = await authApi.refresh(refreshToken); store.setSession(session); }
      const me = await authApi.me(); store.updateCurrentUser(me); if (mounted) router.replace('/(tabs)');
    } catch { store.clearSession(); if (mounted) router.replace('/(auth)/login'); }
    finally { if (mounted) useAuthStore.getState().setBootstrapping(false); }
  })(); return () => { mounted = false; }; }, []);
  return { isBootstrapping, isAuthenticated };
}
