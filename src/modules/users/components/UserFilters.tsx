import { ScrollView } from 'react-native';
import { WFSearchBar } from '@/shared/components/WFPrimitives';
import { UserFilters as Filters } from '../types/user.types';
export function UserFilters({ filters, onChange }: { filters: Filters; onChange: (filters: Filters) => void }) { return <ScrollView horizontal={false} keyboardShouldPersistTaps="handled"><WFSearchBar value={filters.search} onChangeText={(search) => onChange({ ...filters, search, page: 1 })} /></ScrollView>; }
