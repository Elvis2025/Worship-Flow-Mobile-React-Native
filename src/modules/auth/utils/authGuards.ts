import { useAuthStore } from '@/stores/authStore';
export const requireAuth = () => useAuthStore.getState().isAuthenticated;
export const getCurrentTenantId = () => useAuthStore.getState().user?.tenantId ?? null;
