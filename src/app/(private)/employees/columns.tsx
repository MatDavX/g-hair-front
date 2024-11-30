'use client';

import { TableAvatar } from '@/components/table/avatar';
import { Cell } from '@/components/table/cell';
import { HeaderTable } from '@/components/table/header';
import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { RowAction } from './_components/row-action';
import { DataTable } from '@/components/table/data-table';
import { InputSearch } from '@/components/table/input-search';
import type { EmployeeRequest } from '@/types/requests';
import { formatPhoneNumber } from '@/utils/format-number';

const columns: ColumnDef<EmployeeRequest>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => {
      return <HeaderTable column={column} title="Nome" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`customers/${row.original.id}`} rel="noopener noreferrer">
          <Cell className="flex items-center gap-2">
            <TableAvatar name={row.getValue('nome')} image="" />
            {row.getValue('nome')}
          </Cell>
        </Link>
      );
    },
  },
  {
    accessorKey: 'telefone',
    header: ({ column }) => {
      return <HeaderTable column={column} title="Telefone" />;
    },
    cell: ({ row }) => {
      const original = formatPhoneNumber(row.getValue('telefone') as string);
      const apiUrl = 'https://api.whatsapp.com/send?phone=';

      return (
        <Cell>
          <Link
            href={`${apiUrl}${row.getValue('telefone')}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant={'ghost'}>{original}</Button>
          </Link>
        </Cell>
      );
    },
  },
  {
    accessorKey: 'comissao',
    header: ({ column }) => {
      return <HeaderTable column={column} title="Comissão" />;
    },
    cell: ({ row }) => {
      return <Cell>{row.getValue('comissao')}</Cell>;
    },
  },
];

type Props = {
  data: EmployeeRequest[];
};

export function TableEmployees({ data }: Props) {
  return (
    <DataTable
      search={table => (
        <InputSearch
          table={table}
          options={{ id: 'nome', placeholder: 'Busca por nome' }}
        />
      )}
      data={data}
      columns={columns}
    />
  );
}
