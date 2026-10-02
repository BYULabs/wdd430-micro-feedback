import type { FeatureRequest, FeatureRequestStatus } from '@/app/lib/types';
import UpvoteButton from '@/app/components/UpvoteButton';

const STATUS_STYLES: Record<FeatureRequestStatus, { label: string; className: string }> = {
    planned: {
        label: 'Planned',
        className: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950 dark:text-blue-300',
    },
    'in-progress': {
        label: 'In Progress',
        className:
            'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300',
    },
    completed: {
        label: 'Completed',
        className:
            'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-300',
    },
};

interface FeatureRequestCardProps {
    request: FeatureRequest;
    onToggleVote?: (requestId: string, hasVoted: boolean) => void;
}

export default function FeatureRequestCard({ request, onToggleVote }: FeatureRequestCardProps) {
    const status = STATUS_STYLES[request.status];
    const createdAt = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(request.createdAt));

    return (
        <article className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <UpvoteButton
                requestId={request.id}
                initialVoteCount={request.voteCount}
                initialHasVoted={request.hasVoted}
                onToggle={onToggleVote}
            />

            <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {request.projectName}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>
                        {status.label}
                    </span>
                </div>

                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{request.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{request.description}</p>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                    <span className="rounded-full border border-zinc-300 px-2 py-0.5 font-medium dark:border-zinc-700">
                        {request.category}
                    </span>
                    <time dateTime={request.createdAt}>{createdAt}</time>
                </div>
            </div>
        </article>
    );
}
