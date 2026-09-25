import FeatureRequestCard from '@/app/components/FeatureRequestCard';
import type { FeatureRequest } from '@/app/lib/types';

const MOCK_REQUESTS: FeatureRequest[] = [
    {
        id: '1',
        projectName: 'Micro-Feedback',
        title: 'Dark mode toggle in settings',
        description: 'Let users switch between light and dark themes without relying on the OS preference.',
        category: 'UI/UX',
        status: 'planned',
        createdAt: '2026-08-12',
        voteCount: 24,
    },
    {
        id: '2',
        projectName: 'Micro-Feedback',
        title: 'Slack notifications on new feedback',
        description: 'Send a Slack message to the team channel whenever a new feature request is submitted.',
        category: 'Integrations',
        status: 'in-progress',
        createdAt: '2026-07-30',
        voteCount: 41,
        hasVoted: true,
    },
    {
        id: '3',
        projectName: 'Micro-Feedback',
        title: 'Public changelog RSS feed',
        description: 'Expose an RSS/Atom feed so users can subscribe to product updates in their reader of choice.',
        category: 'Changelog',
        status: 'completed',
        createdAt: '2026-06-02',
        voteCount: 12,
    },
];

export default function RequestsPage() {
    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-6 py-16">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Feature Requests</h1>
            {MOCK_REQUESTS.map((request) => (
                <FeatureRequestCard key={request.id} request={request} />
            ))}
        </div>
    );
}
