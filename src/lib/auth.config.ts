import type { DefaultSession, NextAuthConfig } from 'next-auth';
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

const protectedRoutes = [
  '/scheduling',
  '/dashboard',
  '/customers',
  '/services',
  '/employees',
];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
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
      session.user.token = token.token as string;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      const isProtectedRoute = protectedRoutes.includes(path);
      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      if (isLoggedIn) {
        const date = new Date().toISOString();
        return Response.redirect(new URL(`/scheduling?date=${date}`, nextUrl));
      }
      return true;
    },
  },
  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
