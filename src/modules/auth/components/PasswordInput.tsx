import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { WFInput } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';

export function PasswordInput({ value, onChangeText, error }: { value?: string; onChangeText?: (value: string) => void; error?: string }) {
  const [secure, setSecure] = useState(true);

  return (
    <View>
      <WFInput label="Contraseña" value={value} onChangeText={onChangeText} secureTextEntry={secure} error={error} />
      <Pressable onPress={() => setSecure((current) => !current)} style={{ position: 'absolute', right: 12, top: 36 }}>
        <Text style={{ color: colors.primary, fontWeight: '800' }}>{secure ? 'Ver' : 'Ocultar'}</Text>
      </Pressable>
    </View>
  );
}
