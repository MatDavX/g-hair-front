import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Cell({ children, className }: Props) {
  return <div className={cn('ml-2 font-medium', className)}>{children}</div>;
}

export function Number({ children, className }: Props) {
  return <div className={cn('ml-2 font-medium', className)}>{children}</div>;
}

export function Date({ children, className }: Props) {
  return <div className={cn('ml-2 font-medium', className)}>{children}</div>;
}
