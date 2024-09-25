'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '../ui/input';
type Props<TData> = {
  table: Table<TData>;
  options: {
    id: string;
    placeholder: string;
  };
};
export function InputSearch<TData>({ table, options }: Props<TData>) {
  return (
    <Input
      placeholder={options.placeholder}
      value={table.getColumn(options.id)?.getFilterValue() as string}
      onChange={(event) =>
        table.getColumn(options.id)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
