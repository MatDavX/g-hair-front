'use client';

import { DatePickerWithRange } from '@/components/input-date-picker';
import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CalculatorRequest, EmployerRequest } from '@/types/response';
import { addDays, format } from 'date-fns';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { postCalculator } from '../action-server';
import { useCalculatorStore } from '@/lib/zustand/use-calculator-store';
type Props = {
  employees: EmployerRequest[];
};
export function FormCalculator({ employees }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const [formState, setFormState] = React.useState<{
    success: boolean;
    message: any;
    errors: { employer?: string[] } | null;
  }>({
    success: true,
    message: null,
    errors: null,
  });
  const { setCalculator } = useCalculatorStore();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const initial_date = format(date?.from!, 'yyyy-MM-dd');
    const end_date = format(date?.to!, 'yyyy-MM-dd');
    const form = event.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const state = await postCalculator(data, initial_date, end_date);

      if (state.success) {
        setCalculator(state.message);
        return;
      }

      setFormState(state);
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 p-4">
      <div className="space-y-1">
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
      </div>
      <div className="space-y-1">
        <Label>Data de inicio e fim</Label>
        <DatePickerWithRange setDate={setDate} date={date} />
      </div>
      <Button disabled={isPending} type="submit">
        Confirmar
      </Button>
    </form>
  );
}
