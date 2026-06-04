import { MESSAGES } from '@/constants/messages';
import { WFOfflineBanner as BaseWFOfflineBanner } from './WFPrimitives';

export function WFOfflineBanner({ message = MESSAGES.offlineBanner }: { message?: string }) {
  return <BaseWFOfflineBanner message={message} />;
}
