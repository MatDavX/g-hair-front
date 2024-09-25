import React, { Suspense } from 'react';
import { RegisterDialog } from './register';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TableSkeleton } from '@/components/loading/table-skeleton';

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
  consultation: React.ReactNode;
  analytics: React.ReactNode;
}) {
  // const segments = useSelectedLayoutSegments();
  // console.log(segments);
  return (
    <>
      <div className="my-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold">Clientes</p>
        </div>
        <RegisterDialog />
      </div>
      <Tabs defaultValue={'consultation'}>
        <TabsList>
          <TabsTrigger value="consultation">Registros</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        <TabsContent value="consultation">
          <Suspense fallback={<TableSkeleton />}>
            <div>{props.children}</div>
          </Suspense>
        </TabsContent>
        <TabsContent value="analytics">
          <Suspense fallback={<p>Loading TEste...</p>}>
            <div>{props.analytics}</div>
          </Suspense>
        </TabsContent>
      </Tabs>

      {props.modal}
      <div id="modal-root" />
    </>
  );
}
