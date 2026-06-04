import { ApiResponse, AppApiError } from './apiResponse';
import { LoginResponse } from '@/modules/auth/types/auth.types';
import { tokenService } from '@/modules/auth/services/tokenService';
import { useAuthStore } from '@/stores/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000';

type RequestOptions = RequestInit & {
  skipAuth?: boolean;
  retryOnUnauthorized?: boolean;
};

let refreshPromise: Promise<LoginResponse | null> | null = null;

async function parseEnvelope<T>(response: Response): Promise<ApiResponse<T> | null> {
  try {
    return (await response.json()) as ApiResponse<T>;
  } catch {
    return null;
  }
}

async function refreshSession(): Promise<LoginResponse | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) return null;

    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const envelope = await parseEnvelope<LoginResponse>(response);
    if (!response.ok || !envelope?.success) return null;

    useAuthStore.getState().setSession(envelope.data);
    return envelope.data;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const token = tokenService.getAccessToken();
  const tenantId = useAuthStore.getState().user?.tenantId;

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (!options.skipAuth && token) headers.set('Authorization', `Bearer ${token}`);
  if (tenantId) headers.set('X-Tenant-Id', tenantId);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 401 && !options.skipAuth && options.retryOnUnauthorized !== false) {
    const refreshed = await refreshSession();
    if (refreshed) {
      return apiRequest<T>(path, { ...options, retryOnUnauthorized: false });
    }

    useAuthStore.getState().clearSession();
  }

  const envelope = await parseEnvelope<T>(response);

  if (!response.ok || !envelope || !envelope.success) {
    const errors = envelope && 'errors' in envelope ? envelope.errors ?? [] : [];
    throw new AppApiError(envelope?.message ?? 'Error de comunicación con el servidor.', errors, response.status);
  }

  return envelope.data;
}
