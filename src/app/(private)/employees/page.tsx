import type { Metadata } from 'next';
import { TableEmployees } from './columns';
import { api } from '@/lib/fetcher/fetch';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/loading/table-skeleton';
import { Header } from '@/components/header';
import { ContentPageFormatter } from '@/components/wrapper';
import { RegisterDialog } from './register';
import type { EmployeesRequest } from '@/types/requests';

export const metadata: Metadata = {
  title: 'Funcionários | G-Hair',
  description: 'Pagina de funcionários da G-Hair',
};

export default async function Page() {
  const session = await auth();
  const response = await api.get<EmployeesRequest>('/funcionarios', {
    bearer: session?.user.token,
    cache: ['employee-cache'],
  });
  return (
    <ContentPageFormatter>
      <Header title="Funcionários" />
      <div className="w-fit">
        <RegisterDialog />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableEmployees data={response.funcionarios} />
      </Suspense>
    </ContentPageFormatter>
  );
}
