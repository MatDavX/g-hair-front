'use client';

import type { LucideIcon } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { validPathName } from '@/utils/valid-pathname';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {items.map(item => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={validPathName(pathname, item.url)}
          >
            <a href={item.url}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
