import { z } from 'zod';
import { MusicalInstrument, MusicalKey, VocalRange } from '../types/instrument.types';
import { UserStatus } from '../types/user.types';

const optionalPhone = z.string().trim().optional().transform((value) => value || undefined);

export const createUserSchema = z.object({
  firstName: z.string().trim().min(1, 'El nombre es requerido.'),
  lastName: z.string().trim().min(1, 'El apellido es requerido.'),
  email: z.string().trim().min(1, 'El email es requerido.').email('Ingresa un email válido.'),
  phone: optionalPhone,
  mainInstrument: z.nativeEnum(MusicalInstrument, { message: 'El instrumento principal es requerido.' }),
  secondaryInstruments: z.array(z.nativeEnum(MusicalInstrument)).default([]),
  vocalRange: z.nativeEnum(VocalRange).optional().nullable(),
  comfortableKey: z.nativeEnum(MusicalKey).optional().nullable(),
  roleIds: z.array(z.string()).min(1, 'Selecciona al menos un rol.'),
  permissionCodes: z.array(z.string()).optional(),
  status: z.nativeEnum(UserStatus, { message: 'El estado es requerido.' }),
});

export const editUserSchema = createUserSchema.partial().extend({
  id: z.string().min(1),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type EditUserFormValues = z.infer<typeof editUserSchema>;
