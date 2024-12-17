import { Header } from '@/components/header';
import React from 'react';

import { DataTable } from '@/components/data-table';
import { columns } from './component/column';
import { getBoxFinance } from '@/http/getBoxFinance';

export default async function Page() {
  const response = await getBoxFinance();

  return (
    <>
      <Header>
        <p className="font-medium mr-auto text-lg">Caixa</p>
      </Header>
      <div className="mt-4 space-y-4">
        <DataTable data={response} columns={columns} />
      </div>
    </>
  );
}
