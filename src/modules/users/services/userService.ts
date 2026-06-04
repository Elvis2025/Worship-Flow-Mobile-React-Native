import NetInfo from '@react-native-community/netinfo';
import { usersApi } from '../api/usersApi';
import { userLocalRepository } from '../database/userLocalRepository';
import { CreateUserRequest, UpdateUserRequest, UserDto, UserFilters, UserStatus } from '../types/user.types';
import { useAuthStore } from '@/stores/authStore';
import { userSyncService } from './userSyncService';

function buildOfflineUser(request: CreateUserRequest): UserDto {
  const tenantId = useAuthStore.getState().user?.tenantId ?? 'local';
  return {
    id: `local-${Date.now()}`,
    tenantId,
    fullName: `${request.firstName} ${request.lastName}`,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    phone: request.phone ?? null,
    profilePhotoUrl: null,
    mainInstrument: request.mainInstrument,
    secondaryInstruments: request.secondaryInstruments,
    vocalRange: request.vocalRange ?? null,
    comfortableKey: request.comfortableKey ?? null,
    status: request.status,
    joinedAt: new Date().toISOString(),
    lastLoginAt: null,
    roles: [],
    permissions: request.permissionCodes ?? [],
  };
}

export const userService = {
  async list(filters: UserFilters) {
    const network = await NetInfo.fetch();
    if (network.isConnected) {
      const result = await usersApi.getUsers(filters);
      await userLocalRepository.saveUsers(result.items);
      return result;
    }

    return userLocalRepository.getUsers(filters);
  },

  async detail(id: string) {
    const network = await NetInfo.fetch();
    if (network.isConnected) {
      const user = await usersApi.getUser(id);
      await userLocalRepository.upsertUser(user, false);
      return user;
    }

    return userLocalRepository.getUserById(id);
  },

  async create(request: CreateUserRequest) {
    const network = await NetInfo.fetch();
    if (network.isConnected) {
      const user = await usersApi.createUser(request);
      await userLocalRepository.upsertUser(user, false);
      return user;
    }

    const user = buildOfflineUser(request);
    await userLocalRepository.upsertUser(user, true);
    await userSyncService.enqueue('CREATE_USER', 'User', user.id, request);
    return user;
  },

  async update(request: UpdateUserRequest) {
    const network = await NetInfo.fetch();
    if (network.isConnected) {
      const user = await usersApi.updateUser(request);
      await userLocalRepository.upsertUser(user, false);
      return user;
    }

    const current = await userLocalRepository.getUserById(request.id);
    if (!current) throw new Error('Usuario no disponible offline.');

    const updated: UserDto = {
      ...current,
      ...request,
      fullName: `${request.firstName ?? current.firstName} ${request.lastName ?? current.lastName}`,
      phone: request.phone ?? current.phone,
      mainInstrument: request.mainInstrument ?? current.mainInstrument,
      secondaryInstruments: request.secondaryInstruments ?? current.secondaryInstruments,
      vocalRange: request.vocalRange ?? current.vocalRange,
      comfortableKey: request.comfortableKey ?? current.comfortableKey,
      status: request.status ?? current.status,
    };

    await userLocalRepository.upsertUser(updated, true);
    await userSyncService.enqueue('UPDATE_USER', 'User', request.id, request);
    return updated;
  },

  async updateStatus(id: string, status: UserStatus) {
    const network = await NetInfo.fetch();
    if (network.isConnected) {
      const user = await usersApi.updateStatus(id, status);
      await userLocalRepository.upsertUser(user, false);
      return user;
    }

    const user = await userLocalRepository.getUserById(id);
    if (!user) throw new Error('Usuario no disponible offline.');

    const updated = { ...user, status };
    await userLocalRepository.upsertUser(updated, true);
    await userSyncService.enqueue('UPDATE_USER_STATUS', 'User', id, { status });
    return updated;
  },
};
