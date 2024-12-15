import { Header } from '@/components/header';
import React from 'react';

import { DataTable } from '@/components/data-table';
import { columns } from './component/column';
import { getEmployers } from '@/http/getEmployers';
import { NewEmployerDialog } from './component/dialog-new-employer';

export default async function Page() {
  const response = await getEmployers();

  return (
    <>
      <Header>
        <p className="font-medium mr-auto text-lg">Funcionários</p>
      </Header>
      <div className="mt-4 space-y-4">
        <NewEmployerDialog />
        <DataTable data={response} columns={columns} />
      </div>
    </>
  );
}
