import { Text, View } from 'react-native';
import { WFCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';

export default function HomeRoute() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>Worship Flow</Text>
      <WFCard>
        <Text style={{ color: colors.muted }}>M1 Usuarios, autenticación, roles, permisos y perfil está disponible.</Text>
      </WFCard>
    </View>
  );
}
