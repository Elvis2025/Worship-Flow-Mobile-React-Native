import { executeSql } from '@/database/sqlite';
import { userLocalRepository } from '../database/userLocalRepository';

export type UserSyncOperationType =
  | 'CREATE_USER'
  | 'UPDATE_USER'
  | 'UPDATE_PROFILE'
  | 'UPDATE_USER_STATUS'
  | 'UPDATE_USER_ROLES'
  | 'UPDATE_USER_PERMISSIONS'
  | 'UPDATE_USER_AVAILABILITY'
  | 'UPLOAD_PROFILE_PHOTO';

export const userSyncService = {
  async enqueue(operationType: UserSyncOperationType, entityName: string, entityId: string, payload: unknown): Promise<void> {
    await userLocalRepository.init();
    await executeSql(
      `INSERT INTO sync_queue (id, operationType, entityName, entityId, payload, createdAt, retryCount, status)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
      [`${operationType}-${entityId}-${Date.now()}`, operationType, entityName, entityId, JSON.stringify(payload), new Date().toISOString(), 'Pending'],
    );
  },
};
