import { Sidebar } from '@/components/sidebar';

import { WrapperLayoutInitial } from '@/components/wrapper';
import React, { Suspense } from 'react';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <Suspense>
        <WrapperLayoutInitial>{children}</WrapperLayoutInitial>
      </Suspense>
    </div>
  );
}
