import { AuthUser } from '@/modules/auth/types/auth.types';
import { UserDto, UserStatus } from '../types/user.types';

export function mapAuthUserToUserDto(user: AuthUser): UserDto {
  return {
    id: user.id,
    tenantId: user.tenantId,
    fullName: user.fullName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? null,
    profilePhotoUrl: user.profilePhotoUrl ?? null,
    mainInstrument: null,
    secondaryInstruments: [],
    vocalRange: null,
    comfortableKey: null,
    status: UserStatus.Active,
    joinedAt: null,
    lastLoginAt: null,
    roles: user.roles,
    permissions: user.permissions,
  };
}
