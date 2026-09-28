import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-mono font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-400 text-ink shadow-lg shadow-emerald-500/20 hover:bg-emerald-300',
  secondary:
    'border border-slate-700/80 bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white',
  ghost: 'text-slate-400 hover:text-slate-200',
  danger:
    'border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-sm font-bold',
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const buttonClasses = ({
  variant = 'primary',
  size = 'md',
}: StyleProps = {}): string => cn(BASE, VARIANTS[variant], SIZES[size]);

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<'button'> & StyleProps) {
  return (
    <button
      className={cn(buttonClasses({ variant, size }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link
      className={cn(buttonClasses({ variant, size }), className)}
      {...props}
    />
  );
}
