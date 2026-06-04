import { RoleDto } from '@/modules/users/types/role.types';

export type AuthUser = {
  id: string;
  tenantId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  profilePhotoUrl?: string | null;
  roles: RoleDto[];
  permissions: string[];
};

export type LoginRequest = {
  email: string;
  password: string;
  tenantSlug?: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: AuthUser;
};
