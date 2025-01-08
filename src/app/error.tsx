'use client';

import { Button } from '@/components/ui/button';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 w-full h-screen justify-center items-center">
      <p className="text-2xl">Algo deu errado, </p>
      <Button onClick={() => reset()}>Tente novamente</Button>
    </div>
  );
}
