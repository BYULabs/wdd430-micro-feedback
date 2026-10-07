import Link from 'next/link';
import { Terminal } from 'lucide-react';

export function Logo({ badge }: { badge?: string }) {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
        <Terminal className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span className="font-mono text-lg font-bold tracking-tight text-slate-100">
        <span className="text-emerald-400">~/</span>product
        <span className="text-emerald-400">hub</span>
        {badge ? (
          <span className="ml-2 rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-normal text-emerald-400">
            {badge}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
