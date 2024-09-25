import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};
export function WrapperLayoutInitial({ children, className }: Props) {
  return <div className={cn('px-6 py-6 w-full', className)}>{children}</div>;
}
