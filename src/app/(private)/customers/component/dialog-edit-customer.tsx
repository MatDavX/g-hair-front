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
import { AlertCircle, UserPen } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';
import { editCustomer } from '../action-server';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CustomerRequest } from '@/types/response';
type NewCustomerDialogProps = {
  customer: CustomerRequest;
};

export function EditCustomerDialog({ customer }: NewCustomerDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    e => editCustomer(e, customer.id),
    false,
    () => {
      setIsOpen(false);
      toast.success('Cliente criado com sucesso.');
    }
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={'icon'}>
          <UserPen className="h-4 w-4" />
          <span className="sr-only">Editar cliente</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
          <DialogDescription>Editar cliente.</DialogDescription>
        </DialogHeader>
        <form
          id="form-customer"
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 "
        >
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input name="name" defaultValue={customer.nome} />
            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>
          <div className="space-y-1 ">
            <Label>Data Nascimento</Label>
            <Input
              type="date"
              name="born"
              defaultValue={customer.data_nascimento
                ?.toString()
                ?.replace('.000Z', '')}
            />
            {errors?.born && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.born[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Telefone</Label>
            <Input defaultValue={customer.telefone} name="phone" />
            {errors?.phone && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.phone[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input defaultValue={customer.email} name="email" />
            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.email[0]}
              </p>
            )}
          </div>
        </form>
        <DialogFooter className="grid grid-cols-1  gap-4">
          <Button form="form-customer" disabled={isPending} type="submit">
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
