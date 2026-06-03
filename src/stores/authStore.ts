import { create } from 'zustand';
import { AuthUser, LoginResponse } from '@/modules/auth/types/auth.types';
import { tokenService } from '@/modules/auth/services/tokenService';

type AuthState = { accessToken: string | null; refreshToken: string | null; expiresAt: string | null; user: AuthUser | null; isAuthenticated: boolean; isBootstrapping: boolean; setBootstrapping: (value: boolean) => void; login: (session: LoginResponse) => void; logout: () => void; setSession: (session: LoginResponse) => void; clearSession: () => void; updateCurrentUser: (user: Partial<AuthUser>) => void };

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: tokenService.getAccessToken(), refreshToken: tokenService.getRefreshToken(), expiresAt: tokenService.getTokenExpiration(), user: null, isAuthenticated: Boolean(tokenService.getAccessToken()), isBootstrapping: true,
  setBootstrapping: (value) => set({ isBootstrapping: value }),
  login: (session) => get().setSession(session),
  logout: () => get().clearSession(),
  setSession: (session) => { tokenService.saveTokens(session.accessToken, session.refreshToken, session.expiresAt); set({ accessToken: session.accessToken, refreshToken: session.refreshToken, expiresAt: session.expiresAt, user: session.user, isAuthenticated: true }); },
  clearSession: () => { tokenService.clearTokens(); set({ accessToken: null, refreshToken: null, expiresAt: null, user: null, isAuthenticated: false }); },
  updateCurrentUser: (user) => set((state) => ({ user: state.user ? { ...state.user, ...user } : state.user })),
}));
