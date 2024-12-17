export function formatNumberToCurrency(value: number) {
  const format = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  return format;
}
