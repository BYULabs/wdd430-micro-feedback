import FeatureRequestCard from '@/components/FeatureRequestCard';
import type { FeatureRequestWithProject } from '@/types';

const MOCK_REQUESTS: (FeatureRequestWithProject & { hasVoted?: boolean })[] = [
  {
    id: '1',
    projectId: 'micro-feedback',
    projectName: 'Micro-Feedback',
    title: 'Dark mode toggle in settings',
    description:
      'Let users switch between light and dark themes without relying on the OS preference.',
    category: 'UI & Dashboard',
    status: 'Planned',
    createdAt: '2026-08-12T00:00:00Z',
    votes: 24,
  },
  {
    id: '2',
    projectId: 'micro-feedback',
    projectName: 'Micro-Feedback',
    title: 'Slack notifications on new feedback',
    description:
      'Send a Slack message to the team channel whenever a new feature request is submitted.',
    category: 'Integrations',
    status: 'In Progress',
    createdAt: '2026-07-30T00:00:00Z',
    votes: 41,
    hasVoted: true,
  },
  {
    id: '3',
    projectId: 'micro-feedback',
    projectName: 'Micro-Feedback',
    title: 'Public changelog RSS feed',
    description:
      'Expose an RSS/Atom feed so users can subscribe to product updates in their reader of choice.',
    category: 'Other',
    status: 'Completed',
    createdAt: '2026-06-02T00:00:00Z',
    votes: 12,
  },
];

export default function RequestsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-12 sm:px-6">
      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
        Feature Requests
      </h1>
      {MOCK_REQUESTS.map((request) => (
        <FeatureRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
