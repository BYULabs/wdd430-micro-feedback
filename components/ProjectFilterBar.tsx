'use client';

export type ProjectFilter = 'all' | 'ProductHub' | 'FormCraft' | 'DeployBot' | 'Logify';
export type StatusFilter = 'all' | 'planned' | 'in-progress' | 'completed';

type ProjectFilterBarProps = {
    selectedProject: ProjectFilter;
    selectedStatus: StatusFilter;
    searchTerm: string;
    projects: Exclude<ProjectFilter, 'all'>[];
    onProjectChange: (project: ProjectFilter) => void;
    onStatusChange: (status: StatusFilter) => void;
    onSearchChange: (searchTerm: string) => void;
};

const statusFilters: { label: string; value: StatusFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Planned', value: 'planned' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
];

const pillClasses = (isActive: boolean) =>
    isActive
        ? 'bg-foreground text-background'
        : 'border border-black/[.08] text-zinc-700 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-[#1a1a1a]';

export function ProjectFilterBar({
    selectedProject,
    selectedStatus,
    searchTerm,
    projects,
    onProjectChange,
    onStatusChange,
    onSearchChange,
}: ProjectFilterBarProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Filter by Project
                </h2>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        aria-pressed={selectedProject === 'all'}
                        className={`rounded-full px-4 py-2 text-sm font-medium ${pillClasses(selectedProject === 'all')}`}
                        onClick={() => onProjectChange('all')}
                    >
                        ⚡ All Projects
                    </button>
                    {projects.map((project) => (
                        <button
                            key={project}
                            type="button"
                            aria-pressed={selectedProject === project}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${pillClasses(selectedProject === project)}`}
                            onClick={() => onProjectChange(project)}
                        >
                            {project}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.value}
                            type="button"
                            aria-pressed={selectedStatus === filter.value}
                            className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize ${pillClasses(selectedStatus === filter.value)}`}
                            onClick={() => onStatusChange(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
                <label className="flex min-w-0 items-center gap-2 rounded-md border border-black/[.08] px-3 py-2 text-sm text-zinc-500 dark:border-white/[.145]">
                    <span aria-hidden="true">$</span>
                    <span className="sr-only">Search requests</span>
                    <input
                        type="search"
                        value={searchTerm}
                        placeholder="grep requests..."
                        className="min-w-0 flex-1 bg-transparent text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100"
                        onChange={(event) => onSearchChange(event.target.value)}
                    />
                </label>
            </div>
        </div>
    );
}