type RowTableProps = {
  children: React.ReactNode;
  className?: string;
};
export function RowTable({ children, className }: RowTableProps) {
  return <p className={className}>{children ? children : '-'}</p>;
}
