import { StatusBadge } from '@/components/StatusBadge';
import { formatRelativeTime } from '@/lib/format';
import type { FeatureRequestWithProject } from '@/types';

export function FeatureRequestList({
  requests,
}: {
  requests: FeatureRequestWithProject[];
}) {
  if (requests.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-800 p-10 text-center font-mono text-sm text-slate-500">
        No feature requests yet. Be the first to suggest one.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {requests.map((request) => (
        <li
          key={request.id}
          className="card-enter flex items-start gap-4 rounded-lg border border-slate-800/80 bg-panel p-5 transition-colors hover:border-slate-700"
        >
          <div className="flex w-14 shrink-0 flex-col items-center rounded-md border border-slate-800 py-2 font-mono">
            <span aria-hidden="true" className="text-xs text-emerald-400">
              ▲
            </span>
            <span className="text-base font-semibold text-slate-100">
              {request.votes}
            </span>
            <span className="sr-only">upvotes</span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-500">
                {request.projectName}
              </span>
              <StatusBadge status={request.status} />
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              {request.title}
            </h3>
            <p className="text-sm leading-6 text-slate-400">
              {request.description}
            </p>
            <p className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <span>{request.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={request.createdAt}>
                {formatRelativeTime(request.createdAt)}
              </time>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
