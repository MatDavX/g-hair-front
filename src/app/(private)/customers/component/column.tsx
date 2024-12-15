'use client';
import { HeaderTable } from '@/components/header-table';
import { RowTable } from '@/components/row-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { CustomerRequest } from '@/types/response';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EditCustomerDialog } from './dialog-edit-customer';

const columnHelper = createColumnHelper<CustomerRequest>();

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
  columnHelper.accessor('nome', {
    id: 'Nome',
    header: ({ column }) => <HeaderTable column={column}>Nome</HeaderTable>,
    cell: ({ cell }) => {
      return <RowTable>{cell.getValue()}</RowTable>;
    },
  }),
  columnHelper.accessor('telefone', {
    id: 'Telefone',
    header: ({ column }) => <HeaderTable column={column}>Telefone</HeaderTable>,
    cell: ({ cell }) => {
      return <RowTable>{cell.getValue()}</RowTable>;
    },
  }),
  columnHelper.accessor('ultimo_servico', {
    id: 'Último serviço',
    header: ({ column }) => (
      <HeaderTable column={column}>Último serviço</HeaderTable>
    ),
    cell: ({ cell }) => {
      return <RowTable>{cell.getValue()}</RowTable>;
    },
  }),
  columnHelper.display({
    id: 'action',

    cell: ({ cell }) => {
      const customer = cell.row.original;
      return (
        <RowTable className="text-right">
          <EditCustomerDialog customer={customer} />
        </RowTable>
      );
    },
  }),
] as ColumnDef<CustomerRequest, unknown>[];
