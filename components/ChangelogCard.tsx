import type { Changelog, Project } from '@/types';

type ChangelogCardProps = {
  changelog: Changelog;
  project: Pick<Project, 'icon' | 'name'>;
};

const publishedDateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function ChangelogCard({ changelog, project }: ChangelogCardProps) {
  const publishedDate = new Date(changelog.publishedAt);
  const version = changelog.version.startsWith('v')
    ? changelog.version
    : `v${changelog.version}`;

  return (
    <article className="rounded-xl border border-slate-800/80 bg-panel p-5 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-300">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-md border border-emerald-400/20 bg-emerald-400/10 text-xs font-semibold text-emerald-300"
          >
            {project.icon}
          </span>
          {project.name}
        </span>
        <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
          {version}
        </span>
      </header>

      <h3 className="mt-4 text-lg font-semibold text-slate-100">
        {changelog.title}
      </h3>
      <time
        className="mt-1 block text-sm text-slate-400"
        dateTime={changelog.publishedAt}
      >
        {publishedDateFormatter.format(publishedDate)}
      </time>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300 marker:text-emerald-400">
        {changelog.notes.map((note, index) => (
          <li key={`${changelog.id}-${index}`}>{note}</li>
        ))}
      </ul>
    </article>
  );
}
