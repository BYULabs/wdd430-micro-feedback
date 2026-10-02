import { Clock, Tag } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import UpvoteButton from '@/components/UpvoteButton';
import { formatRelativeTime } from '@/lib/format';
import type { FeatureRequestWithProject } from '@/types';

interface FeatureRequestCardProps {
  request: FeatureRequestWithProject & { hasVoted?: boolean };
  onToggleVote?: (requestId: string, hasVoted: boolean) => void;
}

export default function FeatureRequestCard({
  request,
  onToggleVote,
}: FeatureRequestCardProps) {
  return (
    <article className="card-enter flex items-start gap-4 rounded-xl border border-slate-800/80 bg-panel p-5 transition-colors hover:border-slate-700">
      <UpvoteButton
        requestId={request.id}
        initialVoteCount={request.votes}
        initialHasVoted={request.hasVoted}
        onToggle={onToggleVote}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-xs text-emerald-400">
            {request.projectName}
          </span>
          <StatusBadge status={request.status} />
        </div>

        <h3 className="mb-1.5 text-base font-bold tracking-tight text-slate-100">
          {request.title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-slate-400">
          {request.description}
        </p>

        <div className="flex items-center gap-4 font-mono text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" aria-hidden /> {request.category}
          </span>
          <time
            dateTime={request.createdAt}
            className="inline-flex items-center gap-1"
          >
            <Clock className="h-3.5 w-3.5" aria-hidden />{' '}
            {formatRelativeTime(request.createdAt)}
          </time>
        </div>
      </div>
    </article>
  );
}
