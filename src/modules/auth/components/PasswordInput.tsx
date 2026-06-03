import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { WFInput } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
export function PasswordInput({ value, onChangeText, error }: { value?: string; onChangeText?: (text: string) => void; error?: string }) { const [secure, setSecure] = useState(true); return <View><WFInput label="Contraseña" value={value} onChangeText={onChangeText} secureTextEntry={secure} error={error} /><Pressable onPress={() => setSecure(v => !v)} style={{ position: 'absolute', right: 12, top: 36 }}><Text style={{ color: colors.primary }}>{secure ? 'Ver' : 'Ocultar'}</Text></Pressable></View>; }
