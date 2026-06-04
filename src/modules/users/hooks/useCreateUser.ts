import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { userQueryKeys } from './useUsers';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() }),
  });
}
