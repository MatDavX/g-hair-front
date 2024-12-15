import { removeScheduling } from './action-server';

export async function handleDelete(id: string) {
  await removeScheduling(id);
}

export function appearButtonFinish(date: Date) {
  return new Date() > new Date(date);
}
