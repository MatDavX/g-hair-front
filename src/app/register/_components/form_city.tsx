import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cookies } from 'next/headers';

export function FormCity() {
  async function submit(formData: FormData) {
    'use server';
    console.log(formData);
    // const body;
    const formDataString = JSON.stringify(
      Object.fromEntries(formData.entries())
    );
    cookies().set('formData', formDataString);
    console.log(formDataString);
    return console.log('1');
  }
  return (
    <form action={submit}>
      <Label htmlFor="city">Cidade</Label>
      <Input type="text" name="city" placeholder="Insira sua cidade" />
      <Button type="submit"> Próximo </Button>
    </form>
  );
}
