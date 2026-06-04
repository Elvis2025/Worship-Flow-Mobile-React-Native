import { Text } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { WFCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';

export function UserAvailabilityPreview() {
  return (
    <WFCard>
      <Text style={{ color: colors.text, fontWeight: '900' }}>Disponibilidad</Text>
      <Text style={{ color: colors.muted, marginTop: 6 }}>{MESSAGES.availabilityPlaceholder}</Text>
    </WFCard>
  );
}
