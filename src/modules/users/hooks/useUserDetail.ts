import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { userQueryKeys } from './useUsers';
export function useUserDetail(id: string) { return useQuery({ queryKey: userQueryKeys.detail(id), queryFn: () => userService.detail(id), enabled: Boolean(id) }); }
