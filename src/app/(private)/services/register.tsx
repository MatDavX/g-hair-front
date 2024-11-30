'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type typeSchema, resolver } from './schema';
import InputMask from 'react-input-mask';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import React from 'react';
import { BadgeRequired } from '@/components/badge-required';
import { toast } from 'sonner';
import { handleSubmit } from './server-action';
import { useSession } from 'next-auth/react';
import { LoadingSvg } from '@/components/loading';

export function RegisterDialog() {
  const [enableClose, setEnableClose] = React.useState(false);
  return (
    <Dialog open={enableClose} onOpenChange={setEnableClose}>
      <DialogTrigger asChild>
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de serviço</DialogTitle>
          <DialogDescription>
            Este formulário é utilizado para cadastro de novos serviços no
            sistema.
          </DialogDescription>
        </DialogHeader>
        <InputForm setEnableClose={setEnableClose} />
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

type Props = {
  setEnableClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function InputForm({ setEnableClose }: Props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const session = useSession();
  const form = useForm<typeSchema>({
    resolver,
    defaultValues: {
      username: '',
      description: '',
      value: '',
    },
  });

  async function onSubmit(data: typeSchema) {
    setIsLoading(true);
    const body = {
      nome: data.username,
      valor: Number.parseFloat(data.value.toString()),
      descricao: data.description,
    };

    try {
      const res = await handleSubmit(body, session.data?.user?.token as string);
      if (res) {
        setEnableClose(false);
        form.reset();
        return toast.success('Serviço cadastrado com sucesso');
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);

      return toast.error('Erro ao cadastrar serviço');
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        id="form-user-register"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome <BadgeRequired />
              </FormLabel>
              <FormControl>
                <Input placeholder="Insira o nome do serviço" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor <BadgeRequired />
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Valor do serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Descrição do serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={!isLoading}
          className="w-full"
          type="submit"
          form="form-user-register"
        >
          {!isLoading ? <LoadingSvg /> : 'Salvar'}
        </Button>
      </form>
    </Form>
  );
}
