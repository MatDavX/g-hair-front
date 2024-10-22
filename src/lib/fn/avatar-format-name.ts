export function getNameWithSpace(name?: string) {
  if (!name) return '';
  const splitName = name.toLowerCase().split(' ');

  const initialNames = splitName
    .slice(0, 3)
    .map((word) => word[0])
    .join('');

  return initialNames.toLocaleUpperCase();
}
