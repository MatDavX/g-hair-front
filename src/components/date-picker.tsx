'use client';

import { Calendar } from '@/components/ui/calendar';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { useRouter, useSearchParams } from 'next/navigation';

export function DatePicker() {
  const { push } = useRouter();
  const params = useSearchParams();
  function handleDayClick(day: Date) {
    return push(`/scheduling?date=${day.toISOString()}`);
  }
  return (
    <SidebarGroup>
      <SidebarGroupContent className="px-0">
        <div>
          <Calendar
            onDayClick={day => handleDayClick(day)}
            disabled={{ before: new Date() }}
            selected={new Date(params.get('date')!)}
            className="[&_[role=gridcell]]:w-[33px]"
          />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
