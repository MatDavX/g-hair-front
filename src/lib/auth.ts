import NextAuth, { CredentialsSignin, type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { signInSchema } from './zod/signIn-schema';
import { api } from './fetcher/fetch';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}
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
    Github,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          let user = null;

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const body = {
            email: email,
            senha: password,
          };

          const data = await api.post<{ token: string }>('/sessao', {
            body: JSON.stringify(body),
          });

          const me = await api.get<{
            id: string;
            email: string;
            responsavel: string;
          }>('/me', {
            bearer: data.token,
          });

          user = {
            id: me.id,
            name: me.responsavel,
            email: me.email,
            role: 'admin',
            token: data.token,
          };

          if (!user) {
            throw new Error('Usuário não encontrado.');
          }

          return user;
        } catch (error: any) {
          console.error('Error:', error);
          if (error instanceof ZodError) {
            throw new CustomError('invalid_schema');
          }
          throw new CustomError(error.message);
        }
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
