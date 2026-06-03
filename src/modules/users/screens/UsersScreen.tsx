import NetInfo from '@react-native-community/netinfo';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { WFButton, WFEmptyState, WFErrorState, WFOfflineBanner, WFSkeletonUserCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { UserFilters } from '../components/UserFilters';
import { UserListItem } from '../components/UserListItem';
import { useUserFilters } from '../hooks/useUserFilters';
import { useUserPermissions } from '../hooks/useUserPermissions';
import { useUsers } from '../hooks/useUsers';
import { MESSAGES } from '@/constants/messages';

export function UsersScreen() { const { filters, setFilters } = useUserFilters(); const permissions = useUserPermissions(); const query = useUsers(filters); const [offline, setOffline] = useState(false); useEffect(() => NetInfo.addEventListener(s => setOffline(!s.isConnected)), []); if (!permissions.canViewUsers) return <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}><WFErrorState message={MESSAGES.unauthorized} /></View>; return <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}><Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>Usuarios</Text>{offline ? <WFOfflineBanner /> : null}<UserFilters filters={filters} onChange={setFilters} />{query.isLoading ? <><WFSkeletonUserCard /><WFSkeletonUserCard /></> : query.isError ? <WFErrorState message={MESSAGES.genericError} onRetry={() => query.refetch()} /> : <FlatList data={query.data?.items ?? []} keyExtractor={item => item.id} refreshing={query.isFetching} onRefresh={query.refetch} ListEmptyComponent={<WFEmptyState title={MESSAGES.usersEmpty} />} renderItem={({ item }) => <UserListItem user={item} onPress={() => router.push(`/users/${item.id}`)} />} onEndReached={() => query.data?.hasNextPage && setFilters({ ...filters, page: filters.page + 1 })} />}{permissions.canCreateUsers ? <WFButton onPress={() => router.push('/users/create')}>Crear Usuario</WFButton> : null}</View>; }
