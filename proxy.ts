import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

// Next.js 16 renamed `middleware.ts` to `proxy.ts`.
export default NextAuth(authConfig).auth;

export const config = {
  // Only the routes the `authorized` callback cares about.
  matcher: ['/admin/:path*', '/login'],
};
