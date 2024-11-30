export function transformPhoneNumber(number: string) {
  const numericPhone = number.replace(/\D/g, '');

  return numericPhone.length > 11 ? numericPhone.slice(-11) : numericPhone;
}
