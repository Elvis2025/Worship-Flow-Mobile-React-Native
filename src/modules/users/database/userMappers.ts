import { PermissionDto } from '../types/permission.types';
import { RoleDto } from '../types/role.types';
import { UserAvailability, UserDto } from '../types/user.types';

export type PayloadRow = { payloadJson: string };

export function nowIso(): string {
  return new Date().toISOString();
}

export function mapRowToUser(row: PayloadRow): UserDto {
  return JSON.parse(row.payloadJson) as UserDto;
}

export function mapUserToSqlParams(user: UserDto, isDirty: boolean) {
  const now = nowIso();
  return [user.id, user.tenantId, JSON.stringify(user), now, isDirty ? null : now, isDirty ? 1 : 0];
}

export function mapRoleToSqlParams(role: RoleDto, tenantId?: string) {
  const now = nowIso();
  return [role.id, tenantId ?? null, JSON.stringify(role), now, now];
}

export function mapPermissionToSqlParams(permission: PermissionDto, tenantId?: string) {
  const now = nowIso();
  return [permission.id, tenantId ?? null, JSON.stringify(permission), now, now];
}

export function mapAvailabilityToSqlParams(item: UserAvailability, tenantId: string, isDirty: boolean) {
  const now = nowIso();
  return [item.id, tenantId, item.userId, JSON.stringify(item), now, isDirty ? null : now, isDirty ? 1 : 0];
}
