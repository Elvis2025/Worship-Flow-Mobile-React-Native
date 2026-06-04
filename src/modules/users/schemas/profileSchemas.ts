import { z } from 'zod';
import { MusicalInstrument, MusicalKey, VocalRange } from '../types/instrument.types';

export const editProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'El nombre es requerido.'),
  lastName: z.string().trim().min(1, 'El apellido es requerido.'),
  phone: z.string().trim().optional().transform((value) => value || undefined),
  mainInstrument: z.nativeEnum(MusicalInstrument).optional().nullable(),
  secondaryInstruments: z.array(z.nativeEnum(MusicalInstrument)).default([]),
  vocalRange: z.nativeEnum(VocalRange).optional().nullable(),
  comfortableKey: z.nativeEnum(MusicalKey).optional().nullable(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
