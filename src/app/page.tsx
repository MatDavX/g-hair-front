import { Button } from '@/components/ui/button';
// import { ChangeTheme } from '@/components/change-theme';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar | G-Hair',
  description: 'Pagina de login da G-Hair',
};

export default async function Login() {
  async function submit(form: FormData) {
    'use server';
    console.log(form);
    await signIn('credentials', {
      email: form.get('email') as string,
      password: form.get('password') as string,
      redirectTo: '/scheduling',
    });
  }
  return (
    <main className="grid grid-cols-3 h-screen">
      <div className="relative h-full">
        <div className="relative h-full w-full">
          {/*eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="./image.png"
            alt="Background Image"
            className="h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-background" />
      </div>
      <article className="h-full p-10 justify-center flex flex-col font-medium border-r">
        <p className="text-3xl text-pretty font-semibold">
          Organize suas <span className="text-primary"> finanças </span> e
          gerencie seus <span className="text-primary"> clientes </span> com
          facilidade, garantindo uma gestão eficiente e o sucesso do seu salão.
        </p>
        <p className="mt-6">
          Um sistema feito para <span className="text-primary">você</span>, e
          seus <span className="text-primary">clientes.</span>
        </p>
      </article>
      <div className="h-full p-10">
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
          <Input
            type="password"
            placeholder="Insira uma senha"
            name="password"
          />
          <Button type="submit"> Entrar </Button>
        </form>
      </div>
    </main>
  );
}
