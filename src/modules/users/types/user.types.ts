import { MusicalInstrument, MusicalKey, VocalRange } from './instrument.types';
import { RoleDto } from './role.types';

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
  PendingInvitation = 'PendingInvitation',
}

export type UserDto = {
  id: string;
  tenantId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  profilePhotoUrl?: string | null;
  mainInstrument?: MusicalInstrument | null;
  secondaryInstruments: MusicalInstrument[];
  vocalRange?: VocalRange | null;
  comfortableKey?: MusicalKey | null;
  status: UserStatus;
  joinedAt?: string | null;
  lastLoginAt?: string | null;
  roles: RoleDto[];
  permissions: string[];
};

export type UserFilters = {
  search?: string;
  instrument?: MusicalInstrument | null;
  status?: UserStatus | null;
  role?: string | null;
  vocalRange?: VocalRange | null;
  page: number;
  pageSize: number;
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  mainInstrument: MusicalInstrument;
  secondaryInstruments: MusicalInstrument[];
  vocalRange?: VocalRange | null;
  comfortableKey?: MusicalKey | null;
  roleIds: string[];
  permissionCodes?: string[];
  status: UserStatus;
};

export type UpdateUserRequest = Partial<CreateUserRequest> & {
  id: string;
};

export type UpdateProfileRequest = {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  mainInstrument?: MusicalInstrument | null;
  secondaryInstruments: MusicalInstrument[];
  vocalRange?: VocalRange | null;
  comfortableKey?: MusicalKey | null;
};

export type UserAvailability = {
  id: string;
  userId: string;
  weekday: number;
  isAvailable: boolean;
  fromTime?: string | null;
  toTime?: string | null;
  note?: string | null;
};
