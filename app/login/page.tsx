import { LoginForm } from '@/components/LoginForm';

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  // Set by Auth.js when the proxy bounces an unauthenticated visitor.
  const { callbackUrl } = await searchParams;
  const redirectTo = typeof callbackUrl === 'string' ? callbackUrl : '/admin';

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-panel p-6 shadow-2xl sm:p-8">
        <h1 className="mb-1 font-mono text-xl font-bold text-slate-100">
          Sign In
        </h1>
        <p className="mb-6 text-sm text-slate-400">
          Admin access to manage changelogs and request statuses.
        </p>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </main>
  );
}
