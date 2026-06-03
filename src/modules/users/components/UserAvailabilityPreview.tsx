import { Text } from 'react-native';
import { WFCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
export function UserAvailabilityPreview() { return <WFCard><Text style={{ color: colors.text, fontWeight: '800' }}>Disponibilidad</Text><Text style={{ color: colors.muted, marginTop: 6 }}>Vista básica preparada para el calendario musical.</Text></WFCard>; }
