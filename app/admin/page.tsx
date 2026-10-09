import { auth } from '@/auth';

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-slate-400">
        Welcome back, {session?.user?.name ?? 'admin'}.
      </p>
    </main>
  );
}
