'use client';
import { HeaderTable } from '@/components/header-table';
import { RowTable } from '@/components/row-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { ServicesRequest } from '@/types/response';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EditServiceDialog } from './dialog-edit-service';

const columnHelper = createColumnHelper<ServicesRequest>();

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

  columnHelper.accessor('descricao', {
    id: 'Descrição',
    header: ({ column }) => (
      <HeaderTable column={column}>Descrição</HeaderTable>
    ),
    cell: ({ cell }) => {
      return <RowTable>{cell.getValue()}</RowTable>;
    },
  }),
  columnHelper.display({
    id: 'action',
    cell: ({ cell }) => {
      const service = cell.row.original;
      return (
        <RowTable className="text-right">
          <EditServiceDialog service={service} />
        </RowTable>
      );
    },
  }),
] as ColumnDef<ServicesRequest, unknown>[];
