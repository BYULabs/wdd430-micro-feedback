import { FeatureRequestList } from '@/components/FeatureRequestList';
import { getFeatureRequests } from '@/lib/data';

// Votes change constantly; render from the database per request.
export const dynamic = 'force-dynamic';

export default async function RequestsPage() {
  const requests = await getFeatureRequests();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-12 sm:px-6">
      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
        Feature Requests
      </h1>
      <FeatureRequestList requests={requests} />
    </div>
  );
}
