import { Pressable, Text, View } from 'react-native';
import { WFAvatar, WFCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { UserDto } from '../types/user.types';
import { formatDate, formatInstrument } from '../utils/userFormatters';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';

export function UserCard({ user, onPress }: { user: UserDto; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <WFCard>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <WFAvatar uri={user.profilePhotoUrl} name={user.fullName} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: '900', fontSize: 17 }}>{user.fullName}</Text>
            <Text style={{ color: colors.muted, marginTop: 2 }}>
              {formatInstrument(user.mainInstrument)} · Último acceso {formatDate(user.lastLoginAt)}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {user.roles.slice(0, 2).map((role) => (
                <UserRoleBadge key={role.id} name={role.name} />
              ))}
              <UserStatusBadge status={user.status} />
            </View>
          </View>
        </View>
      </WFCard>
    </Pressable>
  );
}
