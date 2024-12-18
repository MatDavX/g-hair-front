'use client';
import * as React from 'react';
import { ChevronRight, type LucideProps } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function ContentSidebar({
  tabs,
}: {
  tabs: {
    section: string;
    items: {
      name: string;
      href: string;
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      > | null;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.toString();

  function cleanURL(url: string) {
    const baseURL = 'http://example.com';
    const parsedURL = new URL(url, baseURL);

    parsedURL.searchParams.delete('date');

    return parsedURL.pathname + parsedURL.search;
  }
  return (
    <>
      {tabs.map((item, index) => (
        <React.Fragment key={item.section}>
          <SidebarGroup key={item.section} className="py-0">
            <Collapsible
              defaultOpen={index === 0}
              className="group/collapsible"
            >
              <SidebarGroupLabel
                asChild
                className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground z-20"
              >
                <CollapsibleTrigger className="text-lg font-semibold ">
                  {item.section}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((tab, index) => {
                      const currentPath = `${pathname}?${query}`;
                      const cleanedCurrentPath = cleanURL(currentPath);
                      const cleanedTabHref = cleanURL(tab.href);
                      const isActive = cleanedCurrentPath === cleanedTabHref;
                      return (
                        <SidebarMenuItem key={index as number}>
                          <SidebarMenuButton asChild>
                            <Link
                              data-pathname={isActive}
                              className="data-[pathname=true]:bg-accent data-[pathname=true]:text-accent-foreground z-0"
                              prefetch={true}
                              href={tab.href}
                            >
                              {tab.icon && <tab.icon className="h-4 w-4" />}
                              {tab.name}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          <SidebarSeparator className="mx-0" />
        </React.Fragment>
      ))}
    </>
  );
}
