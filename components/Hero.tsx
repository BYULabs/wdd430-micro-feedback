import Link from 'next/link';
import type {
  ChangelogWithProject,
  FeatureRequestWithProject,
  PlatformStats,
} from '@/types';

interface HeroProps {
  stats: PlatformStats;
  topRequest?: FeatureRequestWithProject;
  latestRelease?: ChangelogWithProject;
}

export function Hero({ stats, topRequest, latestRelease }: HeroProps) {
  const statItems = [
    { label: 'projects live', value: stats.projects },
    { label: 'open requests', value: stats.openRequests },
    { label: 'upvotes cast', value: stats.votes },
    { label: 'releases shipped', value: stats.releases },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80">
      <div aria-hidden="true" className="grid-bg absolute inset-0" />
      <div
        aria-hidden="true"
        className="glow absolute -top-40 left-1/4 h-[36rem] w-[36rem]"
      />
      <div
        aria-hidden="true"
        className="glow-cyan absolute -right-40 top-10 h-[30rem] w-[30rem]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Now in public beta — built by devs, for devs
          </span>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl">
            Ship code. Share what you built.{' '}
            <span className="text-emerald-400">Let the crowd decide.</span>
          </h1>

          <p className="max-w-xl text-lg leading-8 text-slate-400">
            ProductHub is where indie developers showcase their apps, gather
            feature requests, and publish release updates directly to their
            users.
          </p>

          <div className="flex flex-col gap-3 font-mono text-sm sm:flex-row">
            <Link
              href="#submit"
              className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-400 px-5 font-medium text-ink transition-colors hover:bg-emerald-300"
            >
              + Submit feature request
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-700 px-5 text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-50"
            >
              Explore projects <span aria-hidden="true">&nbsp;-&gt;</span>
            </Link>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-6 border-t border-slate-800/80 pt-6 sm:grid-cols-4">
            {statItems.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 font-mono text-xs text-slate-500">
                  {stat.label}
                </dt>
                <dd className="order-1 font-mono text-2xl font-semibold text-slate-50">
                  {stat.value.toLocaleString('en-US')}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <TerminalMockup topRequest={topRequest} latestRelease={latestRelease} />
      </div>
    </section>
  );
}

function TerminalMockup({
  topRequest,
  latestRelease,
}: Omit<HeroProps, 'stats'>) {
  // Decorative: the same data is presented accessibly in the feed below.
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-slate-800 bg-panel shadow-2xl shadow-emerald-950/40"
    >
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-slate-500">
          ~/producthub — zsh
        </span>
      </div>

      <div className="flex flex-col gap-1.5 overflow-x-auto p-5 font-mono text-[13px] leading-6">
        <p>
          <span className="text-emerald-400">$</span>{' '}
          <span className="text-slate-200">producthub requests --top</span>
        </p>
        {topRequest ? (
          <p className="text-slate-400">
            <span className="text-emerald-400">▲ {topRequest.votes}</span>{' '}
            {topRequest.title}{' '}
            <span className="text-amber-400">[{topRequest.status}]</span>
          </p>
        ) : (
          <p className="text-slate-500">no requests yet</p>
        )}

        <p className="mt-3">
          <span className="text-emerald-400">$</span>{' '}
          <span className="text-slate-200">
            producthub release {latestRelease?.version ?? '1.0.0'}
          </span>
        </p>
        <p className="text-slate-400">
          <span className="text-emerald-400">✔</span>{' '}
          {latestRelease
            ? `${latestRelease.projectName}: ${latestRelease.title}`
            : 'changelog published'}
        </p>
        <p className="text-slate-500">
          → notified subscribers · updated roadmap
        </p>

        <p className="mt-3">
          <span className="text-emerald-400">$</span>{' '}
          <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-emerald-400" />
        </p>
      </div>
    </div>
  );
}
