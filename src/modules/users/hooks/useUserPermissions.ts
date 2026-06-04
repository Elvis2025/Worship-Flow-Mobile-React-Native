import { useMemo } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Permissions } from '../utils/permissionChecker';

export function useUserPermissions() {
  const user = useAuthStore((state) => state.user);

  return useMemo(() => {
    const userPermissions = user?.permissions ?? [];
    const can = (permission: string) => userPermissions.includes(permission);

    return {
      canViewUsers: can(Permissions.UsersView),
      canCreateUsers: can(Permissions.UsersCreate),
      canEditUsers: can(Permissions.UsersEdit),
      canDeleteUsers: can(Permissions.UsersDelete),
      canManageRoles: can(Permissions.UsersManageRoles),
      canManagePermissions: can(Permissions.UsersManagePermissions),
      canEditOwnProfile: can(Permissions.ProfileEditOwn),
    };
  }, [user?.permissions]);
}
