import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getCustomers } from '@/http/getCustomers';
import { getEmployers } from '@/http/getEmployers';
import { getServices } from '@/http/getServices';
import { NewSchedulingDialog } from '../../components/dialog-new-scheduling';
import { auth } from '@/lib/auth';

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
      <AppSidebar
        user={
          session?.user as {
            email: string;
            name: string;
          }
        }
      >
        <NewSchedulingDialog data={{ customers, employers, services }} />
      </AppSidebar>
      <SidebarInset>
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
