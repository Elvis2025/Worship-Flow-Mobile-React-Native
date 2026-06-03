import NetInfo from '@react-native-community/netinfo';
import { usersApi } from '../api/usersApi';
import { userLocalRepository } from '../database/userLocalRepository';
import { CreateUserRequest, UpdateUserRequest, UserDto, UserFilters, UserStatus } from '../types/user.types';
import { userSyncService } from './userSyncService';
import { useAuthStore } from '@/stores/authStore';

const offlineUser = (request: CreateUserRequest): UserDto => ({ ...request, id: `local-${Date.now()}`, tenantId: useAuthStore.getState().user?.tenantId ?? 'local', fullName: `${request.firstName} ${request.lastName}`, permissions: request.permissionCodes ?? [], joinedAt: new Date().toISOString(), lastLoginAt: null, roles: [] });
export const userService = {
  async list(filters: UserFilters) { const net = await NetInfo.fetch(); if (net.isConnected) { const result = await usersApi.getUsers(filters); await userLocalRepository.saveUsers(result.items); return result; } return userLocalRepository.getUsers(filters); },
  async detail(id: string) { const net = await NetInfo.fetch(); if (net.isConnected) { const user = await usersApi.getUser(id); await userLocalRepository.upsertUser(user, false); return user; } return userLocalRepository.getUserById(id); },
  async create(request: CreateUserRequest) { const net = await NetInfo.fetch(); if (net.isConnected) { const user = await usersApi.createUser(request); await userLocalRepository.upsertUser(user, false); return user; } const user = offlineUser(request); await userLocalRepository.upsertUser(user, true); await userSyncService.enqueue('CREATE_USER', 'User', user.id, request); return user; },
  async update(request: UpdateUserRequest) { const net = await NetInfo.fetch(); if (net.isConnected) { const user = await usersApi.updateUser(request); await userLocalRepository.upsertUser(user, false); return user; } const current = await userLocalRepository.getUserById(request.id); const updated = { ...current, ...request, fullName: `${request.firstName ?? current?.firstName ?? ''} ${request.lastName ?? current?.lastName ?? ''}` } as UserDto; await userLocalRepository.upsertUser(updated, true); await userSyncService.enqueue('UPDATE_USER', 'User', request.id, request); return updated; },
  async updateStatus(id: string, status: UserStatus) { const net = await NetInfo.fetch(); if (net.isConnected) return usersApi.updateStatus(id, status); await userSyncService.enqueue('UPDATE_USER_STATUS', 'User', id, { status }); const user = await userLocalRepository.getUserById(id); if (user) await userLocalRepository.upsertUser({ ...user, status }, true); return user; },
};
