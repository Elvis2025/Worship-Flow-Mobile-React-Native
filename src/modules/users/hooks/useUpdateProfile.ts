import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { userQueryKeys } from './useUsers';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userQueryKeys.me }),
  });
}
