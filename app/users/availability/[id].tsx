import { useLocalSearchParams } from 'expo-router';
import { UserAvailabilityScreen } from '@/modules/users/screens/UserAvailabilityScreen';

export default function AvailabilityRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <UserAvailabilityScreen id={id} />;
}
