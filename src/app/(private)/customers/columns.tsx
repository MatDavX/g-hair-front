'use client';

import { TableAvatar } from '@/components/table/avatar';
import { Cell } from '@/components/table/cell';
import { HeaderTable } from '@/components/table/header';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { UserProps } from '@/app/api/fake';
import { RowAction } from './_components/row-action';
import { DataTable } from '@/components/table/data-table';
import { InputSearch } from '@/components/table/input-search';

const columns: ColumnDef<UserProps>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <HeaderTable column={column} title="Nome" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`customers/${row.original.id}`} rel="noopener noreferrer">
          <Cell className="flex items-center gap-2">
            <TableAvatar name={row.getValue('name')} image="" />
            {row.getValue('name')}
          </Cell>
        </Link>
      );
    }
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return <HeaderTable column={column} title="Telefone" />;
    },
    cell: ({ row }) => {
      const original = row.getValue('phone') as string;
      const apiUrl = 'https://api.whatsapp.com/send?phone=';
      const number = original
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(' ', '');

      return (
        <Cell>
          <Link
            href={`${apiUrl}${number}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant={'ghost'}>{row.getValue('phone')}</Button>
          </Link>
        </Cell>
      );
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <HeaderTable column={column} title="E-mail" />;
    },
    cell: ({ row }) => {
      return <Cell>{row.getValue('email')}</Cell>;
    }
  },
  {
    accessorKey: 'lastService',
    header: ({ column }) => (
      <HeaderTable column={column} title="Ultimo serviço" />
    ),
    cell: ({ row }) => {
      return <Cell>{row.getValue('lastService')}</Cell>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cell = row.original;
      return <RowAction row={cell} />;
    }
  }
];

type Props = {
  data: UserProps[];
};

export function TableCustomers({ data }: Props) {
  return (
    <DataTable
      search={(table) => (
        <InputSearch
          table={table}
          options={{ id: 'name', placeholder: 'Busca por nome' }}
        />
      )}
      data={data}
      columns={columns}
    />
  );
}
