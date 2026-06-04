import { mapAuthUserToUserDto } from '@/modules/users/utils/authUserMapper';
import { userLocalRepository } from '@/modules/users/database/userLocalRepository';
import { useAuthStore } from '@/stores/authStore';
import { authApi } from '../api/authApi';
import { LoginRequest } from '../types/auth.types';

async function cacheAuthenticatedUser(user: Parameters<typeof mapAuthUserToUserDto>[0]): Promise<void> {
  await userLocalRepository.upsertUser(mapAuthUserToUserDto(user), false);
}

export const authService = {
  async login(request: LoginRequest) {
    const session = await authApi.login(request);
    useAuthStore.getState().setSession(session);
    await cacheAuthenticatedUser(session.user);
    return session;
  },

  async logout() {
    await authApi.logout().catch(() => undefined);
    useAuthStore.getState().clearSession();
  },

  async refresh(refreshToken: string) {
    const session = await authApi.refresh(refreshToken);
    useAuthStore.getState().setSession(session);
    await cacheAuthenticatedUser(session.user);
    return session;
  },

  async loadMe() {
    const user = await authApi.me();
    useAuthStore.getState().setCurrentUser(user);
    await cacheAuthenticatedUser(user);
    return user;
  },
};
