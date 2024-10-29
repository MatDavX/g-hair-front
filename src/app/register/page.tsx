'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

import { submitForm } from './server-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import InputMask from 'react-input-mask';
import { type FormValues, resolver } from './schema';
import type { BrasilApiCEPRequest } from '@/types/requests';

export default function RegistrationForm() {
  const [editable, setEditable] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<FormValues>({
    resolver,
    defaultValues: {
      email: '',
      senha: '',
      nome: '',
      data_nascimento: '',
      cpf: '',
      telefone: '',
      razao_social: '',
      cnpj: '',
      rua: '',
      numero: 0,
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: '',
    },
  });
  const { trigger } = useSWRMutation<BrasilApiCEPRequest>(
    'https://brasilapi.com.br/api/cep/v2/',
    async (url: any, { arg }: any) => {
      const response = await fetch(`${url}${arg}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      setEditable(true);
      form.setValue('rua', res.street);
      form.setValue('bairro', res.neighborhood);
      form.setValue('cidade', res.city);
      form.setValue('estado', res.state);
      form.setValue('pais', 'Brasil');
      return res;
    }
    /* opções */
  );
  const [activeTab, setActiveTab] = React.useState('login');

  function onSubmit(data: FormValues) {
    console.log(data);
    // startTransition(async () => {
    //   const formData = new FormData();
    //   Object.entries(data).forEach(([key, value]) => {
    //     formData.append(key, value.toString());
    //   });

    //   const result = await submitForm(formData);

    //   if (result.error) {
    //     toast({
    //       title: 'Error',
    //       description: result.error,
    //       variant: 'destructive',
    //     });
    //   } else if (result.success) {
    //     toast({
    //       title: 'Success',
    //       description: result.success,
    //     });
    //   }
    // });
  }
  return (
    <>
      {/* <></> */}
      <div className="flex justify-center items-center h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-[800px]">
              <CardHeader>
                <CardTitle>Formulário de Registro</CardTitle>
                <CardDescription>
                  Preencha os dados para se registrar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="login">Conta</TabsTrigger>
                    <TabsTrigger value="responsavel">Responsável</TabsTrigger>
                    <TabsTrigger value="empresa">Empresa</TabsTrigger>
                    <TabsTrigger value="endereco">Endereço</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="responsavel" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="data_nascimento"
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
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <InputMask
                              mask="999.999.999-99"
                              value={field.value}
                              onChange={field.onChange}
                            >
                              <Input placeholder="Insira o CPF" />
                            </InputMask>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="empresa" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="razao_social"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Razão Social</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="endereco" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        // trigger('88802140');

                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <InputMask
                              mask="99999-999"
                              value={field.value}
                              maskChar={null}
                              onChange={value => {
                                const cep = value.target.value
                                  .replace('-', '')
                                  .replace('_', '');
                                field.onChange(value.target.value);
                                if (cep.length > 7) {
                                  trigger(cep);
                                  return;
                                }
                                setEditable(false);
                              }}
                            >
                              <Input placeholder="Insira o CEP" />
                            </InputMask>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="rua"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rua</FormLabel>
                            <FormControl>
                              <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-1 w-1/3">
                        <FormField
                          control={form.control}
                          name="numero"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  disabled={!editable}
                                  onChange={e =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="complemento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input disabled={!editable} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bairro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input disabled {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cidade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="pais"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>País</FormLabel>
                          <FormControl>
                            <Input disabled {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const tabs = [
                      'login',
                      'responsavel',
                      'empresa',
                      'endereco',
                    ];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Anterior
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  onClick={() => {
                    const tabs = [
                      'login',
                      'responsavel',
                      'empresa',
                      'endereco',
                    ];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
                >
                  {activeTab === 'endereco'
                    ? isPending
                      ? 'Enviando...'
                      : 'Enviar'
                    : 'Próximo'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
}
