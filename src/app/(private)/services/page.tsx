import { Header } from '@/components/header';
import React from 'react';

import { DataTable } from '@/components/data-table';
import { columns } from './component/column';
import { getServices } from '@/http/getServices';
import { NewServiceDialog } from './component/dialog-new-service';

export default async function Page() {
  const response = await getServices();

  return (
    <>
      <Header>
        <p className="font-medium mr-auto text-lg">Serviços</p>
      </Header>
      <div className="mt-4 space-y-4">
        <NewServiceDialog />
        <DataTable data={response} columns={columns} />
      </div>
    </>
  );
}
