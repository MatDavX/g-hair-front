import { format as formatDate, FormatOptions } from 'date-fns';

function format(
  data: Date | number | string,
  formatStr: string,
  options?: FormatOptions
) {
  const date = formatDate(data, formatStr, options);
  return date;
}

export { format };
