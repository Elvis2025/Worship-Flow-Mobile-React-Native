import { Pressable, ScrollView, Text, View } from 'react-native';
import { WFSearchBar, WFBadge } from '@/shared/components/WFPrimitives';
import { colors } from '@/theme/colors';
import { MusicalInstrument, VocalRange } from '../types/instrument.types';
import { UserFilters as Filters, UserStatus } from '../types/user.types';
import { formatInstrument, formatStatus, formatVocalRange } from '../utils/userFormatters';

export function UserFilters({ filters, onChange }: { filters: Filters; onChange: (filters: Filters) => void }) {
  return (
    <View>
      <WFSearchBar value={filters.search} onChangeText={(search) => onChange({ ...filters, search, page: 1 })} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.muted, marginRight: 8 }}>Estado</Text>
          {Object.values(UserStatus).map((status) => (
            <Pressable key={status} onPress={() => onChange({ ...filters, status: filters.status === status ? null : status, page: 1 })}>
              <WFBadge label={formatStatus(status)} tone={filters.status === status ? 'success' : 'default'} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.muted, marginRight: 8 }}>Instrumento</Text>
          {Object.values(MusicalInstrument).slice(0, 8).map((instrument) => (
            <Pressable key={instrument} onPress={() => onChange({ ...filters, instrument: filters.instrument === instrument ? null : instrument, page: 1 })}>
              <WFBadge label={formatInstrument(instrument)} tone={filters.instrument === instrument ? 'success' : 'default'} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.muted, marginRight: 8 }}>Rango</Text>
          {Object.values(VocalRange).map((vocalRange) => (
            <Pressable key={vocalRange} onPress={() => onChange({ ...filters, vocalRange: filters.vocalRange === vocalRange ? null : vocalRange, page: 1 })}>
              <WFBadge label={formatVocalRange(vocalRange)} tone={filters.vocalRange === vocalRange ? 'success' : 'default'} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
