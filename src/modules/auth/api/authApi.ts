import { apiRequest } from '@/core/http/httpClient';
import { AuthUser, LoginRequest, LoginResponse } from '../types/auth.types';

export const authApi = {
  login(request: LoginRequest): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(request),
      skipAuth: true,
    });
  },

  refresh(refreshToken: string): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      skipAuth: true,
    });
  },

  logout(): Promise<void> {
    return apiRequest<void>('/api/auth/logout', { method: 'POST' });
  },

  me(): Promise<AuthUser> {
    return apiRequest<AuthUser>('/api/auth/me');
  },
};
