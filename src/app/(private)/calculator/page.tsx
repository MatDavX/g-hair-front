import { Header } from '@/components/header';
import type { SchedulingRequest } from '@/types/response';
import React from 'react';
import { getCustomers } from '@/http/getCustomers';
import { getEmployers } from '@/http/getEmployers';
import { getServices } from '@/http/getServices';
import { api } from '@/lib/ky';
import { FormCalculator } from './component/form';

export default async function Page() {
  const [customers, employers, services] = await Promise.all([
    getCustomers(),
    getEmployers(),
    getServices(),
  ]);

  return (
    <>
      <Header>
        <p className="font-medium text-lg">Calculadora de comissões</p>
      </Header>
      <div className="mt-4">
        <div className="grid grid-cols-2 h-fit gap-4">
          <div className="bg-secondary rounded-md col-span-1 h-[400px]">
            <FormCalculator employees={employers} />
          </div>
          <div className="bg-secondary rounded-md col-span-1 h-[400px]">
            <form>{/* <Input /> */}</form>
          </div>
        </div>
      </div>
    </>
  );
}
