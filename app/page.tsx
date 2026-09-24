import Link from 'next/link';
import { ChangelogList } from '@/components/ChangelogList';
import { FeatureRequestList } from '@/components/FeatureRequestList';
import { FeedTabs } from '@/components/FeedTabs';
import { Hero } from '@/components/Hero';
import {
  getChangelogs,
  getFeatureRequests,
  getPlatformStats,
} from '@/lib/data';

// Votes and releases change constantly; render from the database per request.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [requests, changelogs, stats] = await Promise.all([
    getFeatureRequests(),
    getChangelogs(),
    getPlatformStats(),
  ]);

  return (
    <main className="flex-1">
      <Hero
        stats={stats}
        topRequest={requests[0]}
        latestRelease={changelogs[0]}
      />

      <section
        id="feed"
        aria-label="Feedback and changelog feed"
        className="mx-auto w-full max-w-6xl px-6 py-12"
      >
        <FeedTabs
          tabs={[
            {
              id: 'roadmap',
              label: 'Feedback & Roadmap',
              count: requests.length,
              content: <FeatureRequestList requests={requests} />,
            },
            {
              id: 'changelog',
              label: "What's New",
              count: changelogs.length,
              content: <ChangelogList changelogs={changelogs} />,
            },
          ]}
          action={
            <Link
              id="submit"
              href="#submit"
              className="rounded-md bg-emerald-400 px-3 py-2 font-mono text-sm font-medium text-ink transition-colors hover:bg-emerald-300"
            >
              + Submit request
            </Link>
          }
        />
      </section>
    </main>
  );
}
