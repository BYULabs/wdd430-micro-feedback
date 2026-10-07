import { User, GitBranch, LayoutDashboard } from 'lucide-react';
import { auth } from '@/auth';
import { ButtonLink } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { MainNav } from '@/components/MainNav';
import { SignOutButton } from '@/components/SignOutButton';

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-canvas/85 sticky top-0 z-40 border-b border-slate-800/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <MainNav />

          <div className="flex shrink-0 items-center gap-2.5">
            {session?.user ? (
              <>
                <ButtonLink
                  href="/admin"
                  variant="primary"
                  size="md"
                  className="hidden sm:inline-flex"
                >
                  <LayoutDashboard className="h-4 w-4" aria-hidden />
                  Dashboard
                </ButtonLink>
                <SignOutButton />
              </>
            ) : (
              <>
                <ButtonLink href="/login" variant="secondary" size="md">
                  <User className="h-4 w-4" aria-hidden />
                  Sign In
                </ButtonLink>
                <ButtonLink
                  href="/login"
                  variant="primary"
                  size="md"
                  className="hidden sm:inline-flex"
                >
                  <GitBranch className="h-4 w-4" aria-hidden />
                  Get Started
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
