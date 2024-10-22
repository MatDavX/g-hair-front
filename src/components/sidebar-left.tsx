"use client";

import * as React from "react";
import { AudioWaveform, Command, MessageCircleQuestion } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Icon } from "@/lib/icons";
import { NavCollapse } from "./nav-collapse";

const data = {
  navContent: [
    {
      title: "Cadastros",
      isExpanded: true,
      items: [
        {
          title: "Clientes",
          icon: Icon.user,
          url: "/customers",
        },
        {
          title: "Funcionários",
          icon: Icon.contact,
          url: "#",
        },
        {
          title: "Serviços",
          icon: Icon.file,
          url: "#",
        },
      ],
    },
    {
      title: "Financeiro",
      isExpanded: false,
      items: [
        {
          title: "Comissões",
          icon: Icon.pigBank,
          url: "#",
          disabled: true,
        },
      ],
    },
  ],
  teams: [
    {
      name: "Cabeleria1",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Cabeleria2",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Cabeleria3.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Agendamento",
      url: "/scheduling",
      icon: Icon.calendar,
    },
    {
      title: "Caixa",
      url: "/calculator",
      icon: Icon.calculate,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Icon.dashboard,
    },
  ],
  navFooter: [
    {
      title: "Configurações",
      url: "#",
      icon: Icon.config,
    },
    {
      title: "Relatórios",
      url: "#",
      icon: Icon.report,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-primary/5" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {data.navContent.map((item) => (
          <NavCollapse key={item.title} item={item} />
        ))}
        <NavSecondary items={data.navFooter} className="mt-auto" />
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
