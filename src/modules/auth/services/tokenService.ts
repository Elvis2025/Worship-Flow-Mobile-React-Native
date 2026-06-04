import { secureStorage } from '@/services/storage';

const ACCESS_TOKEN_KEY = 'wf.auth.accessToken';
const REFRESH_TOKEN_KEY = 'wf.auth.refreshToken';
const EXPIRES_AT_KEY = 'wf.auth.expiresAt';
const REFRESH_THRESHOLD_MS = 2 * 60 * 1000;

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

  saveTokens(accessToken: string, refreshToken: string, expiresAt: string): void {
    secureStorage.setString(ACCESS_TOKEN_KEY, accessToken);
    secureStorage.setString(REFRESH_TOKEN_KEY, refreshToken);
    secureStorage.setString(EXPIRES_AT_KEY, expiresAt);
  },

  clearTokens(): void {
    secureStorage.delete(ACCESS_TOKEN_KEY);
    secureStorage.delete(REFRESH_TOKEN_KEY);
    secureStorage.delete(EXPIRES_AT_KEY);
  },

  isAccessTokenExpired(expiresAt = tokenService.getTokenExpiration()): boolean {
    return !expiresAt || Number.isNaN(Date.parse(expiresAt)) || Date.parse(expiresAt) <= Date.now();
  },

  shouldRefreshToken(expiresAt = tokenService.getTokenExpiration()): boolean {
    return !expiresAt || Number.isNaN(Date.parse(expiresAt)) || Date.parse(expiresAt) - Date.now() <= REFRESH_THRESHOLD_MS;
  },
};
