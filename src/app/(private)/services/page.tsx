import type { Metadata } from 'next';
import { TableServices } from './columns';
import { api } from '@/lib/fetcher/fetch';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/loading/table-skeleton';
import { Header } from '@/components/header';
import { ContentPageFormatter } from '@/components/wrapper';
import { RegisterDialog } from './register';
import type { ServicesRequest } from '@/types/requests';

export const metadata: Metadata = {
  title: 'Serviço | G-Hair',
  description: 'Pagina de serviços da G-Hair',
};

export default async function Page() {
  const session = await auth();
  const response = await api.get<ServicesRequest>('/servicos', {
    bearer: session?.user.token,
    cache: ['employee-cache'],
  });
  return (
    <ContentPageFormatter>
      <Header title="Serviços" />
      <div className="w-fit">
        <RegisterDialog />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableServices data={response.servicos} />
      </Suspense>
    </ContentPageFormatter>
  );
}
