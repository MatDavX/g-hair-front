import { Header } from '@/components/header';
import React from 'react';

import { DataTable } from '@/components/data-table';
import { getCustomers } from '@/http/getCustomers';
import { NewCustomerDialog } from './component/dialog-new-customer';
import { columns } from './component/column';

export default async function Page() {
  const response = await getCustomers();

  return (
    <>
      <Header>
        <p className="font-medium mr-auto text-lg">Clientes</p>
      </Header>
      <div className="mt-4 space-y-4">
        <NewCustomerDialog />
        <DataTable data={response} columns={columns} />
      </div>
    </>
  );
}
