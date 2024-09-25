'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { typeSchema, resolver } from './schema';
import InputMask from 'react-input-mask';
import React from 'react';
import { BadgeRequired } from '@/components/badge-required';
import { UserProps } from '@/app/api/fake';
import { format } from '@/lib/lib/format-date';
import { ptBR } from 'date-fns/locale';

type Props = {
  row: UserProps;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function InputForm({ row, setIsOpen }: Props) {
  const form = useForm<typeSchema>({
    resolver,
    defaultValues: {
      username: row.name,
      born: row.born,
      cpf: row.cpf,
      email: row.email,
      phone: row.phone
    }
  });

  async function onSubmit(data: typeSchema) {
    try {
      console.log(data);
      setIsOpen(false);
      return toast.success('Alteração realizada com sucesso.', {
        description: format(new Date(), 'dd LLL, y', { locale: ptBR })
      });
    } catch (error) {
      console.log(error);
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

        <Button className="w-full" type="submit" form="form-user-register">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
