'use client';

import { Calendar } from '@/components/ui/calendar';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';

export function DatePicker() {
  const { push } = useRouter();
  function handleDayClick(day: Date) {
    return push(`/dashboard?date=${day.toLocaleDateString()}`);
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="px-0">
        <div>
          <Calendar
            onDayClick={day => handleDayClick(day)}
            // onSelect={}
            className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
