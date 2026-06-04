import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { WFButton, WFInput } from '@/shared/components/WFPrimitives';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';
import { ProfilePhotoPicker } from '../components/ProfilePhotoPicker';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { EditProfileFormValues, editProfileSchema } from '../schemas/profileSchemas';

export function EditProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useUpdateProfile();
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      phone: user?.phone ?? '',
      secondaryInstruments: [],
    },
  });

  if (!user) return null;

  const submit = form.handleSubmit(async (values) => {
    await updateProfile.mutateAsync({ id: user.id, ...values });
    Alert.alert(MESSAGES.appName, MESSAGES.profileUpdated);
    router.back();
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '900', marginBottom: 16 }}>Editar mi perfil</Text>
      <ProfilePhotoPicker userId={user.id} currentUrl={user.profilePhotoUrl} />
      <Controller control={form.control} name="firstName" render={({ field, fieldState }) => <WFInput label="Nombre" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <Controller control={form.control} name="lastName" render={({ field, fieldState }) => <WFInput label="Apellido" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <WFInput label="Email" value={user.email} editable={false} />
      <Controller control={form.control} name="phone" render={({ field, fieldState }) => <WFInput label="Teléfono" value={field.value ?? ''} onChangeText={field.onChange} error={fieldState.error?.message} />} />
      <WFInput label="Instrumento principal" value={form.watch('mainInstrument') ?? 'No definido'} editable={false} />
      <WFInput label="Rango vocal" value={form.watch('vocalRange') ?? 'No definido'} editable={false} />
      <WFInput label="Tonalidad cómoda" value={form.watch('comfortableKey') ?? 'No definida'} editable={false} />
      {updateProfile.error ? <Text style={{ color: colors.danger }}>{updateProfile.error.message}</Text> : null}
      <WFButton loading={updateProfile.isPending} onPress={submit}>Guardar perfil</WFButton>
    </ScrollView>
  );
}
