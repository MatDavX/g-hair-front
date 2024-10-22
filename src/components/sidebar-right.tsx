import type * as React from 'react';

import { DatePicker } from '@/components/date-picker';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Icon } from '@/lib/icons';

const data = {
  user: {
    name: 'Luis',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky w-fit hidden bg-primary/5 lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-fit border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser user={data.user} />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Icon.plus className="h-4 w-4 mr-2" />
              <span>Novo Agendamento</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
    </Sidebar>
  );
}
