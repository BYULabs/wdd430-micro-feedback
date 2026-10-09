'use client';

import { ChevronUp } from 'lucide-react';
import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';

interface UpvoteButtonProps {
  requestId: string;
  initialVoteCount: number;
  initialHasVoted?: boolean;
  onToggle?: (requestId: string, hasVoted: boolean) => void;
}

export default function UpvoteButton({
  requestId,
  initialVoteCount,
  initialHasVoted = false,
  onToggle,
}: UpvoteButtonProps) {
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (isPending) return;

    const nextHasVoted = !hasVoted;
    const delta = nextHasVoted ? 1 : -1;
    const previousVoteCount = voteCount;

    setHasVoted(nextHasVoted);
    setVoteCount((count) => count + delta);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/requests/${requestId}/upvote`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ delta }),
        });

        if (!response.ok) throw new Error('Failed to update vote.');

        const updatedRequest: { votes: number } = await response.json();
        setVoteCount(updatedRequest.votes);
        onToggle?.(requestId, nextHasVoted);
      } catch (error) {
        setVoteCount(previousVoteCount);
        setHasVoted(!nextHasVoted);
        console.error('Error updating feature request vote:', error);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={hasVoted}
      aria-busy={isPending}
      aria-label={hasVoted ? 'Remove upvote' : 'Upvote this feature request'}
      className={cn(
        'flex min-w-[54px] flex-col items-center justify-center rounded-lg border px-3 py-2.5 font-mono transition-colors',
        hasVoted
          ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
          : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400'
      )}
    >
      <ChevronUp className="h-5 w-5" aria-hidden />
      <span className="mt-0.5 text-sm font-bold">{voteCount}</span>
    </button>
  );
}
