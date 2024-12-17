'use client';

import type * as React from 'react';

import { ContentSidebar } from '@/components/content-sidebar';
import { DatePicker } from '@/components/date-picker';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Box,
  Calendar,
  ChartPie,
  HandPlatter,
  User,
  UserCog,
} from 'lucide-react';

const manual = {
  tabs: [
    {
      section: 'Gerenciamento',
      items: [
        {
          name: 'Agendamentos',
          icon: Calendar,
          href: `/scheduling?date=${new Date().toISOString()}`,
        },
        { name: 'Caixas', icon: Box, href: '/finance' },
        { name: 'Clientes', icon: User, href: '/customers' },
        { name: 'Dashboard', icon: ChartPie, href: '/dashboard' },
        { name: 'Funcionários', icon: UserCog, href: '/employees' },
        { name: 'Serviços', icon: HandPlatter, href: '/services' },
      ],
    },
    {
      section: 'Relatórios',
      items: [
        { name: 'Clientes', icon: null, href: '' },
        { name: 'Despesas', icon: null, href: '' },
      ],
    },
    {
      section: 'Configurações',
      items: [
        { name: 'Personal', icon: null, href: '' },
        { name: 'Work', icon: null, href: '' },
        { name: 'Family', icon: null, href: '' },
      ],
    },
  ],
};

type AppSidebarProps = {
  children: React.ReactNode;
  user: {
    name: {
      nome: string;
      telefone: string;
      cpf: string;
      data_nascimento: Date;
    };
    email: string;
  };
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ children, user, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser
          user={{
            email: user?.email as string,
            name: user?.name.nome as string,
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <ContentSidebar tabs={manual.tabs} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>{children}</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
