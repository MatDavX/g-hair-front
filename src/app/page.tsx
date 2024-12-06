import { api } from '@/lib/fetch';

export default async function Home() {
  const response = await api.get('/agendamentos');

  console.log(response);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>Teste</p>
    </div>
  );
}
