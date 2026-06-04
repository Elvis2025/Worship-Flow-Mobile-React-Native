import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { MESSAGES } from '@/constants/messages';
import { WFButton, WFErrorState, WFInput, WFSkeletonUserCard } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { profileService } from '../services/profileService';
import { UserAvailability } from '../types/user.types';

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function buildInitialAvailability(userId: string): UserAvailability[] {
  return days.map((_, weekday) => ({
    id: `${userId}-${weekday}`,
    userId,
    weekday,
    isAvailable: false,
    fromTime: '18:00',
    toTime: '21:00',
    note: '',
  }));
}

export function UserAvailabilityScreen({ id }: { id: string }) {
  const [items, setItems] = useState<UserAvailability[]>(() => buildInitialAvailability(id));
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAvailability = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const availability = await profileService.getAvailability(id);
      if (availability.length > 0) setItems(availability);
    } catch {
      setError(MESSAGES.genericError);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  function updateItem(weekday: number, patch: Partial<UserAvailability>) {
    setItems((currentItems) => currentItems.map((item) => (item.weekday === weekday ? { ...item, ...patch } : item)));
  }

  async function save() {
    setIsSaving(true);
    try {
      await profileService.updateAvailability(id, items);
      Alert.alert(MESSAGES.appName, MESSAGES.availabilitySaved);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
        <WFSkeletonUserCard />
        <WFSkeletonUserCard />
      </ScrollView>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
        <WFErrorState message={error} onRetry={loadAvailability} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '900' }}>Disponibilidad</Text>
      {items.map((item) => (
        <View key={item.weekday} style={{ borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 14, marginVertical: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.text, fontWeight: '800' }}>{days[item.weekday]}</Text>
            <Switch value={item.isAvailable} onValueChange={(isAvailable) => updateItem(item.weekday, { isAvailable })} />
          </View>
          <WFInput label="Desde" value={item.fromTime ?? ''} onChangeText={(fromTime) => updateItem(item.weekday, { fromTime })} />
          <WFInput label="Hasta" value={item.toTime ?? ''} onChangeText={(toTime) => updateItem(item.weekday, { toTime })} />
          <WFInput label="Nota" value={item.note ?? ''} onChangeText={(note) => updateItem(item.weekday, { note })} />
        </View>
      ))}
      <WFButton loading={isSaving} onPress={save}>Guardar disponibilidad</WFButton>
    </ScrollView>
  );
}
