import { secureStorage } from '@/services/storage';
import { AuthUser } from '../types/auth.types';

const ACCESS_TOKEN_KEY = 'wf.auth.accessToken';
const REFRESH_TOKEN_KEY = 'wf.auth.refreshToken';
const EXPIRES_AT_KEY = 'wf.auth.expiresAt';
const AUTH_USER_KEY = 'wf.auth.user';
const REFRESH_THRESHOLD_MS = 2 * 60 * 1000;

function parseSavedUser(value: string | null): AuthUser | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    secureStorage.delete(AUTH_USER_KEY);
    return null;
  }
}

export const tokenService = {
  getAccessToken(): string | null {
    return secureStorage.getString(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return secureStorage.getString(REFRESH_TOKEN_KEY);
  },

  getTokenExpiration(): string | null {
    return secureStorage.getString(EXPIRES_AT_KEY);
  },

  getSavedUser(): AuthUser | null {
    return parseSavedUser(secureStorage.getString(AUTH_USER_KEY));
  },

  saveTokens(accessToken: string, refreshToken: string, expiresAt: string): void {
    secureStorage.setString(ACCESS_TOKEN_KEY, accessToken);
    secureStorage.setString(REFRESH_TOKEN_KEY, refreshToken);
    secureStorage.setString(EXPIRES_AT_KEY, expiresAt);
  },

  saveUser(user: AuthUser): void {
    secureStorage.setString(AUTH_USER_KEY, JSON.stringify(user));
  },

  clearTokens(): void {
    secureStorage.delete(ACCESS_TOKEN_KEY);
    secureStorage.delete(REFRESH_TOKEN_KEY);
    secureStorage.delete(EXPIRES_AT_KEY);
    secureStorage.delete(AUTH_USER_KEY);
  },

  isAccessTokenExpired(expiresAt = tokenService.getTokenExpiration()): boolean {
    return !expiresAt || Number.isNaN(Date.parse(expiresAt)) || Date.parse(expiresAt) <= Date.now();
  },

  shouldRefreshToken(expiresAt = tokenService.getTokenExpiration()): boolean {
    return !expiresAt || Number.isNaN(Date.parse(expiresAt)) || Date.parse(expiresAt) - Date.now() <= REFRESH_THRESHOLD_MS;
  },
};
