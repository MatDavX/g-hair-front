import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cookies } from 'next/headers';

export async function FormCity() {
  const cookieStore = cookies();

  async function submit(formData: FormData) {
    'use server';
    console.log(formData);
    return console.log('1');
  }

  return (
    <form
      className="justify-center h-full w-11/12 flex flex-col gap-3"
      action={submit}
    >
      <Label title="CEP" htmlFor="cep">
        CEP
      </Label>
      <Input type="text" name="cep" placeholder="Insira o CEP" />
      <Label title="Telefone" htmlFor="phone">
        Telefone
      </Label>
      <Input
        type="text"
        name="phone"
        placeholder="Insira o numero de celular"
      />

      <Button type="submit">Enviar</Button>
    </form>
  );
}
