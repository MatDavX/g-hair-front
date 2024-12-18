'use client';

import { DatePickerWithRange } from '@/components/input-date-picker';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EmployerRequest } from '@/types/response';
import { addDays } from 'date-fns';
import React from 'react';
import type { DateRange } from 'react-day-picker';
type Props = {
  employees: EmployerRequest[];
};
export function FormCalculator({ employees }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <form>
      <Label>Funcionário</Label>
      <Select name="employer">
        <SelectTrigger>
          <SelectValue placeholder="Selecione um funcionário" />
        </SelectTrigger>
        <SelectContent>
          {employees?.map(employer => (
            <SelectItem key={employer.id} value={employer.id}>
              {employer.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label>Data de inicio e fim</Label>
      <DatePickerWithRange setDate={setDate} date={date} />
    </form>
  );
}
