import type { NextAuthConfig } from 'next-auth';

/**
 * Proxy-safe config: no database or bcrypt imports. `auth.ts` extends this
 * with the Credentials provider.
 */
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);

      // Returning false redirects to `pages.signIn` with a `callbackUrl`.
      if (nextUrl.pathname.startsWith('/admin')) return isLoggedIn;

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/admin', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
