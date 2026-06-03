import { AppApiError, ApiResponse } from './apiResponse';
import { tokenService } from '@/modules/auth/services/tokenService';
import { useAuthStore } from '@/stores/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000';
let refreshing: Promise<string | null> | null = null;

type RequestOptions = RequestInit & { skipAuth?: boolean; retry401?: boolean };

async function refreshAccessToken(): Promise<string | null> {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) return null;
    const response = await fetch(`${API_URL}/api/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }) });
    if (!response.ok) return null;
    const envelope = (await response.json()) as ApiResponse<{ accessToken: string; refreshToken: string; expiresAt: string; user: any }>;
    if (!envelope.success) return null;
    tokenService.saveTokens(envelope.data.accessToken, envelope.data.refreshToken, envelope.data.expiresAt);
    useAuthStore.getState().setSession(envelope.data);
    return envelope.data.accessToken;
  })().finally(() => { refreshing = null; });
  return refreshing;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = tokenService.getAccessToken();
  const tenantId = useAuthStore.getState().user?.tenantId;
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (token && !options.skipAuth) headers.set('Authorization', `Bearer ${token}`);
  if (tenantId) headers.set('X-Tenant-Id', tenantId);
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (response.status === 401 && options.retry401 !== false && !options.skipAuth) {
    const newToken = await refreshAccessToken();
    if (newToken) return apiRequest<T>(path, { ...options, retry401: false });
    useAuthStore.getState().clearSession();
  }
  const json = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !json || !json.success) throw new AppApiError(json?.message ?? 'Error de comunicación con el servidor.', json && 'errors' in json ? json.errors : [], response.status);
  return json.data;
}
