'use client';

import { TableAvatar } from '@/components/table/avatar';
import { Cell } from '@/components/table/cell';
import { HeaderTable } from '@/components/table/header';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { DataTable } from '@/components/table/data-table';
import { InputSearch } from '@/components/table/input-search';
import type { ServiceRequest } from '@/types/requests';

const columns: ColumnDef<ServiceRequest>[] = [
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
    accessorKey: 'descricao',
    header: ({ column }) => {
      return <HeaderTable column={column} title="Descrição" />;
    },
    cell: ({ row }) => {
      return <Cell>{row.getValue('descricao')}</Cell>;
    },
  },
  {
    accessorKey: 'valor',
    header: ({ column }) => {
      return <HeaderTable column={column} title="Valor" />;
    },
    cell: ({ row }) => {
      const value = Number(row.getValue('valor')) as number;
      console.log();
      return (
        <Cell>
          {value.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
        </Cell>
      );
    },
  },
];

type Props = {
  data: ServiceRequest[];
};

export function TableServices({ data }: Props) {
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
