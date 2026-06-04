import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { WFButton, WFErrorState, WFInput, WFSkeletonUserCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUserDetail } from '../hooks/useUserDetail';
import { EditUserFormValues, editUserSchema } from '../schemas/userSchemas';

export function EditUserScreen({ id }: { id: string }) {
  const userQuery = useUserDetail(id);
  const updateUser = useUpdateUser();
  const user = userQuery.data;
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    values: user
      ? {
          id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone ?? '',
          mainInstrument: user.mainInstrument ?? undefined,
          secondaryInstruments: user.secondaryInstruments,
          vocalRange: user.vocalRange ?? undefined,
          comfortableKey: user.comfortableKey ?? undefined,
          status: user.status,
          roleIds: user.roles.map((role) => role.id),
          permissionCodes: user.permissions,
        }
      : undefined,
  });

  if (userQuery.isLoading) {
    return <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}><WFSkeletonUserCard /></ScrollView>;
  }

  if (!user) return <WFErrorState message="Usuario no encontrado." />;

  const submit = form.handleSubmit(async (values) => {
    await updateUser.mutateAsync(values);
    Alert.alert(MESSAGES.appName, MESSAGES.userSaved);
    router.back();
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '900', marginBottom: 16 }}>Editar Usuario</Text>
      <Controller control={form.control} name="firstName" render={({ field, fieldState }) => <WFInput label="Nombre" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <Controller control={form.control} name="lastName" render={({ field, fieldState }) => <WFInput label="Apellido" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <WFInput label="Email" value={user.email} editable={false} />
      <Controller control={form.control} name="phone" render={({ field, fieldState }) => <WFInput label="Teléfono" value={field.value ?? ''} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <WFInput label="Instrumento principal" value={form.watch('mainInstrument') ?? ''} editable={false} />
      <WFInput label="Roles" value={user.roles.map((role) => role.name).join(', ')} editable={false} />
      <WFInput label="Permisos" value={user.permissions.slice(0, 6).join(', ')} editable={false} />
      {updateUser.error ? <Text style={{ color: colors.danger }}>{updateUser.error.message}</Text> : null}
      <WFButton loading={updateUser.isPending} onPress={submit}>Guardar cambios</WFButton>
    </ScrollView>
  );
}
