import { Header } from '@/components/header';
import type { SchedulingRequest } from '@/types/response';
import React from 'react';
import { getCustomers } from '@/http/getCustomers';
import { getEmployers } from '@/http/getEmployers';
import { getServices } from '@/http/getServices';
import { api } from '@/lib/ky';
import { FormCalculator } from './component/form';
import { ViwCalculators } from './component/viw-calculators';
import { getMethodsPayment } from '@/http/getMethodsPayment';

export default async function Page() {
  const [customers, employers, services, methods] = await Promise.all([
    getCustomers(),
    getEmployers(),
    getServices(),
    getMethodsPayment(),
  ]);

  return (
    <>
      <Header>
        <p className="font-medium text-lg">Calculadora de comissões</p>
      </Header>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary w-fit rounded-md col-span-1 h-fit">
            <FormCalculator employees={employers} />
          </div>
          <div>
            <p className="font-semibold text-2xl mb-4"> Histórico </p>
            <div className="bg-secondary rounded-md col-span-1 h-fit">
              <ViwCalculators
                data={{
                  service: services,
                  customers: customers,
                  methods: methods,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
