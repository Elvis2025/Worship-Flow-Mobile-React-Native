import NetInfo from '@react-native-community/netinfo';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { userLocalRepository } from '@/modules/users/database/userLocalRepository';
import { mapAuthUserToUserDto } from '@/modules/users/utils/authUserMapper';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';

export function useAuthBootstrap() {
  const isBootstrapping = useAuthStore((state) => state.isBootstrapping);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const store = useAuthStore.getState();
      const refreshToken = tokenService.getRefreshToken();
      const savedUser = tokenService.getSavedUser();

      if (!refreshToken) {
        store.clearSession();
        store.setBootstrapping(false);
        router.replace('/(auth)/login');
        return;
      }

      if (savedUser) {
        store.setCurrentUser(savedUser);
        await userLocalRepository.upsertUser(mapAuthUserToUserDto(savedUser), false).catch(() => undefined);
      }

      try {
        const network = await NetInfo.fetch();

        if (network.isConnected && tokenService.shouldRefreshToken()) {
          await authService.refresh(refreshToken);
        }

        if (network.isConnected) {
          await authService.loadMe();
        }

        if (isMounted && useAuthStore.getState().isAuthenticated) {
          router.replace('/(tabs)');
        }
      } catch {
        if (!savedUser) {
          store.clearSession();
          if (isMounted) router.replace('/(auth)/login');
          return;
        }

        if (isMounted) router.replace('/(tabs)');
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
