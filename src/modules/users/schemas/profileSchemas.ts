import { z } from 'zod';
import { MusicalInstrument, MusicalKey, VocalRange } from '../types/instrument.types';
export const editProfileSchema = z.object({ firstName: z.string().min(1, 'El nombre es requerido.'), lastName: z.string().min(1, 'El apellido es requerido.'), phone: z.string().optional(), mainInstrument: z.nativeEnum(MusicalInstrument).optional(), secondaryInstruments: z.array(z.nativeEnum(MusicalInstrument)).default([]), vocalRange: z.nativeEnum(VocalRange).optional(), comfortableKey: z.nativeEnum(MusicalKey).optional() });
export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
