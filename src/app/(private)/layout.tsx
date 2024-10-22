import { SidebarLeft } from '@/components/sidebar-left';
import { SidebarRight } from '@/components/sidebar-right';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { headers } from 'next/headers';

import type React from 'react';
import { AppearScheduler } from './_components/appear-scheduler';
import { auth } from '@/lib/auth';
import { Case, Default, Switch } from '@/components/condition-component';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session);
  return (
    <Switch>
      <Case condition={!session}>
        <p>Usuário sem autorização</p>
      </Case>
      <Default>
        <SidebarProvider>
          <AppearScheduler>
            <SidebarLeft />
            <SidebarInset>
              <div className="p-4 h-fit">{children}</div>
            </SidebarInset>
          </AppearScheduler>
        </SidebarProvider>
      </Default>
    </Switch>
  );
}
