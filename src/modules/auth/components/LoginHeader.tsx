import { Text, View } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { colors } from '@/theme/colors';

export function LoginHeader() {
  return (
    <View style={{ marginBottom: 28 }}>
      <Text style={{ color: colors.text, fontSize: 38, fontWeight: '900' }}>{MESSAGES.appName}</Text>
      <Text style={{ color: colors.muted, fontSize: 16, marginTop: 8 }}>{MESSAGES.loginSubtitle}</Text>
    </View>
  );
}
