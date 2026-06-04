import { WFBadge } from '@/shared/components/WFPrimitives';
import { MusicalInstrument } from '../types/instrument.types';
import { formatInstrument } from '../utils/userFormatters';

export function UserInstrumentChip({ instrument }: { instrument?: MusicalInstrument | null }) {
  return <WFBadge label={formatInstrument(instrument)} />;
}
