import type { Metadata } from 'next';
import { Providers } from './provider';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'G-Hair',
  description: 'Gerenciamento para o seu salão de beleza.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <SessionProvider>
        <body
          suppressHydrationWarning
          cz-shortcut-listen="true"
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <Providers>{children}</Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
