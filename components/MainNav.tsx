'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { cn } from '@/lib/utils';

interface NavLink {
  href: Route;
  label: string;
  /** Path prefix that marks this link current; `null` for in-page deep links. */
  match: string | null;
}

const LINKS: NavLink[] = [
  { href: '/', label: './feed', match: '/' },
  { href: '/projects', label: './projects', match: '/projects' },
];

const isActive = (pathname: string, match: string | null): boolean => {
  if (match === null) return false;
  return match === '/' ? pathname === '/' : pathname.startsWith(match);
};

function NavLinks({ pathname, mobile }: { pathname: string; mobile: boolean }) {
  return LINKS.map(({ href, label, match }) => {
    const active = isActive(pathname, match);

    return (
      <Link
        key={label}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'transition-colors',
          mobile && 'whitespace-nowrap',
          active
            ? 'font-semibold text-emerald-400'
            : 'text-slate-400 hover:text-emerald-400'
        )}
      >
        {label}
      </Link>
    );
  });
}

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <nav
        aria-label="Main"
        className="hidden items-center gap-6 font-mono text-sm md:flex"
      >
        <NavLinks pathname={pathname} mobile={false} />
      </nav>

      <nav
        aria-label="Main (mobile)"
        className="-mt-1 flex items-center gap-5 overflow-x-auto pb-3 font-mono text-xs md:hidden"
      >
        <NavLinks pathname={pathname} mobile />
      </nav>
    </>
  );
}
