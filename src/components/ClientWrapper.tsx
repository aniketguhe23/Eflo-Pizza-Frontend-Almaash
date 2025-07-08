'use client';

import { useFetchUser } from '@/app/hook/useFetchUser';
import SessionExpiredModal from '@/components/SessionExpiredModal';

export default function ClientWrapper() {
  const { isSessionExpired } = useFetchUser();

  return <SessionExpiredModal visible={isSessionExpired} />;
}
