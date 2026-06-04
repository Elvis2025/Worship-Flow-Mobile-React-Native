import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { userQueryKeys } from './useUsers';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.update,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(user.id) });
    },
  });
}
