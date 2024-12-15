'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { useFormState } from '@/hooks/use-form-state';
import { signinWithEmailAndPassword } from './server-action';

export default function LoginPage() {
  const router = useRouter();
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signinWithEmailAndPassword,
    true,
    () => {
      const date = new Date().toISOString();
      router.push(`/scheduling?date=${date}`);
    }
  );
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-[350px]">
        <CardHeader>
          {!success && message && (
            <Alert variant="destructive" className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Algo deu errado!</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Use suas credenciais para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-1">
              <Label>E-mail</Label>
              <Input
                name="email"
                alt="Campo de email"
                placeholder="Informe seu e-mail"
              />
              {errors?.email && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.email[0]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Senha</Label>
              <Input
                name="senha"
                autoComplete="current-password"
                alt="Campo de senha"
                autoSave="off"
                type="password"
                placeholder="Informe sua senha"
              />
              {errors?.senha && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.senha[0]}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
