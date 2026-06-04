import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { WFButton, WFInput } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { useCreateUser } from '../hooks/useCreateUser';
import { CreateUserFormValues, createUserSchema } from '../schemas/userSchemas';
import { MusicalInstrument, MusicalKey, VocalRange } from '../types/instrument.types';
import { UserStatus } from '../types/user.types';

export function CreateUserScreen() {
  const createUser = useCreateUser();
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      mainInstrument: MusicalInstrument.MainVoice,
      secondaryInstruments: [],
      vocalRange: VocalRange.Unknown,
      comfortableKey: MusicalKey.C,
      roleIds: ['member'],
      status: UserStatus.PendingInvitation,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    const user = await createUser.mutateAsync(values);
    Alert.alert(MESSAGES.appName, MESSAGES.userSaved);
    router.replace(`/users/${user.id}`);
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '900', marginBottom: 16 }}>Crear Usuario</Text>
      <Controller control={form.control} name="firstName" render={({ field, fieldState }) => <WFInput label="Nombre" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <Controller control={form.control} name="lastName" render={({ field, fieldState }) => <WFInput label="Apellido" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <Controller control={form.control} name="email" render={({ field, fieldState }) => <WFInput label="Email" autoCapitalize="none" keyboardType="email-address" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <Controller control={form.control} name="phone" render={({ field, fieldState }) => <WFInput label="Teléfono" keyboardType="phone-pad" value={field.value ?? ''} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <WFInput label="Instrumento principal" value={form.watch('mainInstrument')} editable={false} />
      <WFInput label="Rango vocal" value={form.watch('vocalRange') ?? ''} editable={false} />
      <WFInput label="Tonalidad cómoda" value={form.watch('comfortableKey') ?? ''} editable={false} />
      <WFInput label="Rol inicial" value="member" editable={false} />
      <WFInput label="Estado" value={form.watch('status')} editable={false} />
      {createUser.error ? <Text style={{ color: colors.danger }}>{createUser.error.message}</Text> : null}
      <WFButton loading={createUser.isPending} onPress={submit}>Guardar usuario</WFButton>
    </ScrollView>
  );
}
