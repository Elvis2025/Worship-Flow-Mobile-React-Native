import { secureStorage } from '@/services/storage';

const ACCESS_TOKEN_KEY = 'wf.accessToken';
const REFRESH_TOKEN_KEY = 'wf.refreshToken';
const EXPIRES_AT_KEY = 'wf.expiresAt';

export const tokenService = {
  getAccessToken: () => secureStorage.getString(ACCESS_TOKEN_KEY) ?? null,
  getRefreshToken: () => secureStorage.getString(REFRESH_TOKEN_KEY) ?? null,
  getTokenExpiration: () => secureStorage.getString(EXPIRES_AT_KEY) ?? null,
  saveTokens(accessToken: string, refreshToken: string, expiresAt: string) {
    secureStorage.setString(ACCESS_TOKEN_KEY, accessToken);
    secureStorage.setString(REFRESH_TOKEN_KEY, refreshToken);
    secureStorage.setString(EXPIRES_AT_KEY, expiresAt);
  },
  clearTokens() { secureStorage.delete(ACCESS_TOKEN_KEY); secureStorage.delete(REFRESH_TOKEN_KEY); secureStorage.delete(EXPIRES_AT_KEY); },
  isAccessTokenExpired(expiresAt?: string | null) { const value = expiresAt ?? tokenService.getTokenExpiration(); return !value || new Date(value).getTime() <= Date.now(); },
  shouldRefreshToken(expiresAt?: string | null) { const value = expiresAt ?? tokenService.getTokenExpiration(); return !value || new Date(value).getTime() - Date.now() < 120000; },
};
