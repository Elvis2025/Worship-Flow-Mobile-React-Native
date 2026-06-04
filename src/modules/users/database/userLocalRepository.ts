import { executeSql, getAll, getFirst } from '@/database/sqlite';
import { PermissionDto } from '../types/permission.types';
import { RoleDto } from '../types/role.types';
import { PaginatedResult, UserAvailability, UserDto, UserFilters } from '../types/user.types';
import {
  mapAvailabilityToSqlParams,
  mapPermissionToSqlParams,
  mapRoleToSqlParams,
  mapRowToUser,
  mapUserToSqlParams,
} from './userMappers';
import { userTableStatements } from './userTables';

export const userLocalRepository = {
  async init(): Promise<void> {
    for (const statement of userTableStatements) {
      await executeSql(statement);
    }
  },

  async saveUsers(users: UserDto[]): Promise<void> {
    await this.init();
    await Promise.all(users.map((user) => this.upsertUser(user, false)));
  },

  async getUsers(filters: UserFilters): Promise<PaginatedResult<UserDto>> {
    await this.init();
    const rows = await getAll<{ payloadJson: string }>('SELECT payloadJson FROM users WHERE isDeleted = 0 ORDER BY updatedAt DESC');
    let users = rows.map(mapRowToUser);

    if (filters.search) {
      const search = filters.search.trim().toLowerCase();
      users = users.filter((user) => `${user.fullName} ${user.email} ${user.mainInstrument ?? ''}`.toLowerCase().includes(search));
    }

    if (filters.instrument) users = users.filter((user) => user.mainInstrument === filters.instrument);
    if (filters.status) users = users.filter((user) => user.status === filters.status);
    if (filters.role) users = users.filter((user) => user.roles.some((role) => role.id === filters.role || role.name === filters.role));
    if (filters.vocalRange) users = users.filter((user) => user.vocalRange === filters.vocalRange);

    const start = (filters.page - 1) * filters.pageSize;
    const items = users.slice(start, start + filters.pageSize);

    return {
      items,
      page: filters.page,
      pageSize: filters.pageSize,
      total: users.length,
      hasNextPage: start + filters.pageSize < users.length,
    };
  },

  async getUserById(id: string): Promise<UserDto | null> {
    await this.init();
    const row = await getFirst<{ payloadJson: string }>('SELECT payloadJson FROM users WHERE id = ? AND isDeleted = 0', [id]);
    return row ? mapRowToUser(row) : null;
  },

  async upsertUser(user: UserDto, isDirty = true): Promise<void> {
    await this.init();
    await executeSql(
      `INSERT OR REPLACE INTO users (id, tenantId, payloadJson, updatedAt, syncedAt, isDirty, isDeleted)
       VALUES (?, ?, ?, ?, ?, ?, 0)`,
      mapUserToSqlParams(user, isDirty),
    );
  },

  async markUserDirty(id: string): Promise<void> {
    await this.init();
    await executeSql('UPDATE users SET isDirty = 1, updatedAt = ? WHERE id = ?', [new Date().toISOString(), id]);
  },

  async softDeleteUserLocal(id: string): Promise<void> {
    await this.init();
    await executeSql('UPDATE users SET isDeleted = 1, isDirty = 1, updatedAt = ? WHERE id = ?', [new Date().toISOString(), id]);
  },

  async saveRoles(roles: RoleDto[], tenantId?: string): Promise<void> {
    await this.init();
    await Promise.all(
      roles.map((role) =>
        executeSql(
          `INSERT OR REPLACE INTO roles (id, tenantId, payloadJson, updatedAt, syncedAt, isDirty, isDeleted)
           VALUES (?, ?, ?, ?, ?, 0, 0)`,
          mapRoleToSqlParams(role, tenantId),
        ),
      ),
    );
  },

  async savePermissions(permissions: PermissionDto[], tenantId?: string): Promise<void> {
    await this.init();
    await Promise.all(
      permissions.map((permission) =>
        executeSql(
          `INSERT OR REPLACE INTO permissions (id, tenantId, payloadJson, updatedAt, syncedAt, isDirty, isDeleted)
           VALUES (?, ?, ?, ?, ?, 0, 0)`,
          mapPermissionToSqlParams(permission, tenantId),
        ),
      ),
    );
  },


  async getAvailability(userId: string): Promise<UserAvailability[]> {
    await this.init();
    const rows = await getAll<{ payloadJson: string }>(
      'SELECT payloadJson FROM user_availability WHERE userId = ? AND isDeleted = 0 ORDER BY id ASC',
      [userId],
    );
    return rows.map((row) => JSON.parse(row.payloadJson) as UserAvailability);
  },

  async saveAvailability(items: UserAvailability[], tenantId: string, isDirty = true): Promise<void> {
    await this.init();
    await Promise.all(
      items.map((item) =>
        executeSql(
          `INSERT OR REPLACE INTO user_availability (id, tenantId, userId, payloadJson, updatedAt, syncedAt, isDirty, isDeleted)
           VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
          mapAvailabilityToSqlParams(item, tenantId, isDirty),
        ),
      ),
    );
  },
};
