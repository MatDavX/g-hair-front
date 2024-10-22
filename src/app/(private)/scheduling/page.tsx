import { Separator } from '@/components/ui/separator';
import { Icon } from '@/lib/icons';
import type { Metadata } from 'next';
import React from 'react';
import { ClientContent } from './_components/client-content';

export const metadata: Metadata = {
  title: 'Agendamento | G-Hair',
  description: 'Pagina de agendamento da G-Hair',
};

export default function Page() {
  const data = [
    {
      time: '10:45',
      client: 'Luis Davel',
      service: 'Corte de cabelo',
      employee: 'João Thomas',
      notes: 'Servico X com cuidado e carinho',
    },
    {
      time: '11:00',
      client: 'Jonatan',
      service: 'Corte de cabelo',
      employee: 'João Thomas',
      notes: 'Servico X com cuidado e carinho',
    },
    {
      time: '12:00',
      client: 'Caique',
      service: 'Corte de cabelo',
      employee: 'João Thomas',
      notes: 'Servico X com cuidado e carinho',
    },
    {
      time: '13:00',
      client: 'Cleber',
      service: 'Corte de cabelo',
      employee: 'João Thomas',
      notes: 'Servico X com cuidado e carinho',
    },
    {
      time: '14:00',
      client: 'Leo',
      service: 'Corte de cabelo',
      employee: 'João Thomas',
      notes: 'Servico X com cuidado e carinho',
    },
    {
      time: '10:45',
      client: 'Luis Davel',
      service: 'Corte de cabelo',
      employee: 'João Thomas',
      notes: 'Servico X com cuidado e carinho',
    },
  ];

  return (
    <ClientContent>
      {data.map((calendar, i) => (
        <div
          key={i as number}
          className="h-fit rounded-xl hover:bg-muted hover:text-foreground hover:ease-in-out duration-300 hover:cursor-pointer bg-white"
        >
          <div className="bg-muted p-2 rounded-t-xl ">
            <div className="text-sm flex gap-2 items-center">
              <Icon.clock className="h-4 w-4" />
              {calendar.time}
              <Separator orientation="vertical" className="h-4" />
              <span className="font-semibold">{calendar.client}</span>
            </div>
          </div>
          <div className="flex flex-col text-black hover:text-foreground hover:ease-in-out duration-100 gap-4 my-2 p-2 text-xs">
            <div className="flex items-center gap-2">
              <Icon.service className="h-4 w-4" />
              <span>{calendar.service}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon.contact className="h-4 w-4" />
              <span>{calendar.employee}</span>
            </div>
            <Separator className="mx-0" />
            <div className="flex items-start gap-2">
              <Icon.notedPad className="h-4 w-4" />
              <span>{calendar.notes}</span>
            </div>
          </div>
        </div>
      ))}
    </ClientContent>
  );
}
