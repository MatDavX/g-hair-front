import type { Metadata } from 'next';
import { Login } from './login';

export const metadata: Metadata = {
  title: 'Entrar | G-Hair',
  description: 'Pagina de login da G-Hair',
};

export default async function Page() {
  return (
    <main className="grid grid-cols-3 h-screen">
      <div className="relative h-full">
        <div className="relative h-full w-full">
          {/*eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="./image.png"
            // biome-ignore lint/a11y/noRedundantAlt: <explanation>
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
        <Login />
        {/* <Link className="self-center" href={'/register'}>
            Criar uma conta
          </Link> */}
      </div>
    </main>
  );
}
