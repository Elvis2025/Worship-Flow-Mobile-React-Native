import { z } from 'zod';
import { MusicalInstrument, MusicalKey, VocalRange } from '../types/instrument.types';
import { UserStatus } from '../types/user.types';
export const createUserSchema = z.object({ firstName: z.string().min(1, 'El nombre es requerido.'), lastName: z.string().min(1, 'El apellido es requerido.'), email: z.string().min(1, 'El email es requerido.').email('Ingresa un email válido.'), phone: z.string().optional(), mainInstrument: z.nativeEnum(MusicalInstrument, { errorMap: () => ({ message: 'El instrumento principal es requerido.' }) }), secondaryInstruments: z.array(z.nativeEnum(MusicalInstrument)).default([]), vocalRange: z.nativeEnum(VocalRange).optional(), comfortableKey: z.nativeEnum(MusicalKey).optional(), roleIds: z.array(z.string()).min(1, 'Selecciona al menos un rol.'), status: z.nativeEnum(UserStatus) });
export const editUserSchema = createUserSchema.partial().extend({ id: z.string().min(1) });
export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type EditUserFormValues = z.infer<typeof editUserSchema>;
