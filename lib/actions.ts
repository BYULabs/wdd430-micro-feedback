'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === 'CredentialsSignin'
        ? 'Invalid email or password.'
        : 'Something went wrong. Please try again.';
    }
    // signIn throws a redirect on success; let Next.js handle it.
    throw error;
  }
}
