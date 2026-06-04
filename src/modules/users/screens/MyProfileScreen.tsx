import { router } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { useLogout } from '@/modules/auth/hooks/useLogout';
import { WFButton, WFCard } from '@/shared/components/WFPrimitives';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { UserRoleBadge } from '../components/UserRoleBadge';
import { UserStatus } from '../types/user.types';

export function MyProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  if (!user) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <UserProfileHeader user={{ ...user, status: UserStatus.Active }} />
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Contacto y perfil</Text>
        <Text style={{ color: colors.muted }}>{user.phone ?? 'Sin teléfono registrado'}</Text>
      </WFCard>
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Mis roles</Text>
        {user.roles.map((role) => <UserRoleBadge key={role.id} name={role.name} />)}
      </WFCard>
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Accesos rápidos</Text>
        <Text style={{ color: colors.muted }}>{MESSAGES.quickActions.assignedSongs} · {MESSAGES.quickActions.placeholder}</Text>
        <Text style={{ color: colors.muted }}>{MESSAGES.quickActions.rehearsals} · {MESSAGES.quickActions.placeholder}</Text>
        <Text style={{ color: colors.muted }}>{MESSAGES.quickActions.availability} · {MESSAGES.quickActions.placeholder}</Text>
        <Text style={{ color: colors.muted }}>{MESSAGES.quickActions.settings} · {MESSAGES.quickActions.placeholder}</Text>
      </WFCard>
      <WFButton onPress={() => router.push('/profile/edit')}>Editar mi perfil</WFButton>
      <WFButton variant="danger" loading={logout.isPending} onPress={() => logout.mutate()}>{MESSAGES.logout}</WFButton>
    </ScrollView>
  );
}
