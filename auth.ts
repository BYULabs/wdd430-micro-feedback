import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from '@/auth.config';
import { getUserByEmail } from '@/lib/data';

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.passwordHash
        );
        if (!passwordsMatch) return null;

        // Only these fields end up in the session JWT.
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
});

/**
 * Call at the top of every admin-only Server Action or Route Handler. The
 * proxy only guards pages; actions can be invoked directly over HTTP.
 */
export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) throw new Error('Not authenticated');
  return session;
}
