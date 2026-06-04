import { apiRequest } from '@/core/http/httpClient';
import { PermissionDto } from '../types/permission.types';
import { RoleDto } from '../types/role.types';
import { CreateUserRequest, PaginatedResult, UpdateProfileRequest, UpdateUserRequest, UserAvailability, UserDto, UserFilters } from '../types/user.types';

function toQueryString(filters: UserFilters): string {
  const params = new URLSearchParams();
  params.set('page', String(filters.page));
  params.set('pageSize', String(filters.pageSize));
  if (filters.search) params.set('search', filters.search);
  if (filters.instrument) params.set('instrument', filters.instrument);
  if (filters.status) params.set('status', filters.status);
  if (filters.role) params.set('role', filters.role);
  if (filters.vocalRange) params.set('vocalRange', filters.vocalRange);
  return params.toString();
}

export const usersApi = {
  getUsers(filters: UserFilters): Promise<PaginatedResult<UserDto>> {
    return apiRequest<PaginatedResult<UserDto>>(`/api/users?${toQueryString(filters)}`);
  },

  getUser(id: string): Promise<UserDto> {
    return apiRequest<UserDto>(`/api/users/${id}`);
  },

  createUser(request: CreateUserRequest): Promise<UserDto> {
    return apiRequest<UserDto>('/api/users', { method: 'POST', body: JSON.stringify(request) });
  },

  updateUser({ id, ...request }: UpdateUserRequest | UpdateProfileRequest): Promise<UserDto> {
    return apiRequest<UserDto>(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(request) });
  },

  updateStatus(id: string, status: string): Promise<UserDto> {
    return apiRequest<UserDto>(`/api/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
  },

  uploadPhoto(id: string, file: { uri: string; name: string; type: string }): Promise<{ profilePhotoUrl: string }> {
    const formData = new FormData();
    formData.append('file', file as unknown as Blob);
    return apiRequest<{ profilePhotoUrl: string }>(`/api/users/${id}/photo`, { method: 'POST', body: formData });
  },

  getAvailability(id: string): Promise<UserAvailability[]> {
    return apiRequest<UserAvailability[]>(`/api/users/${id}/availability`);
  },

  updateAvailability(id: string, availability: UserAvailability[]): Promise<UserAvailability[]> {
    return apiRequest<UserAvailability[]>(`/api/users/${id}/availability`, {
      method: 'PUT',
      body: JSON.stringify({ availability }),
    });
  },

  getRoles(): Promise<RoleDto[]> {
    return apiRequest<RoleDto[]>('/api/roles');
  },

  getPermissions(): Promise<PermissionDto[]> {
    return apiRequest<PermissionDto[]>('/api/permissions');
  },

  updateRoles(id: string, roleIds: string[]): Promise<UserDto> {
    return apiRequest<UserDto>(`/api/users/${id}/roles`, { method: 'PUT', body: JSON.stringify({ roleIds }) });
  },

  updatePermissions(id: string, permissionCodes: string[]): Promise<UserDto> {
    return apiRequest<UserDto>(`/api/users/${id}/permissions`, { method: 'PUT', body: JSON.stringify({ permissionCodes }) });
  },
};
