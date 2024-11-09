import { Separator } from '@/components/ui/separator';
import { Icon } from '@/lib/icons';
import type { Metadata } from 'next';
import React from 'react';
import { ClientContent } from './_components/client-content';
import { api } from '@/lib/fetcher/fetch';
import { auth } from '@/lib/auth';
import type { SchedulingRequest } from '@/types/requests';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'Agendamento | G-Hair',
  description: 'Pagina de agendamento da G-Hair',
};

export default async function Page() {
  const session = await getServerSession();
  const response = await api.get<SchedulingRequest[]>('/agendamentos', {
    bearer: session?.user.token,
    cache: ['schedule-cache'],
  });

  return (
    <ClientContent>
      {response.map((calendar, i) => (
        <div
          key={i as number}
          className="h-fit rounded-xl hover:bg-muted hover:text-foreground hover:ease-in-out duration-300 hover:cursor-pointer bg-white"
        >
          <div className="bg-muted p-2 rounded-t-xl ">
            <div className="text-sm flex gap-2 items-center">
              <Icon.clock className="h-4 w-4" />
              {calendar.data_hora}
              <Separator orientation="vertical" className="h-4" />
              <span className="font-semibold">{calendar.nome_cliente}</span>
            </div>
          </div>
          <div className="flex flex-col text-black hover:text-foreground hover:ease-in-out duration-100 gap-4 my-2 p-2 text-xs">
            <div className="flex items-center gap-2">
              <Icon.service className="h-4 w-4" />
              <span>{calendar.nome_tipo_servico}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon.contact className="h-4 w-4" />
              <span>{calendar.nome_funcionario}</span>
            </div>
            <Separator className="mx-0" />
            <div className="flex items-start gap-2">
              <Icon.notedPad className="h-4 w-4" />
              <span>{calendar.valor_tipo_servico}</span>
            </div>
          </div>
        </div>
      ))}
    </ClientContent>
  );
}
