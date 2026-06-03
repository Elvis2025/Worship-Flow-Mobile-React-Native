import { Text, View } from 'react-native';
import { colors } from '@/theme/colors';
export default function ForgotPasswordRoute() { return <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' }}><Text style={{ color: colors.text, fontSize: 24, fontWeight: '900' }}>Recuperación de contraseña</Text><Text style={{ color: colors.muted, marginTop: 8 }}>Funcionalidad preparada para el API de autenticación.</Text></View>; }
