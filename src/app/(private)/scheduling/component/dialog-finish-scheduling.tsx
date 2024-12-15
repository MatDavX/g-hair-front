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

import { useFormState } from '@/hooks/use-form-state';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { finishScheduling } from '../action-server';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { getMethodsPayment } from '@/http/getMethodsPayment';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type SchedulingProps = {
  id: string;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export function FinishSchedulingDialog({ id, setCloseModal }: SchedulingProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: methodsPayment, isLoading } = useQuery({
    queryKey: ['methods-payment-cache'],
    queryFn: getMethodsPayment,
  });
  const [{ errors }, handleSubmit, isPending] = useFormState(
    e => finishScheduling(e, id),
    true,
    () => {
      setIsOpen(false);
      setCloseModal(false);
      toast.success('Agendamento finalizado com sucesso.');
    }
  );

  return (
    <>
      <Dialog onOpenChange={setIsOpen} modal open={isOpen}>
        <DialogTrigger asChild>
          <Button disabled={isPending}>Finalizar</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalização do agendamento</DialogTitle>
            <DialogDescription>
              Finalizar os detalhes do agendamento para este usuário gerando
              assim o caixa.
            </DialogDescription>
          </DialogHeader>
          <form
            id="form-scheduling-finish"
            onSubmit={handleSubmit}
            className=" grid grid-cols-2 gap-4"
          >
            <div className="space-y-1 col-span-2">
              <Label>Método de pagamento</Label>
              <Select name="method_payment_id">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um método de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <div className="flex items-center ">
                      <Loader2 className="size-5 my-2 mx-4 animate-spin" />
                      <p className="text-sm">Carregando...</p>
                    </div>
                  ) : (
                    methodsPayment?.map(methods => (
                      <SelectItem key={methods.id} value={methods.id}>
                        {methods.nome}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors?.description && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.description[0]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Valor Total:</Label>
              <Input
                name="total"
                type="number"
                placeholder="Valor total do agendamento"
              />
              {errors?.total && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.total[0]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Valor de desconto:</Label>
              <Input
                name="discount_value"
                type="number"
                placeholder="Desconto"
              />
              {errors?.total && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.total[0]}
                </p>
              )}
            </div>
          </form>
          <DialogFooter>
            <DialogClose>
              <Button variant={'secondary'}>Cancelar</Button>
            </DialogClose>
            <Button
              form="form-scheduling-finish"
              type="submit"
              disabled={isPending}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
