import NetInfo from '@react-native-community/netinfo';
import { usersApi } from '../api/usersApi';
import { userLocalRepository } from '../database/userLocalRepository';
import { UpdateUserRequest, UserAvailability } from '../types/user.types';
import { userSyncService } from './userSyncService';
import { useAuthStore } from '@/stores/authStore';

export const profileService = {
  async updateProfile(request: UpdateUserRequest) {
    const net = await NetInfo.fetch();
    if (net.isConnected) {
      const user = await usersApi.updateUser(request);
      useAuthStore.getState().updateCurrentUser(user);
      await userLocalRepository.upsertUser(user, false);
      return user;
    }
    const current = await userLocalRepository.getUserById(request.id);
    const updated = { ...current, ...request, fullName: `${request.firstName ?? current?.firstName ?? ''} ${request.lastName ?? current?.lastName ?? ''}` } as NonNullable<typeof current>;
    await userLocalRepository.upsertUser(updated, true);
    useAuthStore.getState().updateCurrentUser(updated);
    await userSyncService.enqueue('UPDATE_PROFILE', 'User', request.id, request);
    return updated;
  },
  async uploadPhoto(userId: string, file: { uri: string; name: string; type: string }) { const net = await NetInfo.fetch(); if (net.isConnected) { const result = await usersApi.uploadPhoto(userId, file); useAuthStore.getState().updateCurrentUser({ profilePhotoUrl: result.profilePhotoUrl }); return result; } await userSyncService.enqueue('UPLOAD_PROFILE_PHOTO', 'User', userId, file); return { profilePhotoUrl: file.uri }; },
  async updateAvailability(userId: string, availability: UserAvailability[]) { const net = await NetInfo.fetch(); if (net.isConnected) return usersApi.updateAvailability(userId, availability); const tenantId = useAuthStore.getState().user?.tenantId ?? 'local'; await userLocalRepository.saveAvailability(availability, tenantId); await userSyncService.enqueue('UPDATE_USER_AVAILABILITY', 'User', userId, availability); return availability; },
};
