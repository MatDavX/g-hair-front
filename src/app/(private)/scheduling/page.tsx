import { Header } from '@/components/header';
import type { SchedulingRequest } from '@/types/response';
// import type { PageProps } from '@/types/type';
import React from 'react';
import { getCustomers } from '@/http/getCustomers';
import { getEmployers } from '@/http/getEmployers';
import { getServices } from '@/http/getServices';
import { EditSchedulingDialog } from './component/dialog-edit-scheduling';
import { api } from '@/lib/ky';

export default async function Page({
  searchParams,
}: {
  searchParams: any;
}) {
  const param = await searchParams;
  const date = param.date ? new Date(param.date.toString()) : new Date();
  const response = await api
    .get<SchedulingRequest[]>(`agendamentos?data_fim=${date}`, {
      next: {
        tags: ['cache-scheduling'],
      },
    })
    .json();

  const [customers, employers, services] = await Promise.all([
    getCustomers(),
    getEmployers(),
    getServices(),
  ]);
  return (
    <>
      <Header>
        <p className="font-medium text-lg">
          Agendamento -{' '}
          {date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
          })}
        </p>
      </Header>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          {response.map((item, index) => (
            <EditSchedulingDialog
              disabled={item.status !== 'AGENDADO'}
              key={index as number}
              data={{ customers, employers, services }}
              scheduling={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}
