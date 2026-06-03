import { apiRequest } from '@/core/http/httpClient';
import { AuthUser, LoginRequest, LoginResponse } from '../types/auth.types';

export const authApi = {
  login: (request: LoginRequest) => apiRequest<LoginResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(request), skipAuth: true }),
  refresh: (refreshToken: string) => apiRequest<LoginResponse>('/api/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken }), skipAuth: true }),
  logout: () => apiRequest<void>('/api/auth/logout', { method: 'POST' }),
  me: () => apiRequest<AuthUser>('/api/auth/me'),
};
