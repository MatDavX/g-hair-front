export function formatPhoneNumber(phoneNumber: string) {
  const fullNumber = phoneNumber.padStart(11, '0');

  const countryCode = '+55';
  const areaCode = fullNumber.slice(0, 2);
  const firstPart = fullNumber.slice(2, 7);
  const secondPart = fullNumber.slice(7);

  return `${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
}
