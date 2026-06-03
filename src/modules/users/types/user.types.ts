import { MusicalInstrument, MusicalKey, VocalRange } from './instrument.types';
import { RoleDto } from './role.types';

export enum UserStatus { Active = 'Active', Inactive = 'Inactive', Suspended = 'Suspended', PendingInvitation = 'PendingInvitation' }
export type UserDto = { id: string; tenantId: string; fullName: string; firstName: string; lastName: string; email: string; phone?: string | null; profilePhotoUrl?: string | null; mainInstrument?: MusicalInstrument | null; secondaryInstruments: MusicalInstrument[]; vocalRange?: VocalRange | null; comfortableKey?: MusicalKey | null; status: UserStatus; joinedAt?: string | null; lastLoginAt?: string | null; roles: RoleDto[]; permissions: string[] };
export type UserFilters = { search?: string; instrument?: MusicalInstrument; status?: UserStatus; role?: string; vocalRange?: VocalRange; page: number; pageSize: number };
export type PaginatedResult<T> = { items: T[]; page: number; pageSize: number; total: number; hasNextPage: boolean };
export type CreateUserRequest = Omit<UserDto, 'id' | 'tenantId' | 'fullName' | 'lastLoginAt' | 'joinedAt' | 'permissions'> & { roleIds: string[]; permissionCodes?: string[] };
export type UpdateUserRequest = Partial<CreateUserRequest> & { id: string };
export type UserAvailability = { id: string; userId: string; weekday: number; isAvailable: boolean; fromTime?: string | null; toTime?: string | null; note?: string | null };
