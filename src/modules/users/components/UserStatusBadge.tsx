import { WFBadge } from '@/shared/components/WFPrimitives';
import { UserStatus } from '../types/user.types';
import { formatStatus } from '../utils/userFormatters';

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const tone = status === UserStatus.Active ? 'success' : status === UserStatus.PendingInvitation ? 'warning' : status === UserStatus.Suspended ? 'danger' : 'default';
  return <WFBadge label={formatStatus(status)} tone={tone} />;
}
