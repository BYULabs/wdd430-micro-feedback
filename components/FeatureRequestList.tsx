import FeatureRequestCard from '@/components/FeatureRequestCard';
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
        <li key={request.id}>
          <FeatureRequestCard request={request} />
        </li>
      ))}
    </ul>
  );
}
