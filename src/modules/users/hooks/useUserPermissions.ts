import { useMemo } from 'react';
import { Permissions, hasPermission } from '../utils/permissionChecker';
export function useUserPermissions() { return useMemo(() => ({ canViewUsers: hasPermission(Permissions.UsersView), canCreateUsers: hasPermission(Permissions.UsersCreate), canEditUsers: hasPermission(Permissions.UsersEdit), canManageRoles: hasPermission(Permissions.UsersManageRoles), canManagePermissions: hasPermission(Permissions.UsersManagePermissions), canEditOwnProfile: hasPermission(Permissions.ProfileEditOwn) }), []); }
