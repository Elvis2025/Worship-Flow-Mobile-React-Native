import { Text, View } from 'react-native';
import { WFAvatar, WFCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { UserDto } from '../types/user.types';
import { UserStatusBadge } from './UserStatusBadge';
export function UserProfileHeader({ user }: { user: Pick<UserDto, 'fullName' | 'email' | 'profilePhotoUrl' | 'status'> }) { return <WFCard><View style={{ alignItems: 'center' }}><WFAvatar uri={user.profilePhotoUrl} name={user.fullName} size={92} /><Text style={{ color: colors.text, fontSize: 24, fontWeight: '900', marginTop: 12 }}>{user.fullName}</Text><Text style={{ color: colors.muted }}>{user.email}</Text><View style={{ marginTop: 8 }}><UserStatusBadge status={user.status} /></View></View></WFCard>; }
