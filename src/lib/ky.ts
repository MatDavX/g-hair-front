import ky from 'ky';
import { getSession } from 'next-auth/react';
import { auth } from './auth';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async request => {
        let token = '';

        if (typeof window === 'undefined') {
          const session = await auth();

          token = session?.user?.token || '';
        } else {
          const session = await getSession();
          token = session?.user?.token || '';
        }
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
