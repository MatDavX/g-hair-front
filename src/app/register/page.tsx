import { Case, Default, Switch } from '@/components/condition-component';
import { Button } from '@/components/ui/button';
import { ChangeTheme } from '@/components/ui/change-theme';
import { Icon } from '@/lib/icons';
import { Metadata } from 'next';
import Link from 'next/link';
import { FormName } from './form-name';
import { FormCity } from './form-city';

export const metadata: Metadata = {
  title: 'Register | G-Pet',
  description: 'Pagina de registro da G-Pet'
};

type SearchParamsProps = {
  searchParams: {
    step: number;
  };
};

export default function Register({ searchParams }: SearchParamsProps) {
  async function submit(form: FormData) {
    'use server';
    console.log(form.get('cep'));
  }
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="relative h-full">
        <div className="relative h-full w-full">
          <img
            src="./image.jpeg"
            alt="Background Image"
            className="h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-background" />
      </div>

      <div className="h-full p-10">
        <div className="w-full flex justify-end">
          <ChangeTheme />
        </div>
        <div>
          <p className="text-lg font-semibold mb-5">
            Seja-bem vindo!! a página de cadastro da
            <span className="text-primary font-semibold"> G-Pet</span>
          </p>

          <Switch>
            <Default>
              <FormName />
            </Default>
            <Case condition={searchParams.step == 2}>
              <FormCity />
            </Case>
          </Switch>
          <Button variant={'outline'} type="button">
            <Link
              href={'/'}
              className="text-primary h-full w-full justify-center flex gap-2 items-center"
            >
              <span>
                <Icon.back className="h-5 w-5" />
              </span>
              Voltar
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
