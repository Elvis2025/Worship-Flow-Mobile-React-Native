import { authApi } from '../api/authApi';
import { LoginRequest } from '../types/auth.types';
import { useAuthStore } from '@/stores/authStore';

export const authService = {
  async login(request: LoginRequest) {
    const session = await authApi.login(request);
    useAuthStore.getState().setSession(session);
    return session;
  },

  async logout() {
    await authApi.logout().catch(() => undefined);
    useAuthStore.getState().clearSession();
  },
};
