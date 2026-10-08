import Link from 'next/link';
import { getProjects } from '@/lib/projects';
import { PROJECT_CATEGORIES } from '@/types';

export const dynamic = 'force-dynamic';

type SearchParams = Promise<{ q?: string; category?: string }>;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = '', category = '' } = await searchParams;
  const search = q.trim();
  const activeCategory = (PROJECT_CATEGORIES as readonly string[]).includes(
    category
  )
    ? category
    : '';
  const projects = await getProjects(search, activeCategory);

  const filterHref = (cat: string) => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (cat) params.set('category', cat);
    const qs = params.toString();
    return qs ? `/projects?${qs}` : '/projects';
  };

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 font-mono text-xs ${
      active
        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
        : 'border-slate-800/80 text-slate-400 hover:text-slate-200'
    }`;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="font-mono text-2xl font-bold text-slate-100">
        Projects Directory
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Explore indie projects and vote on what they build next.
      </p>

      <form action="/projects" className="mt-6 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="Search projects..."
          aria-label="Search projects"
          className="w-full rounded-md border border-slate-800/80 bg-[#0d131d] px-3 py-2 font-mono text-sm text-slate-100 placeholder:text-slate-400 focus:border-emerald-500/30 focus:outline-none"
        />
        {activeCategory && (
          <input type="hidden" name="category" value={activeCategory} />
        )}
        <button
          type="submit"
          className="rounded-md bg-emerald-400 px-4 py-2 font-mono text-sm font-semibold text-slate-900 hover:bg-emerald-300"
        >
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={filterHref('')} className={chip(!activeCategory)}>
          All
        </Link>
        {PROJECT_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={filterHref(cat)}
            className={chip(activeCategory === cat)}
          >
            {cat}
          </Link>
        ))}
      </div>

      {projects.length === 0 ? (
        <p className="mt-10 font-mono text-sm text-slate-400">
          No projects match your search.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li
              key={p.id}
              className="relative flex flex-col rounded-lg border border-slate-800/80 bg-[#0d131d] p-5 transition-colors hover:border-emerald-500/30"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400">
                  {p.icon}
                </span>
                <div>
                  <h2 className="font-mono text-base font-semibold text-slate-100">
                    {p.name}
                  </h2>
                  <p className="font-mono text-xs text-slate-400">
                    @{p.author}
                  </p>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm text-slate-400">
                {p.description}
              </p>
              <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>{p.category}</span>
                <span>
                  {p.requestCount} requests · {p.totalVotes} votes
                </span>
              </div>
              <Link
                href={`/projects/${encodeURIComponent(p.id)}`}
                className="mt-4 rounded-md border border-emerald-500/30 px-3 py-2 text-center font-mono text-xs text-emerald-400 after:absolute after:inset-0 after:content-[''] hover:bg-emerald-500/10"
              >
                View Board
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
