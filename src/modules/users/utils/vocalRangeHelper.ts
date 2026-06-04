import { VocalRange } from '../types/instrument.types';

export const vocalRangeDescriptions: Record<VocalRange, string> = {
  [VocalRange.Soprano]: 'Voz aguda femenina.',
  [VocalRange.MezzoSoprano]: 'Voz media femenina.',
  [VocalRange.Alto]: 'Voz grave femenina.',
  [VocalRange.Tenor]: 'Voz aguda masculina.',
  [VocalRange.Baritone]: 'Voz media masculina.',
  [VocalRange.Bass]: 'Voz grave masculina.',
  [VocalRange.Unknown]: 'Rango vocal sin clasificar.',
};
