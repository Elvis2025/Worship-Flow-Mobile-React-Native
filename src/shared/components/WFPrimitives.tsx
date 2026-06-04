import { PropsWithChildren, ReactNode } from 'react';
import { ActivityIndicator, Image, Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/theme/colors';

export type WFTone = 'default' | 'success' | 'warning' | 'danger';

type WFButtonProps = PropsWithChildren<{
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'ghost' | 'danger';
}>;

export function WFButton({ children, onPress, loading = false, disabled = false, variant = 'primary' }: WFButtonProps) {
  const backgroundColor = variant === 'danger' ? colors.danger : variant === 'ghost' ? 'transparent' : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        opacity: disabled ? 0.5 : 1,
        backgroundColor,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        alignItems: 'center',
        marginVertical: 6,
      }}
    >
      {loading ? <ActivityIndicator color={colors.text} /> : <Text style={{ color: colors.text, fontWeight: '800' }}>{children}</Text>}
    </Pressable>
  );
}

export function WFInput({ label, error, ...props }: TextInputProps & { label?: string; error?: string }) {
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? <Text style={{ color: colors.muted, marginBottom: 6, fontWeight: '700' }}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#64748B"
        {...props}
        style={[
          {
            color: colors.text,
            borderColor: error ? colors.danger : colors.border,
            borderWidth: 1,
            borderRadius: 14,
            padding: 12,
            backgroundColor: colors.surfaceAlt,
          },
          props.style,
        ]}
      />
      {error ? <Text style={{ color: colors.danger, marginTop: 4 }}>{error}</Text> : null}
    </View>
  );
}

export function WFCard({ children, footer }: PropsWithChildren<{ footer?: ReactNode }>) {
  return (
    <View
      style={{
        backgroundColor: 'rgba(17, 21, 42, 0.92)',
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 22,
        padding: 16,
        marginVertical: 8,
      }}
    >
      {children}
      {footer}
    </View>
  );
}

export function WFBadge({ label, tone = 'default' }: { label: string; tone?: WFTone }) {
  const backgroundColor = {
    default: colors.chip,
    success: 'rgba(34, 197, 94, 0.18)',
    warning: 'rgba(245, 158, 11, 0.18)',
    danger: 'rgba(239, 68, 68, 0.18)',
  }[tone];

  return (
    <View style={{ backgroundColor, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', margin: 2 }}>
      <Text style={{ color: colors.text, fontSize: 12, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}

export function WFAvatar({ uri, name, size = 48 }: { uri?: string | null; name: string; size?: number }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (uri) {
    return <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: colors.text, fontWeight: '900' }}>{initials || 'WF'}</Text>
    </View>
  );
}

export function WFSearchBar(props: TextInputProps) {
  return <WFInput placeholder="Buscar por nombre, correo o instrumento" {...props} />;
}

export function WFEmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <WFCard>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800', textAlign: 'center' }}>{title}</Text>
      {subtitle ? <Text style={{ color: colors.muted, marginTop: 6, textAlign: 'center' }}>{subtitle}</Text> : null}
    </WFCard>
  );
}

export function WFErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <WFCard>
      <Text style={{ color: colors.danger, textAlign: 'center', marginBottom: 10 }}>{message}</Text>
      {onRetry ? <WFButton onPress={onRetry}>Reintentar</WFButton> : null}
    </WFCard>
  );
}

export function WFOfflineBanner({ message }: { message: string }) {
  return (
    <View style={{ backgroundColor: 'rgba(245, 158, 11, 0.16)', borderColor: colors.warning, borderWidth: 1, padding: 10, borderRadius: 14, marginVertical: 8 }}>
      <Text style={{ color: colors.text }}>{message}</Text>
    </View>
  );
}

export function WFSkeletonUserCard() {
  return (
    <WFCard>
      <View style={{ height: 18, width: '60%', backgroundColor: colors.surfaceAlt, borderRadius: 8, marginBottom: 12 }} />
      <View style={{ height: 14, width: '85%', backgroundColor: colors.surfaceAlt, borderRadius: 8 }} />
    </WFCard>
  );
}

export function WFModal({ children }: PropsWithChildren) {
  return <WFCard>{children}</WFCard>;
}
