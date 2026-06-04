import { useAuthStore } from '@/stores/authStore';

export const Permissions = {
  UsersView: 'Users.View',
  UsersCreate: 'Users.Create',
  UsersEdit: 'Users.Edit',
  UsersDelete: 'Users.Delete',
  UsersManageRoles: 'Users.ManageRoles',
  UsersManagePermissions: 'Users.ManagePermissions',
  ProfileEditOwn: 'Profile.EditOwn',
} as const;

export function hasPermission(permission: string): boolean {
  return useAuthStore.getState().user?.permissions.includes(permission) ?? false;
}

export function hasAnyPermission(permissions: string[]): boolean {
  return permissions.some((permission) => hasPermission(permission));
}

export function hasRole(role: string): boolean {
  const normalizedRole = role.trim().toUpperCase();
  return (
    useAuthStore
      .getState()
      .user?.roles.some((userRole) => userRole.normalizedName === normalizedRole || userRole.name.toUpperCase() === normalizedRole) ?? false
  );
}
