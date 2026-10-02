import type { RequestStatus } from '@/types';

const statusStyles: Record<RequestStatus, string> = {
  'Under Review': 'border-slate-700 bg-slate-800 text-slate-400',
  Planned: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
  'In Progress': 'border-amber-500/20 bg-amber-500/10 text-amber-400',
  Completed: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`rounded border px-2 py-0.5 font-mono text-xs ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
