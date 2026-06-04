import { Text, View } from 'react-native';
import { WFAvatar, WFCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { UserDto } from '../types/user.types';
import { UserStatusBadge } from './UserStatusBadge';

type HeaderUser = Pick<UserDto, 'fullName' | 'email' | 'profilePhotoUrl' | 'status'>;

export function UserProfileHeader({ user }: { user: HeaderUser }) {
  return (
    <WFCard>
      <View style={{ alignItems: 'center' }}>
        <WFAvatar uri={user.profilePhotoUrl} name={user.fullName} size={92} />
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '900', marginTop: 12, textAlign: 'center' }}>{user.fullName}</Text>
        <Text style={{ color: colors.muted, marginTop: 4 }}>{user.email}</Text>
        <View style={{ marginTop: 10 }}>
          <UserStatusBadge status={user.status} />
        </View>
      </View>
    </WFCard>
  );
}
