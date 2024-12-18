'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useFormState } from '@/hooks/use-form-state';
import { Plus } from 'lucide-react';

import type { SelectRequest } from '@/types/response';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createScheduling } from '@/app/(private)/scheduling/action-server';
import React from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
type SchedulingProps = {
  data: {
    customers: SelectRequest[];
    employers: SelectRequest[];
    services: SelectRequest[];
  };
};
export function NewSchedulingDialog({ data }: SchedulingProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [{ errors }, handleSubmit, isPending] = useFormState(
    e => createScheduling(e),
    true,
    () => {
      setIsOpen(false);
      toast.success('Horário agendado com sucesso.');
    }
  );
  const maxDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  console.log(errors);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full h-full items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Novo Agendamento</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo agendamento</DialogTitle>
          <DialogDescription>
            Cadastro de novo agendamento para um usuário.
          </DialogDescription>
        </DialogHeader>
        <form
          id="form-scheduling"
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 "
        >
          <div className="space-y-1">
            <Label>Data e hora do agendamento</Label>
            <Input
              name="calendar"
              min={maxDate}
              type="datetime-local"
              alt="Campo de agendamento"
            />
            {errors?.calendar && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.calendar[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Cliente</Label>
            <Select name="customer">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {data?.customers?.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.calendar && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.customer[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Funcionário</Label>
            <Select name="employer">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um funcionário" />
              </SelectTrigger>
              <SelectContent>
                {data?.employers?.map(employer => (
                  <SelectItem key={employer.id} value={employer.id}>
                    {employer.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.calendar && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.employer[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Funcionário</Label>
            <Select name="service">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {data?.services?.map(service => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.calendar && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.service[0]}
              </p>
            )}
          </div>
          <div className="space-y-1 col-span-2">
            <Label>Descrição</Label>
            <Textarea name="description" />
            {errors?.description && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.description[0]}
              </p>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button form="form-scheduling" disabled={isPending} type="submit">
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
