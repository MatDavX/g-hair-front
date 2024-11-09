import type { Metadata } from 'next';
import { TableCustomers } from './columns';
import { api } from '@/lib/fetcher/fetch';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/loading/table-skeleton';
import { Header } from '@/components/header';
import { ContentPageFormatter } from '@/components/wrapper';
import { RegisterDialog } from './register';
import type { CostumersRequest } from '@/types/requests';

export const metadata: Metadata = {
  title: 'Funcionários | G-Hair',
  description: 'Pagina de funcionários da G-Hair',
};

export default async function Page() {
  // const session = await auth();
  const response = await api.get<CostumersRequest[]>('/funcionarios', {
    // bearer: session?.user.token,
    cache: ['employees-cache'],
  });
  return (
    <ContentPageFormatter>
      <Header title="Funcionários" />
      <div className="w-fit self-end">
        <RegisterDialog />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableCustomers data={response} />
      </Suspense>
    </ContentPageFormatter>
  );
}
