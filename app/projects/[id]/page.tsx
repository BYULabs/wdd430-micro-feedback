import Link from 'next/link';
import { notFound } from 'next/navigation';
import SubmitRequestButton from '@/components/SubmitRequestButton';
import {
  getProject,
  getProjectChangelogs,
  getProjectRequests,
} from '@/lib/projects';
import type { RequestStatus } from '@/types';

export const dynamic = 'force-dynamic';

const statusStyles: Record<RequestStatus, string> = {
  'Under Review': 'bg-slate-800 text-slate-400 border-slate-700',
  Planned: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export default async function ProjectBoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const [requests, changelogs] = await Promise.all([
    getProjectRequests(id),
    getProjectChangelogs(id),
  ]);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <Link
        href="/projects"
        className="font-mono text-xs text-slate-400 hover:text-slate-300"
      >
        &larr; All projects
      </Link>

      <header className="mt-4 flex flex-wrap items-start gap-4 rounded-lg border border-slate-800/80 bg-[#0d131d] p-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 font-mono text-lg font-bold text-emerald-400">
          {project.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-mono text-2xl font-bold text-slate-100">
            {project.name}
          </h1>
          <p className="mt-1 text-sm text-slate-400">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-slate-400">
            <span>by @{project.author}</span>
            <span>{project.category}</span>
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              {project.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </div>
        <dl className="flex gap-6 font-mono">
          <div>
            <dt className="text-xs text-slate-400">requests</dt>
            <dd className="text-xl font-bold text-emerald-400">
              {project.requestCount}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-400">votes</dt>
            <dd className="text-xl font-bold text-emerald-400">
              {project.totalVotes}
            </dd>
          </div>
        </dl>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-mono text-lg font-semibold text-slate-100">
              Feature Requests
            </h2>
            <SubmitRequestButton
              initialProjectId={project.id}
              className="inline-flex h-10 items-center justify-center rounded-md border border-emerald-500/40 px-4 font-mono text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/10"
            >
              + Submit feature request
            </SubmitRequestButton>
          </div>
          {requests.length === 0 ? (
            <p className="mt-4 font-mono text-sm text-slate-400">
              No requests yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {requests.map((r) => (
                <li
                  key={r.id}
                  className="flex gap-4 rounded-lg border border-slate-800/80 bg-[#0d131d] p-4"
                >
                  <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-md border border-slate-800/80 py-2 font-mono">
                    <span className="text-sm font-bold text-emerald-400">
                      {r.votes}
                    </span>
                    <span className="text-[10px] text-slate-400">votes</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-100">
                        {r.title}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${statusStyles[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {r.description}
                    </p>
                    <p className="mt-2 font-mono text-xs text-slate-400">
                      {r.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-mono text-lg font-semibold text-slate-100">
            Changelog
          </h2>
          {changelogs.length === 0 ? (
            <p className="mt-4 font-mono text-sm text-slate-400">
              No releases yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {changelogs.map((c) => (
                <li
                  key={c.id}
                  className="rounded-lg border border-slate-800/80 bg-[#0d131d] p-4"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                      v{c.version}
                    </span>
                    <span className="text-slate-400">
                      {dateFormat.format(new Date(c.publishedAt))}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-100">
                    {c.title}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-400">
                    {c.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
