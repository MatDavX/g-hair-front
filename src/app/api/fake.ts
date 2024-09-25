export type UserProps = {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastService: string;
  born: string;
  cpf: string;
  observation: {
    id: number;
    description: string;
    date: string;
  }[];
  tags: {
    id: number;
    description: string;
    color: string;
  }[];
  pets: { id: number; name: string; race: string }[];
  created: string;
};

export const people = [
  {
    id: 1,
    name: 'Vanda Althoff',
    email: 'email@email.com.br',
    born: '2000-03-13',
    cpf: '04048226061',
    phone: '(48) 99844-7068',
    lastService: '-',
    observation: [
      { id: 1, description: 'TESTE DE OBSERVACAO', date: '24/03/200 - 23:00' },
      { id: 2, description: 'TESTE DE OBSERVACAO 2', date: '24/04/200 - 00:00' }
    ],
    tags: [
      {
        id: 1,
        description: 'Client',
        color: 'orange'
      },
      {
        id: 2,
        description: 'PCD',
        color: 'blue'
      }
    ],
    pets: [
      {
        id: 1,
        name: 'Laila',
        type: 'dog',
        race: 'Terrie'
      },
      {
        id: 2,
        name: 'Lincei',
        type: 'cat',
        race: 'Persia'
      }
    ],
    created: '2024-03-02'
  },
  {
    id: 2,
    name: 'Muka The Fear',
    email: 'Puka@email.com.br',
    born: '2000-03-13',
    cpf: '04048226061',
    phone: '(48) 99844-7068',
    lastService: '-',
    observation: [
      { id: 1, description: 'MUka DE OBSERVACAO', date: '24/03/200 - 23:00' },
      { id: 2, description: 'Gay DE OBSERVACAO 2', date: '24/04/200 - 00:00' }
    ],
    tags: [
      {
        id: 1,
        description: 'Client',
        color: 'orange'
      },
      {
        id: 2,
        description: 'GAy',
        color: 'pink'
      }
    ],
    pets: [
      {
        id: 1,
        name: 'Client',
        type: 'cat',
        race: 'orange'
      },
      {
        id: 2,
        name: 'PCD',
        type: 'cat',
        race: 'blue'
      }
    ],
    created: '2024-04-02'
  }
];
