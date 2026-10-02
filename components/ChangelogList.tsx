import { formatDate } from '@/lib/format';
import type { ChangelogWithProject } from '@/types';

export function ChangelogList({
  changelogs,
}: {
  changelogs: ChangelogWithProject[];
}) {
  if (changelogs.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-800 p-10 text-center font-mono text-sm text-slate-500">
        No releases published yet. Check back soon.
      </p>
    );
  }

  return (
    <ol className="relative flex flex-col gap-8 border-l border-slate-800 pl-6">
      {changelogs.map((changelog) => (
        <li key={changelog.id} className="card-enter relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.84rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-emerald-400"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
            <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
              v{changelog.version}
            </span>
            <span className="text-slate-400">{changelog.projectName}</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <time dateTime={changelog.publishedAt} className="text-slate-500">
              {formatDate(changelog.publishedAt)}
            </time>
          </div>

          <article className="mt-3 rounded-lg border border-slate-800/80 bg-panel p-5">
            <h3 className="text-base font-semibold text-slate-100">
              {changelog.title}
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-slate-400">
              {changelog.notes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="font-mono text-emerald-400"
                  >
                    +
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
