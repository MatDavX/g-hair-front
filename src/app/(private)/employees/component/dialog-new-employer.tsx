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
import { AlertCircle, Plus } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';
import { createEmployer } from '../action-server';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function NewEmployerDialog() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    e => createEmployer(e),
    false,
    () => {
      setIsOpen(false);
      toast.success('Funcionário criado com sucesso.');
    }
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          <span>Novo funcionário</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo funcionário</DialogTitle>
          <DialogDescription>Cadastro de novo funcionário.</DialogDescription>
        </DialogHeader>
        <form
          id="form-employer"
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 "
        >
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input placeholder="Informe um nome" name="name" />
            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Data de nascimento</Label>
            <Input type="date" name="born" />
            {errors?.born && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.born[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>CPF</Label>
            <Input type="date" name="cpf" />
            {errors?.cpf && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.cpf[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Comissão</Label>
            <Input
              type="number"
              placeholder="Informe uma comissão"
              name="commission"
            />
            {errors?.commission && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.commission[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Telefone</Label>
            <Input placeholder="Informe um telefone" name="phone" />
            {errors?.phone && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.phone[0]}
              </p>
            )}
          </div>
        </form>
        <DialogFooter className="grid grid-cols-1  gap-4">
          <Button form="form-employer" disabled={isPending} type="submit">
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
