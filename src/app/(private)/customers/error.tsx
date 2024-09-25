'use client';

import WarnMessage from '@/components/warn-message';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return <WarnMessage reset={reset} message={error.message} />;
}
