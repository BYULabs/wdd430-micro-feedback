'use client';

import { useState } from 'react';

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

    const handleClick = () => {
        const nextHasVoted = !hasVoted;
        setHasVoted(nextHasVoted);
        setVoteCount((count) => count + (nextHasVoted ? 1 : -1));
        onToggle?.(requestId, nextHasVoted);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-pressed={hasVoted}
            aria-label={hasVoted ? 'Remove upvote' : 'Upvote this feature request'}
            className={`flex w-14 flex-col items-center justify-center gap-0.5 rounded-lg border px-2 py-1.5 transition-colors ${hasVoted
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-zinc-300 bg-white text-zinc-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
                }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${hasVoted ? '-translate-y-0.5' : ''}`}
            >
                <path
                    fillRule="evenodd"
                    d="M10 3.5a.75.75 0 01.53.22l5.25 5.25a.75.75 0 11-1.06 1.06L10.75 6.06V16a.75.75 0 01-1.5 0V6.06L5.28 10.03a.75.75 0 01-1.06-1.06l5.25-5.25A.75.75 0 0110 3.5z"
                    clipRule="evenodd"
                />
            </svg>
            <span className="text-sm font-semibold tabular-nums">{voteCount}</span>
        </button>
    );
}
