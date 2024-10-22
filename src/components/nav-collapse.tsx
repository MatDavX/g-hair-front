import { Icon } from "@/lib/icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { validPathName } from "@/utils/valid-pathname";
import { usePathname } from "next/navigation";

type Props = {
  item: {
    title: string;
    isExpanded: boolean;
    items: {
      title: string;
      icon: any;
      url: string;
      disabled?: boolean;
    }[];
  };
};

export function NavCollapse({ item }: Props) {
  const pathname = usePathname();

  return (
    <Collapsible
      key={item.title}
      title={item.title}
      defaultOpen={item.isExpanded}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-primary/20 hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            {item.title}
            <Icon.rightChevron className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="pl-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    data-disabled={item?.disabled}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    disabled={item?.disabled}
                    asChild
                    className="data-[disabled=true]:opacity-50"
                    isActive={validPathName(pathname as string, item.url)}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
