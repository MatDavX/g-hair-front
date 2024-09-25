import { Metadata } from 'next';
import { TableCustomers } from './columns';
import { people } from '@/app/api/fake';
import { api } from '@/lib/fetcher/fetch';

export const metadata: Metadata = {
  title: 'Clientes | G-Pet',
  description: 'Pagina de clientes da G-Pet'
};

export default async function Page() {
  const socorro = await api.get('https://pokeapi.co/api/v2/pokemon/ditto', {});

  return <TableCustomers data={people} />;
}
