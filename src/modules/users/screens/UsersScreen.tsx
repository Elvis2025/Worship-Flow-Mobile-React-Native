import NetInfo from '@react-native-community/netinfo';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { WFButton, WFEmptyState, WFErrorState, WFOfflineBanner, WFSkeletonUserCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { UserFilters } from '../components/UserFilters';
import { UserListItem } from '../components/UserListItem';
import { useUserFilters } from '../hooks/useUserFilters';
import { useUserPermissions } from '../hooks/useUserPermissions';
import { useUsers } from '../hooks/useUsers';

export function UsersScreen() {
  const { filters, setFilters } = useUserFilters();
  const permissions = useUserPermissions();
  const usersQuery = useUsers(filters);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    return NetInfo.addEventListener((state) => setIsOffline(!state.isConnected));
  }, []);

  if (!permissions.canViewUsers) {
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
        <WFErrorState message={MESSAGES.unauthorized} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>Usuarios</Text>
      <Text style={{ color: colors.muted, marginBottom: 8 }}>Administra miembros, roles, permisos e instrumentos.</Text>
      {isOffline ? <WFOfflineBanner message={MESSAGES.offlineBanner} /> : null}
      <UserFilters filters={filters} onChange={setFilters} />
      {usersQuery.isLoading ? (
        <>
          <WFSkeletonUserCard />
          <WFSkeletonUserCard />
          <WFSkeletonUserCard />
        </>
      ) : usersQuery.isError ? (
        <WFErrorState message={MESSAGES.genericError} onRetry={() => usersQuery.refetch()} />
      ) : (
        <FlatList
          data={usersQuery.data?.items ?? []}
          keyExtractor={(item) => item.id}
          refreshing={usersQuery.isFetching}
          onRefresh={usersQuery.refetch}
          ListEmptyComponent={<WFEmptyState title={MESSAGES.usersEmpty} />}
          renderItem={({ item }) => <UserListItem user={item} onPress={() => router.push(`/users/${item.id}`)} />}
          onEndReached={() => {
            if (usersQuery.data?.hasNextPage) setFilters({ ...filters, page: filters.page + 1 });
          }}
        />
      )}
      {permissions.canCreateUsers ? <WFButton onPress={() => router.push('/users/create')}>Crear Usuario</WFButton> : null}
    </View>
  );
}
