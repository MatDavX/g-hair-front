import { cn } from "@/lib/utils";
import type React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export function ContentPageFormatter({ children, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {children}
    </div>
  );
}
