type ProjectName = 'ProductHub' | 'FormCraft' | 'DeployBot' | 'Logify';

type RequestStatus = 'planned' | 'in-progress' | 'completed' | 'under-review';

type FeatureRequest = {
  id: string;
  project: ProjectName;
  title: string;
  description: string;
  status: RequestStatus;
  category: string;
  postedAgo: string;
  upvotes: number;
};

const projects: ProjectName[] = [
  'ProductHub',
  'FormCraft',
  'DeployBot',
  'Logify',
];

const stats = [
  { label: 'projects live', value: '4' },
  { label: 'upvotes cast', value: '355' },
  { label: 'features shipped', value: '12' },
];

const statusStyles: Record<RequestStatus, string> = {
  planned: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  'in-progress': 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  'under-review': 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20',
};

const statusLabels: Record<RequestStatus, string> = {
  planned: 'Planned',
  'in-progress': 'In Progress',
  completed: 'Completed',
  'under-review': 'Under Review',
};

const featureRequests: FeatureRequest[] = [
  {
    id: '1',
    project: 'ProductHub',
    title: 'Embeddable JS Widget for External Sites',
    description:
      'Allow devs to embed the feedback board directly inside their web apps using an iFrame or a lightweight 3kB JS script tag.',
    status: 'in-progress',
    category: 'Integrations',
    postedAgo: '2 days ago',
    upvotes: 115,
  },
  {
    id: '2',
    project: 'FormCraft',
    title: 'Stripe Payment Element Support in Forms',
    description:
      'Enable payment fields directly inside form steps without leaving the custom checkout flow.',
    status: 'planned',
    category: 'Integrations',
    postedAgo: '3 days ago',
    upvotes: 98,
  },
  {
    id: '3',
    project: 'ProductHub',
    title: 'Discord & Slack Webhook Notifications',
    description:
      'Automatically send a webhook message to a Discord or Slack channel whenever a user submits a new request or status changes.',
    status: 'planned',
    category: 'API & Webhooks',
    postedAgo: '4 days ago',
    upvotes: 72,
  },
  {
    id: '4',
    project: 'DeployBot',
    title: 'Automatic Rollback on Build Failures',
    description:
      'Instantly restore the previous production container image if a newly deployed container fails health checks.',
    status: 'in-progress',
    category: 'Security',
    postedAgo: '1 week ago',
    upvotes: 64,
  },
  {
    id: '5',
    project: 'ProductHub',
    title: 'Custom CSS & Dark Mode Customizer',
    description:
      'Give admins the ability to customize brand colors and match their main product aesthetic inside the widget.',
    status: 'under-review',
    category: 'UI & Dashboard',
    postedAgo: '1 week ago',
    upvotes: 64,
  },
];

const statusFilters: { label: string; value: 'all' | RequestStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Planned', value: 'planned' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

export default function Home() {
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
            <a
              href="#submit"
              className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Submit Feature Request
            </a>
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
            <a
              id="submit"
              href="#"
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Submit Request
            </a>
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
  );
}
