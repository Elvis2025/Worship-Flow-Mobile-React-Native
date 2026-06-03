import { apiRequest } from '@/core/http/httpClient';
import { PermissionDto } from '../types/permission.types';
import { RoleDto } from '../types/role.types';
import { CreateUserRequest, PaginatedResult, UpdateUserRequest, UserAvailability, UserDto, UserFilters } from '../types/user.types';

const qs = (filters: Partial<UserFilters>) => new URLSearchParams(Object.entries(filters).filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => [k, String(v)])).toString();
export const usersApi = {
  getUsers: (filters: UserFilters) => apiRequest<PaginatedResult<UserDto>>(`/api/users?${qs(filters)}`),
  getUser: (id: string) => apiRequest<UserDto>(`/api/users/${id}`),
  createUser: (request: CreateUserRequest) => apiRequest<UserDto>('/api/users', { method: 'POST', body: JSON.stringify(request) }),
  updateUser: ({ id, ...request }: UpdateUserRequest) => apiRequest<UserDto>(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(request) }),
  updateStatus: (id: string, status: string) => apiRequest<UserDto>(`/api/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  uploadPhoto: (id: string, file: { uri: string; name: string; type: string }) => { const form = new FormData(); form.append('file', file as unknown as Blob); return apiRequest<{ profilePhotoUrl: string }>(`/api/users/${id}/photo`, { method: 'POST', body: form }); },
  getAvailability: (id: string) => apiRequest<UserAvailability[]>(`/api/users/${id}/availability`),
  updateAvailability: (id: string, availability: UserAvailability[]) => apiRequest<UserAvailability[]>(`/api/users/${id}/availability`, { method: 'PUT', body: JSON.stringify({ availability }) }),
  getRoles: () => apiRequest<RoleDto[]>('/api/roles'),
  getPermissions: () => apiRequest<PermissionDto[]>('/api/permissions'),
  updateRoles: (id: string, roleIds: string[]) => apiRequest<UserDto>(`/api/users/${id}/roles`, { method: 'PUT', body: JSON.stringify({ roleIds }) }),
  updatePermissions: (id: string, permissionCodes: string[]) => apiRequest<UserDto>(`/api/users/${id}/permissions`, { method: 'PUT', body: JSON.stringify({ permissionCodes }) }),
};
