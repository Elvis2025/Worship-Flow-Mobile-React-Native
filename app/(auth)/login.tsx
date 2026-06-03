import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { WFButton, WFCard, WFInput } from '@/shared/components/WFPrimitives';
import { AuthFormContainer } from '@/modules/auth/components/AuthFormContainer';
import { LoginHeader } from '@/modules/auth/components/LoginHeader';
import { PasswordInput } from '@/modules/auth/components/PasswordInput';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { loginSchema, LoginFormValues } from '@/modules/auth/schemas/authSchemas';
import { MESSAGES } from '@/constants/messages';
import { colors } from '@/theme/colors';
export default function LoginRoute() { const login = useLogin(); const form = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', tenantSlug: '' } }); const submit = form.handleSubmit(values => login.mutate(values)); return <AuthFormContainer><LoginHeader /><WFCard><Controller control={form.control} name="email" render={({ field, fieldState }) => <WFInput label="Email" autoCapitalize="none" keyboardType="email-address" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} /><Controller control={form.control} name="password" render={({ field, fieldState }) => <PasswordInput value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} /><Controller control={form.control} name="tenantSlug" render={({ field, fieldState }) => <WFInput label="Tenant (opcional)" autoCapitalize="none" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />{login.error ? <Text style={{ color: colors.danger }}>{login.error.message}</Text> : null}<WFButton loading={login.isPending} onPress={submit}>{MESSAGES.login}</WFButton><Link href="/(auth)/forgot-password" style={{ color: colors.primary, textAlign: 'center', marginTop: 8 }}>{MESSAGES.forgotPassword}</Link></WFCard></AuthFormContainer>; }
