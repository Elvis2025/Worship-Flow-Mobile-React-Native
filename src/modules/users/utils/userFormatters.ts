import { MusicalInstrument, VocalRange } from '../types/instrument.types';
import { UserStatus } from '../types/user.types';
export const formatInstrument = (value?: MusicalInstrument | null) => value ? value.replace(/([A-Z])/g, ' $1').trim() : 'Sin instrumento';
export const formatVocalRange = (value?: VocalRange | null) => value ? value.replace(/([A-Z])/g, ' $1').trim() : 'No definido';
export const formatStatus = (status: UserStatus) => ({ Active: 'Activo', Inactive: 'Inactivo', Suspended: 'Suspendido', PendingInvitation: 'Invitación pendiente' }[status]);
export const formatDate = (value?: string | null) => value ? new Date(value).toLocaleDateString() : 'No disponible';
