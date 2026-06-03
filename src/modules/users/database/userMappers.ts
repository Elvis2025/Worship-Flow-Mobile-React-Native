import { PermissionDto } from '../types/permission.types';
import { RoleDto } from '../types/role.types';
import { UserAvailability, UserDto } from '../types/user.types';
export type LocalRow = { payloadJson: string };
export const mapUserToRow = (user: UserDto) => ({ id: user.id, tenantId: user.tenantId, payloadJson: JSON.stringify(user), updatedAt: new Date().toISOString(), syncedAt: new Date().toISOString(), isDirty: 0, isDeleted: 0 });
export const mapRowToUser = (row: LocalRow) => JSON.parse(row.payloadJson) as UserDto;
export const mapRoleToRow = (role: RoleDto, tenantId?: string) => ({ id: role.id, tenantId: tenantId ?? null, payloadJson: JSON.stringify(role), updatedAt: new Date().toISOString(), syncedAt: new Date().toISOString(), isDirty: 0, isDeleted: 0 });
export const mapPermissionToRow = (permission: PermissionDto, tenantId?: string) => ({ id: permission.id, tenantId: tenantId ?? null, payloadJson: JSON.stringify(permission), updatedAt: new Date().toISOString(), syncedAt: new Date().toISOString(), isDirty: 0, isDeleted: 0 });
export const mapAvailabilityToRow = (item: UserAvailability, tenantId: string) => ({ id: item.id, tenantId, userId: item.userId, payloadJson: JSON.stringify(item), updatedAt: new Date().toISOString(), syncedAt: new Date().toISOString(), isDirty: 0, isDeleted: 0 });
