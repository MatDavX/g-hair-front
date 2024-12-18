'use client';

import { Calendar } from '@/components/ui/calendar';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { formatDate } from '@/utils/format-to-date';
import { addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';
import type { DateRange } from 'react-day-picker';

export function DatePicker() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const { push } = useRouter();
  function handleDayClick(day: DateRange) {
    setDate(day);
    return push(
      `/scheduling?initial_date=${formatDate(day?.from!)}&final_date=${formatDate(day?.to!)}`
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="px-0">
        <div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={e => handleDayClick(e!)}
            numberOfMonths={1}
            // disabled={{ before: new Date() }}
            className="[&_[role=gridcell]]:w-[33px]"
          />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
