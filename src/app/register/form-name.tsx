import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { returnAllValuesForm } from '@/lib/form-return-value';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export function FormName() {
  const cookieStore = cookies();

  async function submit(formData: FormData) {
    'use server';
    const formValue = returnAllValuesForm<{
      name: string;
      email: string;
      work: string;
    }>(formData);

    // console.log(formData.);
    // cookieStore.set('g-pet|form-name', JSON.stringify(formValue));
    return redirect('/register?step=2');
  }

  return (
    <form
      id="form-name"
      className="justify-center h-full w-11/12 flex flex-col gap-3"
      action={submit}
    >
      <Label title="Nome" htmlFor="name">
        Nome Completo
      </Label>
      <Input type="text" name="name" placeholder="Insira seu nome" />
      <Label title="Email" htmlFor="email">
        Email
      </Label>
      <Input type="email" name="email" placeholder="Insira seu email" />
      <Label title="NomeEstabelecimento" htmlFor="work">
        Nome do estabelecimento
      </Label>
      <Input
        type="text"
        name="work"
        placeholder="Insira o nome do estabelecimento"
      />

      <Button type="submit">Proximo</Button>
    </form>
  );
}
