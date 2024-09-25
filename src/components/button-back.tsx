'use client';
import { Icon } from '@/lib/icons';
import { Button } from '../../../g-hair-front/src/components/ui/button';
import { TooltipWrapper } from './tooltip';
import { useRouter } from 'next/navigation';

export function ButtonBack() {
  const { back } = useRouter();
  return (
    <TooltipWrapper description="Voltar">
      <Button
        onClick={back}
        variant={'outline'}
        className="rounded-md py-1 px-1 h-fit"
      >
        <Icon.backButton size={20} />
      </Button>
    </TooltipWrapper>
  );
}
