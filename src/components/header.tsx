import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export function Header({ title, children }: Props) {
  return (
    <header className="sticky top-0 flex h-fit shrink-0 items-center gap-2 bg-background">
      <div className="flex flex-1 items-center gap-2 ">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <p>{title}</p>
        {children}
      </div>
    </header>
  );
}
