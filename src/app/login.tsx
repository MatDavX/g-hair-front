'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Login() {
  const { push } = useRouter();
  async function submit(form: FormData) {
    const res = await signIn('credentials', {
      email: form.get('email') as string,
      password: form.get('password') as string,
      redirect: false,
    });
    if (res?.status === 200) {
      push('/dashboard');
    }
  }
  return (
    <form
      className="justify-center h-full w-11/12 flex flex-col gap-4"
      action={submit}
    >
      <p className="text-2xl font-semibold">
        Seja-bem vindo! ao <span className="text-primary">G-Hair</span>
      </p>
      <Label title="Email" htmlFor="email">
        E-mail
      </Label>
      <Input type="email" name="email" placeholder="Insira seu email" />
      <Label title="Senha" htmlFor="password">
        Senha
      </Label>
      <Input type="password" placeholder="Insira uma senha" name="password" />
      <Button type="submit"> Entrar </Button>
    </form>
  );
}
