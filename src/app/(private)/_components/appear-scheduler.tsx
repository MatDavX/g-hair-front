'use client';
import { Case, Default, Switch } from '@/components/condition-component';
import { SidebarRight } from '@/components/sidebar-right';
import { usePathname } from 'next/navigation';

export function AppearScheduler({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <Switch>
      <Case condition={pathname === '/scheduling'}>
        {children}
        <SidebarRight />
      </Case>
      <Default>{children}</Default>
    </Switch>
  );
}
