export function returnAllValuesForm<T extends Record<string, any>>(
  formData: FormData
): T {
  const formValue: Partial<T> = {};
  //@ts-ignore
  for (let [key, value] of formData.entries()) {
    formValue[key as keyof T] = value as T[keyof T];
  }
  return formValue as T;
}
