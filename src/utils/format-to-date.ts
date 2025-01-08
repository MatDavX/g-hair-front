import { format } from 'date-fns';

export function formatDate(now: Date | string) {
  const formattedDate = format(now, 'yyyy-MM-dd');
  return formattedDate;
}
