import { MusicalInstrument, VocalRange } from '../types/instrument.types';
import { UserStatus } from '../types/user.types';

const labelMap: Record<string, string> = {
  ElectricGuitar: 'Guitarra eléctrica',
  AcousticGuitar: 'Guitarra acústica',
  MainVoice: 'Voz principal',
  FirstBackingVoice: 'Primera voz de apoyo',
  SecondBackingVoice: 'Segunda voz de apoyo',
  ThirdBackingVoice: 'Tercera voz de apoyo',
  SoundTechnician: 'Técnico de sonido',
  ProjectionTechnician: 'Técnico de proyección',
  LogisticsCoordinator: 'Coordinación logística',
};

export function formatInstrument(value?: MusicalInstrument | null): string {
  if (!value) return 'Sin instrumento';
  return labelMap[value] ?? value;
}

export function formatVocalRange(value?: VocalRange | null): string {
  if (!value) return 'No definido';
  return labelMap[value] ?? value.replace(/([A-Z])/g, ' $1').trim();
}

export function formatStatus(status: UserStatus): string {
  return {
    [UserStatus.Active]: 'Activo',
    [UserStatus.Inactive]: 'Inactivo',
    [UserStatus.Suspended]: 'Suspendido',
    [UserStatus.PendingInvitation]: 'Invitación pendiente',
  }[status];
}

export function formatDate(value?: string | null): string {
  if (!value) return 'No disponible';
  return new Date(value).toLocaleDateString();
}
