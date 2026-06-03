import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { userQueryKeys } from './useUsers';
export function useUpdateProfile() { const qc = useQueryClient(); return useMutation({ mutationFn: profileService.updateProfile, onSuccess: () => qc.invalidateQueries({ queryKey: userQueryKeys.me }) }); }
