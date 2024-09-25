import React from 'react';
import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Icon } from '@/lib/icons';

export function TableSkeleton() {
  const tableData = React.useMemo(() => Array(5).fill({}), []);
  const tableHeader = React.useMemo(() => Array(5).fill({}), []);
  const tableColumns = React.useMemo(() => Array(5).fill({}), []);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeader.map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-6 w-[100px] bg-muted" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((_, index) => (
            <TableRow key={index}>
              {tableColumns.map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-4 w-[100px] bg-muted" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
