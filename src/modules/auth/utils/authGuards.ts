import { useAuthStore } from '@/stores/authStore';

export function requireAuth(): boolean {
  return useAuthStore.getState().isAuthenticated;
}

export function getCurrentTenantId(): string | null {
  return useAuthStore.getState().user?.tenantId ?? null;
}
