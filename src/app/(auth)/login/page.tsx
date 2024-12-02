'use client';

import { useState } from 'react';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { type FormTypeSchemaLogin, resolverLogin } from './schema';
import { handleSubmit } from './server-action';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormTypeSchemaLogin>({
    resolver: resolverLogin,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormTypeSchemaLogin) {
    const body = {
      email: values.email,
      senha: values.password,
    };

    const response = await handleSubmit(body);
    setError('Email ou senha inválidos.');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-[350px]">
        <CardHeader>
          {error && (
            <Alert variant="destructive" className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Algo deu errado!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Use suas credenciais para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        alt="Campo de email"
                        placeholder="Informe seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="current-password"
                        alt="Campo de senha"
                        autoSave="off"
                        type="password"
                        placeholder="Informe sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
}
