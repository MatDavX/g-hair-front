import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { api } from './ky';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, senha } = credentials;
        const { token } = await api
          .post<{ token: string }>('sessao', {
            json: { email, senha },
          })
          .json();
        if (!token) return null;
        const me = await api
          .get<{
            id: string;
            email: string;
            responsavel: string;
          }>('me', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .json();

        if (!me) return null;
        const user = {
          id: me.id,
          name: me.responsavel,
          email: me.email,
          role: 'admin',
          token: token,
        };
        return user;
      },
    }),
  ],
});
