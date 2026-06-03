import { useAuthStore } from '@/stores/authStore';
export const Permissions = { UsersView: 'Users.View', UsersCreate: 'Users.Create', UsersEdit: 'Users.Edit', UsersDelete: 'Users.Delete', UsersManageRoles: 'Users.ManageRoles', UsersManagePermissions: 'Users.ManagePermissions', ProfileEditOwn: 'Profile.EditOwn' } as const;
export function hasPermission(permission: string): boolean { return useAuthStore.getState().user?.permissions.includes(permission) ?? false; }
export function hasAnyPermission(permissions: string[]): boolean { return permissions.some(hasPermission); }
export function hasRole(role: string): boolean { return useAuthStore.getState().user?.roles.some(r => r.normalizedName === role.toUpperCase() || r.name.toLowerCase() === role.toLowerCase()) ?? false; }
