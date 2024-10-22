'use client';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ContentPageFormatter } from '@/components/wrapper';
import { Icon } from '@/lib/icons';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function ClientContent({ children }: Props) {
  const [isHorizontal, setIsHorizontal] = React.useState(true);

  return (
    <ContentPageFormatter>
      <Header title="Agendamento">
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            data-ishorizontal={isHorizontal}
            className="p-2 h-fit w-fit data-[ishorizontal=true]:bg-accent/40"
            onClick={() => setIsHorizontal(true)}
          >
            <Icon.gridLayout className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="ghost"
            data-ishorizontal={isHorizontal}
            className="p-2 h-fit w-fit data-[ishorizontal=false]:bg-accent/40"
            onClick={() => setIsHorizontal(false)}
          >
            <Icon.stretchHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </Header>
      <p className="text-lg">20 de Outubro</p>
      <Separator />
      <div
        data-ishorizontal={isHorizontal}
        className="grid auto-rows-min gap-6 data-[ishorizontal=true]:md:grid-cols-4"
      >
        {children}
      </div>
    </ContentPageFormatter>
  );
}
