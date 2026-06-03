import { useLocalSearchParams } from 'expo-router';
import { UserDetailScreen } from '@/modules/users/screens/UserDetailScreen';
export default function UserDetailRoute() { const { id } = useLocalSearchParams<{ id: string }>(); return <UserDetailScreen id={id} />; }
