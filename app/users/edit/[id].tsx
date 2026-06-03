import { useLocalSearchParams } from 'expo-router';
import { EditUserScreen } from '@/modules/users/screens/EditUserScreen';
export default function EditUserRoute() { const { id } = useLocalSearchParams<{ id: string }>(); return <EditUserScreen id={id} />; }
