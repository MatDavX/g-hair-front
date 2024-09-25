'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/lib/icons';

import React from 'react';
import { Button } from '../../../g-hair-front/src/components/ui/button';

export default function WarnMessage({
  message,
  reset
}: {
  message: string;
  reset?: () => void;
}) {
  const router = useRouter();

  return (
    <div className="border rounded-md p-4">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <Icon.triangleWarn size={120} className="text-muted-foreground" />
        <p className="text-xl">Ops, algo parece errado!</p>
        <p className="text-muted-foreground">
          Vamos garantir que você volte para tela inicial.
        </p>
        <Button onClick={() => (reset ? reset() : router.back())}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
