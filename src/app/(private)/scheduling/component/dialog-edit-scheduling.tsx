'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useFormState } from '@/hooks/use-form-state';
import { LockKeyhole, Trash2, UnlockKeyhole } from 'lucide-react';
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import type { SchedulingRequest, SelectRequest } from '@/types/response';
import { Textarea } from '../../../../components/ui/textarea';
import { Alert } from '../../../../components/ui/alert';
import { editScheduling } from '../action-server';
import React from 'react';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { appearButtonFinish, handleDelete } from '../action';
import { FinishSchedulingDialog } from './dialog-finish-scheduling';
import { toast } from 'sonner';
type SchedulingProps = {
  data: {
    customers: SelectRequest[];
    employers: SelectRequest[];
    services: SelectRequest[];
  };
  scheduling: SchedulingRequest;
  disabled?: boolean;
};
export function EditSchedulingDialog({
  data,
  scheduling,
  disabled,
}: SchedulingProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    e => editScheduling(e, scheduling.agendamento.id),
    true,
    () => {
      setIsOpen(false);
      setIsEditable(false);
      toast.success('Agendamento alterado com sucesso.');
    }
  );

  return (
    <>
      <Dialog onOpenChange={setIsOpen} modal open={isOpen}>
        <DialogTrigger
          disabled={disabled}
          className=" flex w-full rounded-xl bg-secondary p-4 z-0"
        >
          <div className="h-fit text-left">
            <p className="text-lg font-semibold mb-4">
              {scheduling.cliente.nome}
            </p>
            <p>
              <span className="font-semibold">Horário:</span>{' '}
              {format(scheduling.agendamento.data_hora, 'HH:mm', {
                locale: ptBR,
              })}
            </p>
            <p>
              <span className="font-semibold">Funcionário:</span>{' '}
              {scheduling.funcionario.nome}
            </p>
            <p>
              <span className="font-semibold">Serviço:</span>{' '}
              {scheduling.servico.nome}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={() => setIsEditable(!isEditable)}
              data-state={isEditable}
              className="absolute cursor-pointer right-12 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:pointer-events-none data-[state=true]:opacity-100"
            >
              {!isEditable ? (
                <LockKeyhole className="h-4 w-4" />
              ) : (
                <UnlockKeyhole className="h-4 w-4" />
              )}
            </button>
            <DialogTitle>Detalhes do agendamento</DialogTitle>
            <DialogDescription>
              Confira os detalhes do agendamento para este usuário.
            </DialogDescription>
          </DialogHeader>
          <form
            id="form-scheduling"
            onSubmit={handleSubmit}
            className=" grid grid-cols-2 gap-4 "
          >
            <div className="space-y-1">
              <Label>Data e hora do agendamento</Label>
              <Input
                disabled={!isEditable}
                defaultValue={scheduling.agendamento.data_hora
                  .toString()
                  ?.replace('.000Z', '')}
                name="calendar"
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
              <Select
                disabled={!isEditable}
                defaultValue={scheduling.cliente.id}
                name="customer"
              >
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
              <Select
                disabled={!isEditable}
                defaultValue={scheduling.funcionario.id}
                name="employer"
              >
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
              <Label>Serviço</Label>
              <Select
                disabled={!isEditable}
                defaultValue={scheduling.servico.id}
                name="service"
              >
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
              {errors?.service && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.service[0]}
                </p>
              )}
            </div>
            <div className="space-y-1 col-span-2">
              <Label>Descrição</Label>
              <Textarea
                disabled={!isEditable}
                defaultValue={scheduling.agendamento.descricao}
                name="description"
                placeholder="Descrição do agendamento"
              />
              {errors?.description && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.description[0]}
                </p>
              )}
            </div>
          </form>
          <DialogFooter>
            <div
              data-finish={appearButtonFinish(scheduling.agendamento.data_hora)}
              className="grid data-[finish=true]:grid-cols-3 grid-cols-2 w-full items-center gap-4"
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleDelete(scheduling.agendamento.id)}
                    type="button"
                  >
                    Remover
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você deseja remover este agendamento?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Está ação não pode ser desfeita. Isto removerá o
                      agendamento e os dados relacionados. Deseja continuar?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <DialogClose>
                      <AlertDialogAction>Continuar</AlertDialogAction>
                    </DialogClose>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                form="form-scheduling"
                type="submit"
                disabled={isPending || !isEditable}
              >
                Confirmar
              </Button>
              {appearButtonFinish(scheduling.agendamento.data_hora) && (
                <FinishSchedulingDialog
                  id={scheduling.agendamento.id}
                  setCloseModal={setIsOpen}
                />
              )}
              {!success && message && (
                <Alert className="col-span-2">
                  <p className="text-xs font-medium text-red-500 dark:text-red-400">
                    {message}
                  </p>
                </Alert>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
