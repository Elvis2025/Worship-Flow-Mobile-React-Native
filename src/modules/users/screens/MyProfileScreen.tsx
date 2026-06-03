import { router } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { WFButton, WFCard } from '@/shared/components/WFPrimitives';
import { useLogout } from '@/modules/auth/hooks/useLogout';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { UserRoleBadge } from '../components/UserRoleBadge';
import { UserStatus } from '../types/user.types';
export function MyProfileScreen() { const user = useAuthStore(s => s.user); const logout = useLogout(); if (!user) return null; const headerUser = { ...user, status: UserStatus.Active, mainInstrument: null, secondaryInstruments: [] }; return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}><UserProfileHeader user={headerUser} /><WFCard><Text style={{ color: colors.text, fontWeight: '900' }}>Mis roles</Text>{user.roles.map(role => <UserRoleBadge key={role.id} name={role.name} />)}</WFCard><WFCard><Text style={{ color: colors.text, fontWeight: '900' }}>Accesos rápidos</Text><Text style={{ color: colors.muted }}>Mis canciones asignadas · Placeholder</Text><Text style={{ color: colors.muted }}>Mis ensayos · Placeholder</Text><Text style={{ color: colors.muted }}>Mi disponibilidad · Placeholder</Text><Text style={{ color: colors.muted }}>Configuración · Placeholder</Text></WFCard><WFButton onPress={() => router.push('/profile/edit')}>Editar mi perfil</WFButton><WFButton variant="danger" loading={logout.isPending} onPress={() => logout.mutate()}>Cerrar sesión</WFButton></ScrollView>; }
