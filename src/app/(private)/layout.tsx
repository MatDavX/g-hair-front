import { SidebarLeft } from '@/components/sidebar-left';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import type React from 'react';
import { AppearScheduler } from './_components/appear-scheduler';
import { Case, Default, Switch } from '@/components/condition-component';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(auth);
  console.log(session);
  async function handleSubmit() {
    'use server';
    await signOut();
  }
  return (
    <Switch>
      <Case condition={!true}>
        <form onSubmit={handleSubmit}>
          <p>Usuário sem autorização</p>
          <Button type="submit"> Voltar </Button>
        </form>
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
