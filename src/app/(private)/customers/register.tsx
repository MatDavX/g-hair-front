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
          <DialogTitle>Cadastro de cliente</DialogTitle>
          <DialogDescription>
            Este formulário é utilizado para cadastro de novos clientes no
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
      born: '',
      cpf: '',
      email: '',
      phone: '',
    },
  });

  function transformPhoneNumber(number: string) {
    const numericPhone = number.replace(/\D/g, '');

    return numericPhone.length > 11 ? numericPhone.slice(-11) : numericPhone;
  }

  async function onSubmit(data: typeSchema) {
    setIsLoading(true);
    const body = {
      cliente: {
        nome: data.username,
        data_nascimento: data.born,
        email: data.email,
        cpf: data.cpf.replace('.', '').replace('.', '').replace('-', ''),
        telefone: transformPhoneNumber(data.phone),
      },
    };
    try {
      const res = await handleSubmit(body, session.data?.user?.token as string);
      if (res) {
        setEnableClose(false);
        setIsLoading(false);
        form.reset();
        return toast.success('Cliente cadastrado com sucesso');
      }
    } catch (error) {
      setIsLoading(false);

      return toast.error('Erro ao cadastrar cliente');
    }
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
                <Input placeholder="Insira o nome do cliente" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Insira o email do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  CPF <BadgeRequired />
                </FormLabel>
                <FormControl>
                  <InputMask
                    mask="999.999.999-99"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <Input placeholder="Insira o CPF do cliente" />
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Telefone <BadgeRequired />
                </FormLabel>
                <FormControl>
                  <InputMask
                    mask="+55 (99) 99999-9999"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <Input placeholder="Insira o telefone do cliente" />
                  </InputMask>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="born"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={isLoading}
          className="w-full"
          type="submit"
          form="form-user-register"
        >
          {isLoading ? <LoadingSvg /> : 'Salvar'}
        </Button>
      </form>
    </Form>
  );
}
