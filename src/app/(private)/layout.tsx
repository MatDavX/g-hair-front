import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getCustomers } from '@/http/getCustomers';
import { getEmployers } from '@/http/getEmployers';
import { getServices } from '@/http/getServices';
import { NewSchedulingDialog } from '../../components/dialog-new-scheduling';
import { auth } from '@/lib/auth';

type Props = {
  name: {
    nome: string;
    telefone: string;
    cpf: string;
    data_nascimento: Date;
  };
  email: string;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const [customers, employers, services] = await Promise.all([
    getCustomers(),
    getEmployers(),
    getServices(),
  ]);

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user as Props}>
        <NewSchedulingDialog data={{ customers, employers, services }} />
      </AppSidebar>
      <SidebarInset>
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
