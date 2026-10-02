import SubmitRequestButton from '@/components/SubmitRequestButton';

type ProjectName = 'ProductHub' | 'FormCraft' | 'DeployBot' | 'Logify';
import { ButtonLink } from '@/components/Button';
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
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <section className="flex flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-black/[.06] px-4 py-1.5 text-sm font-medium text-zinc-700 dark:bg-white/[.08] dark:text-zinc-300">
            Now in public beta — built by devs, for devs
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Ship code. Share what you built. Let the crowd decide.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            ProductHub is where indie developers showcase their apps, gather
            feature requests, and publish release updates directly to their
            users.
          </p>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <SubmitRequestButton
              className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              Submit Feature Request
            </SubmitRequestButton>
            <a
              href="#projects"
              className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              Explore Projects
            </a>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <dt className="order-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </dt>
                <dd className="order-1 text-2xl font-semibold text-black dark:text-zinc-50">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="projects" className="mt-16">
          <h2 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Filter by Project
          </h2>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
              ⚡ All Projects
            </button>
            {projects.map((project) => (
              <button
                key={project}
                className="rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-[#1a1a1a]"
              >
                {project}
              </button>
            ))}
          </div>
        </section>

        <section id="roadmap" className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[.08] pb-4 dark:border-white/[.08]">
            <div className="flex gap-6 text-sm font-medium">
              <button className="border-b-2 border-foreground pb-4 -mb-4 text-black dark:text-zinc-50">
                Feedback & Roadmap
              </button>
              <button className="pb-4 -mb-4 text-zinc-600 dark:text-zinc-400">
                What&apos;s New (Changelog)
              </button>
            </div>
            <SubmitRequestButton
              className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              Submit Request
            </SubmitRequestButton>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                className="rounded-full border border-black/[.08] px-3 py-1.5 text-sm font-medium capitalize text-zinc-700 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-[#1a1a1a]"
              >
                {filter.label}
              </button>
            ))}
            <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-500">
              {featureRequests.length + 137} requests
            </span>
          </div>

          <ul className="mt-6 flex flex-col gap-4">
            {featureRequests.map((request) => (
              <li
                key={request.id}
                className="flex items-start gap-4 rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-white/[.03]"
              >
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-black/[.08] px-3 py-2 text-center dark:border-white/[.08]">
                  <span className="text-lg font-semibold text-black dark:text-zinc-50">
                    {request.upvotes}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">
                    upvotes
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                      {request.project}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[request.status]}`}
                    >
                      {statusLabels[request.status]}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                    {request.title}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {request.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
                    <span>{request.category}</span>
                    <span>·</span>
                    <span>{request.postedAgo}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
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
            <ButtonLink href="#submit" variant="primary" size="sm">
              + Submit request
            </ButtonLink>
          }
        />
      </section>
    </main>
  );
}