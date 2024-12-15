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
import type { EmployerRequest } from '@/types/response';
import { Textarea } from '@/components/ui/textarea';
type NewEmployerDialogProps = {
  service: EmployerRequest;
};

export function EditEmployerDialog({ service }: NewEmployerDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    e => editCustomer(e, service.id),
    false,
    () => {
      setIsOpen(false);
      toast.success('Funcionário criado com sucesso.');
    }
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={'icon'}>
          <UserPen className="h-4 w-4" />
          <span className="sr-only">Editar funcionário</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar funcionário</DialogTitle>
          <DialogDescription>Editar funcionário.</DialogDescription>
        </DialogHeader>
        <form
          id="form-service"
          onSubmit={handleSubmit}
          className="grid   gap-4 "
        >
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input
              placeholder="Informe um nome"
              name="name"
              defaultValue={service.nome}
            />
            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-1 ">
            <Label>Descrição</Label>
            <Textarea
              placeholder="Informe uma descrição"
              defaultValue={service.comissao}
              name="description"
            />
            {errors?.description && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.description[0]}
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
