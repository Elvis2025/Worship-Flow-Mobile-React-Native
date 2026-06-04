import { create } from 'zustand';
import { AuthUser, LoginResponse } from '@/modules/auth/types/auth.types';
import { tokenService } from '@/modules/auth/services/tokenService';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (session: LoginResponse) => void;
  logout: () => void;
  setSession: (session: LoginResponse) => void;
  setCurrentUser: (user: AuthUser) => void;
  clearSession: () => void;
  setBootstrapping: (isBootstrapping: boolean) => void;
  updateCurrentUser: (user: Partial<AuthUser>) => void;
};

const initialAccessToken = tokenService.getAccessToken();
const initialRefreshToken = tokenService.getRefreshToken();
const initialUser = tokenService.getSavedUser();

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  expiresAt: tokenService.getTokenExpiration(),
  user: initialUser,
  isAuthenticated: Boolean(initialAccessToken && initialRefreshToken),
  isBootstrapping: true,

  login: (session) => get().setSession(session),
  logout: () => get().clearSession(),

  setSession: (session) => {
    tokenService.saveTokens(session.accessToken, session.refreshToken, session.expiresAt);
    tokenService.saveUser(session.user);
    set({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
      user: session.user,
      isAuthenticated: true,
    });
  },

  setCurrentUser: (user) => {
    tokenService.saveUser(user);
    set({ user, isAuthenticated: Boolean(get().accessToken && get().refreshToken) });
  },

  clearSession: () => {
    tokenService.clearTokens();
    set({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      user: null,
      isAuthenticated: false,
    });
  },

  setBootstrapping: (isBootstrapping) => set({ isBootstrapping }),

  updateCurrentUser: (userPatch) => {
    set((state) => {
      if (!state.user) return state;

      const user = { ...state.user, ...userPatch };
      tokenService.saveUser(user);
      return { user };
    });
  },
}));
