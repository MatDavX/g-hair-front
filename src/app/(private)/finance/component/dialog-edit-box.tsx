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

import { useFormState } from '@/hooks/use-form-state';
import { AlertCircle, Loader2, UserPen } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';
import { editBox } from '../action-server';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { BoxFinanceRequest } from '@/types/response';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { getMethodsPayment } from '@/http/getMethodsPayment';
type NewBoxDialogProps = {
  box: BoxFinanceRequest;
};

export function EditBoxDialog({ box }: NewBoxDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: methodsPayment, isLoading } = useQuery({
    queryKey: ['methods-payment-cache'],
    queryFn: getMethodsPayment,
  });
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    e => editBox(e, box.id),
    false,
    () => {
      setIsOpen(false);
      toast.success('Caixa editado com sucesso.');
    }
  );

  const filterMethodsPayment = methodsPayment?.find(
    method => method.nome === box.metodo_de_pagamento
  );
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={'icon'}>
          <UserPen className="h-4 w-4" />
          <span className="sr-only">Editar caixa</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar caixa</DialogTitle>
          <DialogDescription>Editar caixa.</DialogDescription>
        </DialogHeader>
        <form
          id="form-service"
          onSubmit={handleSubmit}
          className="grid  gap-4 "
        >
          <div className="space-y-1 col-span-2">
            <Label>Método de pagamento</Label>
            <Select
              defaultValue={filterMethodsPayment?.id}
              name="method_payment_id"
            >
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
              defaultValue={box.valor_total}
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
              defaultValue={box.valor_desconto}
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
        <DialogFooter className="grid grid-cols-1  gap-4">
          <Button form="form-service" disabled={isPending} type="submit">
            Confirmar
          </Button>
          {!success && message && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Algo deu errado!</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
