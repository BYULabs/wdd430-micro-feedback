'use client';

import { useActionState } from 'react';
import { buttonClasses } from '@/components/Button';
import { authenticate } from '@/lib/actions';
import { cn } from '@/lib/utils';

const LABEL =
  'mb-2 block font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase';
const INPUT =
  'w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 font-mono text-sm text-slate-100 transition-colors placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/60 focus:outline-none';

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div>
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={INPUT}
        />
      </div>

      <div>
        <label htmlFor="password" className={LABEL}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          required
          className={INPUT}
        />
      </div>

      {errorMessage && (
        <p role="alert" className="font-mono text-xs text-rose-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={cn(buttonClasses({ variant: 'primary' }), 'w-full')}
      >
        {isPending ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
