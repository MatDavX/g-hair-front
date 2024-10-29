import type { Metadata } from 'next';
import { TableCustomers } from './columns';
import { people } from '@/app/api/fake';
import { api } from '@/lib/fetcher/fetch';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/loading/table-skeleton';
import { Header } from '@/components/header';
import { ContentPageFormatter } from '@/components/wrapper';
import { RegisterDialog } from './register';
import type { CostumersRequest } from '@/types/requests';

export const metadata: Metadata = {
  title: 'Clientes | G-Hair',
  description: 'Pagina de clientes da G-Hair',
};

export default async function Page() {
  const session = await auth();
  const response = await api.get<CostumersRequest[]>('/clientes', {
    bearer: session?.user.token,
    cache: ['customers-cache'],
  });
  return (
    <ContentPageFormatter>
      <Header title="Clientes" />
      <div className="w-fit">
        <RegisterDialog />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableCustomers data={response} />
      </Suspense>
    </ContentPageFormatter>
  );
}
