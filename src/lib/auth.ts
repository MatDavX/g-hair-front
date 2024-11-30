import NextAuth, { CredentialsSignin, DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './zod/signIn-schema';
import { api } from './fetcher/fetch';
import { ZodError } from 'zod';

type UserProps = {
  id: string;
  token: string;
  role: string;
} & DefaultSession['user'];

declare module 'next-auth' {
  interface User {
    token: string;
    role: string;
  }

  interface Session {
    user: UserProps;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new CredentialsSignin('Please provide both email & password');
        }

        const body = {
          email: credentials.email,
          senha: credentials.password,
        };

        const getToken = await api.post<{ token: string }>('/sessao', {
          body: JSON.stringify(body),
        });

        if (!getToken) {
          throw new Error('Invalid email or password');
        }

        const me = await api.get<{
          id: string;
          email: string;
          responsavel: string;
        }>('/me', {
          bearer: getToken.token,
        });

        if (!me) {
          throw new Error('Invalid email or password');
        }

        const user = {
          id: me.id,
          name: me.responsavel,
          email: me.email,
          role: 'admin',
          token: getToken.token,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.token = token.token as string;
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
});
