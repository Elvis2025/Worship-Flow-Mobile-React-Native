import NetInfo from '@react-native-community/netinfo';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { authApi } from '../api/authApi';
import { tokenService } from '../services/tokenService';
import { useAuthStore } from '@/stores/authStore';

export function useAuthBootstrap() {
  const isBootstrapping = useAuthStore((state) => state.isBootstrapping);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const store = useAuthStore.getState();
      const refreshToken = tokenService.getRefreshToken();

      if (!refreshToken) {
        store.clearSession();
        store.setBootstrapping(false);
        router.replace('/(auth)/login');
        return;
      }

      try {
        const network = await NetInfo.fetch();

        if (network.isConnected && tokenService.shouldRefreshToken()) {
          const session = await authApi.refresh(refreshToken);
          store.setSession(session);
        }

        if (network.isConnected) {
          const user = await authApi.me();
          store.updateCurrentUser(user);
        }

        if (isMounted && useAuthStore.getState().isAuthenticated) {
          router.replace('/(tabs)');
        }
      } catch {
        store.clearSession();
        if (isMounted) router.replace('/(auth)/login');
      } finally {
        if (isMounted) useAuthStore.getState().setBootstrapping(false);
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isBootstrapping, isAuthenticated };
}
