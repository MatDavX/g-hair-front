'use client';
import { HeaderTable } from '@/components/header-table';
import { RowTable } from '@/components/row-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { BoxFinanceRequest } from '@/types/response';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EditBoxDialog } from './dialog-edit-box';
import { ViewSchedulingDialog } from './dialog-view-scheduling';
import { formatNumberToCurrency } from '@/utils/format-to-currency';

const columnHelper = createColumnHelper<BoxFinanceRequest>();

export const columns = [
  columnHelper.display({
    id: 'Seleção',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableGlobalFilter: false,
  }),
  columnHelper.accessor('agendamento.id', {
    id: 'Agendamento',
    header: ({ column }) => (
      <HeaderTable column={column}>Agendamento</HeaderTable>
    ),
    cell: ({ row }) => {
      const scheduling = {
        agendamento: row.original.agendamento,
        cliente: row.original.cliente,
        funcionario: row.original.funcionario,
        servico: row.original.servico,
      };
      return <ViewSchedulingDialog scheduling={scheduling} />;
    },
  }),
  columnHelper.accessor('metodo_de_pagamento', {
    id: 'Método de pagamento',
    header: ({ column }) => (
      <HeaderTable column={column}>Método de pagamento</HeaderTable>
    ),
    cell: ({ cell }) => {
      return <RowTable>{cell.getValue()}</RowTable>;
    },
  }),
  columnHelper.accessor('valor_desconto', {
    id: 'Desconto',
    header: ({ column }) => <HeaderTable column={column}>Desconto</HeaderTable>,
    cell: ({ cell }) => {
      return <RowTable>{formatNumberToCurrency(cell.getValue())}</RowTable>;
    },
  }),
  columnHelper.accessor('valor_total', {
    id: 'Total',
    header: ({ column }) => <HeaderTable column={column}>Total</HeaderTable>,
    cell: ({ cell }) => {
      return <RowTable>{formatNumberToCurrency(cell.getValue())}</RowTable>;
    },
  }),
  columnHelper.display({
    id: 'action',
    cell: ({ cell }) => {
      const box = cell.row.original;
      return (
        <RowTable className="text-right">
          <EditBoxDialog box={box} />
        </RowTable>
      );
    },
  }),
] as ColumnDef<BoxFinanceRequest, unknown>[];
