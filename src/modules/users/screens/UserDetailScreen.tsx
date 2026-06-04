import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { WFButton, WFCard, WFErrorState, WFBadge, WFSkeletonUserCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { UserAvailabilityPreview } from '../components/UserAvailabilityPreview';
import { UserInstrumentChip } from '../components/UserInstrumentChip';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { UserRoleBadge } from '../components/UserRoleBadge';
import { useUserDetail } from '../hooks/useUserDetail';
import { useUserPermissions } from '../hooks/useUserPermissions';
import { formatDate, formatVocalRange } from '../utils/userFormatters';

export function UserDetailScreen({ id }: { id: string }) {
  const userQuery = useUserDetail(id);
  const permissions = useUserPermissions();

  if (userQuery.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
        <WFSkeletonUserCard />
      </View>
    );
  }

  if (userQuery.isError || !userQuery.data) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
        <WFErrorState message="No se pudo cargar el usuario." onRetry={() => userQuery.refetch()} />
      </View>
    );
  }

  const user = userQuery.data;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <UserProfileHeader user={user} />
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Contacto</Text>
        <Text style={{ color: colors.muted }}>{user.email}</Text>
        <Text style={{ color: colors.muted }}>{user.phone ?? 'Sin teléfono'}</Text>
      </WFCard>
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Perfil musical</Text>
        <UserInstrumentChip instrument={user.mainInstrument} />
        <Text style={{ color: colors.muted }}>Secundarios: {user.secondaryInstruments.join(', ') || 'Ninguno'}</Text>
        <Text style={{ color: colors.muted }}>Rango vocal: {formatVocalRange(user.vocalRange)}</Text>
        <Text style={{ color: colors.muted }}>Tonalidad cómoda: {user.comfortableKey ?? 'No definida'}</Text>
      </WFCard>
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Roles</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {user.roles.map((role) => <UserRoleBadge key={role.id} name={role.name} />)}
        </View>
      </WFCard>
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Permisos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {user.permissions.slice(0, 12).map((permission) => <WFBadge key={permission} label={permission} />)}
        </View>
      </WFCard>
      <WFCard>
        <Text style={{ color: colors.text, fontWeight: '900' }}>Ingreso</Text>
        <Text style={{ color: colors.muted }}>{formatDate(user.joinedAt)}</Text>
      </WFCard>
      <UserAvailabilityPreview />
      <WFCard>
        <Text style={{ color: colors.muted }}>{MESSAGES.participationPlaceholder}</Text>
      </WFCard>
      {permissions.canEditUsers ? <WFButton onPress={() => router.push(`/users/edit/${user.id}`)}>Editar usuario</WFButton> : null}
      <WFButton variant="ghost" onPress={() => router.push(`/users/availability/${user.id}`)}>Disponibilidad</WFButton>
    </ScrollView>
  );
}
