'use client';
import React from 'react';
// import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // const { data: status }: any = useSession();
  const status = null;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState<boolean>(true);

  const guestRoutes: string[] = ['/login', '/register'];

  React.useEffect(() => {
    const isGuestRoute = !!guestRoutes.find((route) => route === pathname);
    setLoading(true);

    if (status === 'loading') {
      return;
    } else if (status === 'authenticated' && isGuestRoute) {
      router.push('/');
    } else if (status === 'unauthenticated' && !isGuestRoute) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [pathname, status]);

  return loading ? <div>Loading...</div> : children;
}
