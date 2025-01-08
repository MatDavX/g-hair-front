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
import { AlertCircle, Plus, UserPen } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';
import { createEmployer } from '../action-server';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useMutation } from '@tanstack/react-query';
import { getCEP } from '@/http/getCEP';
import { Separator } from '@/components/ui/separator';
import type { EmployerRequest } from '@/types/response';
type props = {
  user: EmployerRequest;
};
export function EditEmployerDialog({ user }: props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [employer, setEmployer] = React.useState({
    state: '',
    city: '',
    street: '',
    neighborhood: '',
  });
  const { data: data_cep, mutate } = useMutation({
    mutationFn: (cep: string) => getCEP(cep),
    onSuccess: e => {
      setEmployer({
        state: e.uf,
        city: e.localidade,
        street: e.logradouro,
        neighborhood: e.bairro,
      });
    },
  });
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    e => createEmployer(e, employer),
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
          <span className="sr-only">Editar cliente</span>
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
            <Input name="cpf" />
            {errors?.cpf && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.cpf[0]}
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
          <Separator className="col-span-2" />
          <div className="space-y-1">
            <Label>CEP</Label>
            <Input
              onChange={e => {
                if (e.target.value.length === 8) {
                  return mutate(e.target.value);
                }
              }}
              type="number"
              placeholder="Informe um CEP"
              name="cep"
            />
            {errors?.cep && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.cep[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Número</Label>
            <Input
              type="number"
              placeholder="Informe um número"
              name="number"
            />
            {errors?.number && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.number[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Estado</Label>
            <Input
              disabled
              value={data_cep?.uf}
              placeholder="Estado"
              name="state"
            />
            {errors?.state && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.state[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Cidade</Label>
            <Input
              disabled
              value={data_cep?.localidade}
              placeholder="Cidade"
              name="city"
            />
            {errors?.city && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.city[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Logradouro</Label>
            <Input
              disabled
              value={data_cep?.logradouro}
              placeholder="Logradouro"
              name="street"
            />
            {errors?.street && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.street[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Bairro</Label>
            <Input
              disabled
              value={data_cep?.bairro}
              placeholder="Bairro"
              name="neighborhood"
            />
            {errors?.neighborhood && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.neighborhood[0]}
              </p>
            )}
          </div>
          <div className="space-y-1 col-span-2">
            <Label>Complemento</Label>
            <Input placeholder="Informe um complemento" name="complement" />
            {errors?.complement && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.complement[0]}
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
