import { encrypt } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function createSession(token: number) {
  const { set } = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ token: token, expiresAt });
  set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}
