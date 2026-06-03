import { useQuery } from '@tanstack/react-query';
import { UserFilters } from '../types/user.types';
import { userService } from '../services/userService';
export const userQueryKeys = { all: ['users'] as const, lists: () => [...userQueryKeys.all, 'list'] as const, list: (filters: UserFilters) => [...userQueryKeys.lists(), filters] as const, detail: (id: string) => [...userQueryKeys.all, 'detail', id] as const, me: ['auth', 'me'] as const, roles: ['roles'] as const, permissions: ['permissions'] as const };
export function useUsers(filters: UserFilters) { return useQuery({ queryKey: userQueryKeys.list(filters), queryFn: () => userService.list(filters) }); }
