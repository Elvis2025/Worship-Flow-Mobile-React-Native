import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { userQueryKeys } from './useUsers';
export function useUpdateUser() { const qc = useQueryClient(); return useMutation({ mutationFn: userService.update, onSuccess: (user) => { qc.invalidateQueries({ queryKey: userQueryKeys.lists() }); if (user) qc.invalidateQueries({ queryKey: userQueryKeys.detail(user.id) }); } }); }
