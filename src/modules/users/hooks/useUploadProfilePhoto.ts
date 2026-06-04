import { useMutation } from '@tanstack/react-query';
import { profileService } from '../services/profileService';

export function useUploadProfilePhoto(userId: string) {
  return useMutation({
    mutationFn: (file: { uri: string; name: string; type: string }) => profileService.uploadPhoto(userId, file),
  });
}
