import { useState } from 'react';
import { UserFilters } from '../types/user.types';
export function useUserFilters() { const [filters, setFilters] = useState<UserFilters>({ page: 1, pageSize: 20 }); return { filters, setFilters, reset: () => setFilters({ page: 1, pageSize: 20 }) }; }
