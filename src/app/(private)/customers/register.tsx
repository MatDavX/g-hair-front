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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import React from 'react';
import { BadgeRequired } from '@/components/badge-required';

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
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type Props = {
  setEnableClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function InputForm({ setEnableClose }: Props) {
  const form = useForm<typeSchema>({
    resolver,
    defaultValues: {
      username: '',
      born: '',
      cpf: '',
      email: '',
      phone: ''
    }
  });

  function onSubmit(data: typeSchema) {
    console.log(data);
    setEnableClose(false);
    // people.push({
    //   id: 2,
    //   lastService: '-',
    //   observation: [{ date: '', description: '', id: 2 }],
    //   tags: [{ color: 'red', description: 'OI', id: 3 }],
    //   email: data.email,
    //   born: data.born,
    //   cpf: data.cpf,
    //   phone: data.phone,
    //   name: data.username
    // });

    return toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
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
