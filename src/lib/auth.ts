import NextAuth, { type DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signInSchema } from './zod/signIn-schema';
import { api } from './fetcher/fetch';

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
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          if (!email || !password) {
            throw new Error('Por favor, insira seu nome de usuário e senha.');
          }

          const body = {
            email: email,
            senha: password,
          };

          const data = await api.post<{ token: string }>('/sessao', {
            body: JSON.stringify(body),
          });

          if (!data) throw new Error('Falha ao buscar dados do perfil.');

          const me = await api.get<{
            id: string;
            email: string;
            responsavel: string;
          }>('/me', {
            bearer: data.token,
          });
          if (!me) throw new Error('Falha ao buscar dados do perfil.');
          return {
            id: me.id,
            name: me.email,
            email: me.email,
            token: data.token,
            role: 'ADMIN',
          };
        } catch (error: any) {
          throw new Error('Falha ao buscar dados do perfil.');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
});
