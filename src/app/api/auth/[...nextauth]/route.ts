import { api } from '@/lib/fetcher/fetch';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Por favor, insira seu nome de usuário e senha.');
        }
        const body = {
          email: credentials.email,
          senha: credentials.password,
        };

        const getToken = await api.post<{ token: string }>('/sessao', {
          body: JSON.stringify(body),
        });

        if (!getToken) throw new Error('Usuário não encontrado.');

        const me = await api.get<{
          id: string;
          email: string;
          responsavel: string;
        }>('/me', {
          bearer: getToken.token,
        });

        if (!me) throw new Error('Falha ao buscar dados do perfil.');

        return {
          id: me.id,
          name: me.email,
          email: me.email,
          token: getToken.token,
          role: 'adm',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
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
      console.log({ token });
      console.log({ session });
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
