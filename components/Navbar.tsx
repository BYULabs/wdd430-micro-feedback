'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigationLinks = [
  { href: '/explore', label: 'Explore' },
  { href: '/projects', label: 'Projects' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-white/[.08] bg-[#09090b] text-zinc-300">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm font-semibold tracking-tight text-zinc-50 transition-colors hover:text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          ~/producthub
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 sm:flex"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative px-3 py-2 text-sm transition-colors hover:text-zinc-50 ${
                isActive(link.href) ? 'text-zinc-50' : 'text-zinc-500'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-[1.05rem] h-px bg-emerald-400"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href="#submit"
            className="hidden rounded-md border border-white/[.12] px-3 py-2 text-zinc-400 transition-colors hover:border-white/[.24] hover:text-zinc-50 sm:inline-flex"
          >
            + Submit request
          </Link>
          <Link
            href="/sign-in"
            className="hidden rounded-md bg-zinc-100 px-3 py-2 font-medium text-zinc-950 transition-colors hover:bg-white sm:inline-flex"
          >
            Sign in <span aria-hidden="true">-&gt;</span>
          </Link>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/[.12] text-zinc-300 transition-colors hover:border-white/[.24] hover:text-zinc-50 sm:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {isMenuOpen ? 'x' : '='}
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-white/[.08] px-6 py-3 sm:hidden"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`rounded-md px-3 py-3 text-sm transition-colors hover:bg-white/[.06] hover:text-zinc-50 ${
                  isActive(link.href)
                    ? 'bg-white/[.06] text-zinc-50'
                    : 'text-zinc-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {isActive(link.href) && (
                  <span className="mr-2 text-emerald-400">&gt;</span>
                )}
                {link.label}
              </Link>
            ))}
            <Link
              href="#submit"
              className="rounded-md px-3 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/[.06] hover:text-zinc-50"
              onClick={() => setIsMenuOpen(false)}
            >
              + Submit request
            </Link>
            <Link
              href="/sign-in"
              className="mt-1 rounded-md bg-zinc-100 px-3 py-3 text-center text-sm font-medium text-zinc-950"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in -&gt;
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
