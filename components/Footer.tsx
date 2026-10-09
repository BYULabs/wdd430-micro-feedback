import Link from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/utils';

const FOOTER_LINKS: Array<{ href: Route; label: string }> = [
  { href: '/', label: 'Public Feed' },
  { href: '/projects', label: 'Projects' },
  { href: '/#changelog' as Route, label: 'Changelog' },
  { href: '/admin', label: 'Dashboard' },
  { href: '/login', label: 'Admin Login' },
];

export function Footer({
  note = '© 2026 ProductHub. Built for indie developers.',
  wide = false,
}: {
  note?: string;
  wide?: boolean;
}) {
  return (
    <footer className="bg-canvas border-t border-slate-800/80 py-8">
      <div
        className={cn(
          'mx-auto flex flex-col items-center justify-between gap-4 px-4 font-mono text-xs text-slate-400 sm:flex-row sm:px-6',
          wide ? 'max-w-7xl' : 'max-w-6xl'
        )}
      >
        <p>{note}</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-emerald-400"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
