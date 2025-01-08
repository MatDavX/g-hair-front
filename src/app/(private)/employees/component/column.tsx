'use client';
import { HeaderTable } from '@/components/header-table';
import { RowTable } from '@/components/row-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { EmployerRequest } from '@/types/response';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EditEmployerDialog } from './dialog-edit-employer';

const columnHelper = createColumnHelper<EmployerRequest>();

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
  columnHelper.accessor('ativo', {
    id: 'Ativo',
    header: ({ column }) => <HeaderTable column={column}>Ativo</HeaderTable>,
    cell: ({ cell }) => {
      const isActive = cell.getValue() ? 'Ativo' : 'Inativo';
      return <RowTable>{isActive}</RowTable>;
    },
  }),
  columnHelper.display({
    id: 'action',
    cell: ({ cell }) => {
      const user = cell.row.original;
      return (
        <RowTable className="text-right">
          <EditEmployerDialog user={user} />
        </RowTable>
      );
    },
  }),
] as ColumnDef<EmployerRequest, unknown>[];
