import NetInfo from '@react-native-community/netinfo';
import { useAuthStore } from '@/stores/authStore';
import { usersApi } from '../api/usersApi';
import { userLocalRepository } from '../database/userLocalRepository';
import { UpdateProfileRequest, UserAvailability, UserDto } from '../types/user.types';
import { userSyncService } from './userSyncService';

function toUserPatch(current: UserDto, request: UpdateProfileRequest): UserDto {
  return {
    ...current,
    firstName: request.firstName,
    lastName: request.lastName,
    fullName: `${request.firstName} ${request.lastName}`,
    phone: request.phone ?? null,
    mainInstrument: request.mainInstrument ?? null,
    secondaryInstruments: request.secondaryInstruments,
    vocalRange: request.vocalRange ?? null,
    comfortableKey: request.comfortableKey ?? null,
  };
}

async function updateLocalProfilePhoto(userId: string, profilePhotoUrl: string, isDirty: boolean): Promise<void> {
  const current = await userLocalRepository.getUserById(userId);
  if (!current) return;
  await userLocalRepository.upsertUser({ ...current, profilePhotoUrl }, isDirty);
}

export const profileService = {
  async updateProfile(request: UpdateProfileRequest): Promise<UserDto> {
    const network = await NetInfo.fetch();

    if (network.isConnected) {
      const user = await usersApi.updateUser(request);
      await userLocalRepository.upsertUser(user, false);
      useAuthStore.getState().updateCurrentUser(user);
      return user;
    }

    const current = await userLocalRepository.getUserById(request.id);
    if (!current) throw new Error('Perfil no disponible offline.');

    const updated = toUserPatch(current, request);
    await userLocalRepository.upsertUser(updated, true);
    await userSyncService.enqueue('UPDATE_PROFILE', 'User', request.id, request);
    useAuthStore.getState().updateCurrentUser(updated);
    return updated;
  },

  async uploadPhoto(userId: string, file: { uri: string; name: string; type: string }) {
    const network = await NetInfo.fetch();

    if (network.isConnected) {
      const result = await usersApi.uploadPhoto(userId, file);
      await updateLocalProfilePhoto(userId, result.profilePhotoUrl, false);
      useAuthStore.getState().updateCurrentUser({ profilePhotoUrl: result.profilePhotoUrl });
      return result;
    }

    await updateLocalProfilePhoto(userId, file.uri, true);
    await userSyncService.enqueue('UPLOAD_PROFILE_PHOTO', 'User', userId, file);
    useAuthStore.getState().updateCurrentUser({ profilePhotoUrl: file.uri });
    return { profilePhotoUrl: file.uri };
  },

  async getAvailability(userId: string): Promise<UserAvailability[]> {
    const network = await NetInfo.fetch();
    if (network.isConnected) {
      const availability = await usersApi.getAvailability(userId);
      const tenantId = useAuthStore.getState().user?.tenantId ?? 'local';
      await userLocalRepository.saveAvailability(availability, tenantId, false);
      return availability;
    }

    return userLocalRepository.getAvailability(userId);
  },

  async updateAvailability(userId: string, availability: UserAvailability[]): Promise<UserAvailability[]> {
    const network = await NetInfo.fetch();
    const tenantId = useAuthStore.getState().user?.tenantId ?? 'local';

    if (network.isConnected) {
      const updated = await usersApi.updateAvailability(userId, availability);
      await userLocalRepository.saveAvailability(updated, tenantId, false);
      return updated;
    }

    await userLocalRepository.saveAvailability(availability, tenantId, true);
    await userSyncService.enqueue('UPDATE_USER_AVAILABILITY', 'User', userId, availability);
    return availability;
  },
};
