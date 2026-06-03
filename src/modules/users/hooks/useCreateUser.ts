import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { userQueryKeys } from './useUsers';
export function useCreateUser() { const qc = useQueryClient(); return useMutation({ mutationFn: userService.create, onSuccess: () => qc.invalidateQueries({ queryKey: userQueryKeys.lists() }) }); }
