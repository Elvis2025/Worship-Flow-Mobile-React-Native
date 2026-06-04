import { useState } from 'react';
import { UserFilters } from '../types/user.types';

const defaultFilters: UserFilters = { page: 1, pageSize: 20 };

export function useUserFilters() {
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);

  return {
    filters,
    setFilters,
    reset: () => setFilters(defaultFilters),
  };
}
