'use client';

import { FileText, ListChecks, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatDate } from '@/lib/format';
import {
  REQUEST_STATUSES,
  type ChangelogInput,
  type ChangelogWithProject,
  type FeatureRequestWithProject,
  type Project,
} from '@/types';

type AdminTab = 'requests' | 'changelogs';

interface ChangelogForm {
  projectId: string;
  version: string;
  title: string;
  notes: string;
}

const emptyChangelogForm = (projectId: string): ChangelogForm => ({
  projectId,
  version: '',
  title: '',
  notes: '',
});

export function AdminDashboard({
  projects,
  requests,
  changelogs,
}: {
  projects: Project[];
  requests: FeatureRequestWithProject[];
  changelogs: ChangelogWithProject[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('requests');
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? '');
  const [requestSearch, setRequestSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingChangelogId, setEditingChangelogId] = useState<string | null>(
    null
  );
  const [changelogForm, setChangelogForm] = useState<ChangelogForm>(
    emptyChangelogForm(projects[0]?.id ?? '')
  );
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const projectRequests = requests.filter(
    (request) => request.projectId === activeProjectId
  );
  const normalizedSearch = requestSearch.trim().toLowerCase();
  const visibleRequests = projectRequests.filter(
    (request) =>
      !normalizedSearch ||
      request.title.toLowerCase().includes(normalizedSearch) ||
      request.description.toLowerCase().includes(normalizedSearch)
  );
  const projectChangelogs = changelogs.filter(
    (changelog) => changelog.projectId === activeProjectId
  );

  async function mutate(
    url: string,
    method: string,
    failureMessage: string,
    payload?: unknown
  ): Promise<boolean> {
    setIsPending(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(url, {
        method,
        ...(payload === undefined
          ? {}
          : {
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            }),
      });

      if (!response.ok) throw new Error(failureMessage);

      setMessage('Changes saved.');
      router.refresh();
      return true;
    } catch (mutationError) {
      setError(
        mutationError instanceof Error ? mutationError.message : failureMessage
      );
      return false;
    } finally {
      setIsPending(false);
    }
  }

  async function saveChangelog(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: ChangelogInput = {
      projectId: changelogForm.projectId,
      version: changelogForm.version.trim(),
      title: changelogForm.title.trim(),
      notes: changelogForm.notes
        .split(/\r?\n/)
        .map((note) => note.trim())
        .filter(Boolean),
    };

    if (payload.notes.length === 0) {
      setError('Add at least one release note.');
      return;
    }

    const isEditing = editingChangelogId !== null;
    const saved = await mutate(
      isEditing ? `/api/changelogs/${editingChangelogId}` : '/api/changelogs',
      isEditing ? 'PUT' : 'POST',
      'Could not save the changelog.',
      payload
    );

    if (saved) {
      setFormOpen(false);
      setEditingChangelogId(null);
      setChangelogForm(emptyChangelogForm(activeProjectId));
    }
  }

  function editChangelog(changelog: ChangelogWithProject) {
    setActiveTab('changelogs');
    setActiveProjectId(changelog.projectId);
    setEditingChangelogId(changelog.id);
    setChangelogForm({
      projectId: changelog.projectId,
      version: changelog.version,
      title: changelog.title,
      notes: changelog.notes.join('\n'),
    });
    setFormOpen(true);
  }

  function startNewChangelog() {
    setEditingChangelogId(null);
    setChangelogForm(emptyChangelogForm(activeProjectId));
    setFormOpen(true);
  }

  async function deleteRecord(url: string, label: string) {
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    await mutate(url, 'DELETE', `Could not delete ${label}.`);
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl">
            Admin Console
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage the roadmap and published releases.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label
            htmlFor="admin-project"
            className="font-mono text-xs text-slate-400"
          >
            Project
          </label>
          <select
            id="admin-project"
            value={activeProjectId}
            onChange={(event) => setActiveProjectId(event.target.value)}
            disabled={projects.length === 0 || isPending}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="my-6 flex gap-2 border-b border-slate-800/80">
        <button
          type="button"
          aria-pressed={activeTab === 'requests'}
          onClick={() => setActiveTab('requests')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-sm ${
            activeTab === 'requests'
              ? 'border-emerald-400 text-emerald-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ListChecks className="h-4 w-4" aria-hidden />
          Requests ({projectRequests.length})
        </button>
        <button
          type="button"
          aria-pressed={activeTab === 'changelogs'}
          onClick={() => setActiveTab('changelogs')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-sm ${
            activeTab === 'changelogs'
              ? 'border-emerald-400 text-emerald-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="h-4 w-4" aria-hidden />
          Changelogs ({projectChangelogs.length})
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-4 text-sm text-rose-400">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="mb-4 text-sm text-emerald-300">
          {message}
        </p>
      )}

      {activeTab === 'requests' ? (
        <section aria-label="Feature request management">
          <label htmlFor="request-search" className="sr-only">
            Filter requests
          </label>
          <input
            id="request-search"
            type="search"
            value={requestSearch}
            onChange={(event) => setRequestSearch(event.target.value)}
            placeholder="Filter requests by title or description"
            className="mb-4 w-full max-w-md rounded-md border border-slate-800 bg-panel px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
          />

          {visibleRequests.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-800 p-8 text-center text-sm text-slate-400">
              No feature requests for this project.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-800/80">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-panel font-mono text-xs text-slate-400">
                  <tr>
                    <th scope="col" className="p-3">
                      Votes
                    </th>
                    <th scope="col" className="p-3">
                      Request
                    </th>
                    <th scope="col" className="p-3">
                      Category
                    </th>
                    <th scope="col" className="p-3">
                      Status
                    </th>
                    <th scope="col" className="p-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {visibleRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="p-3 font-mono text-emerald-300">
                        {request.votes}
                      </td>
                      <td className="max-w-lg p-3">
                        <p className="font-semibold text-slate-100">
                          {request.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                          {request.description}
                        </p>
                      </td>
                      <td className="p-3 text-slate-300">{request.category}</td>
                      <td className="p-3">
                        <label
                          className="sr-only"
                          htmlFor={`status-${request.id}`}
                        >
                          Status for {request.title}
                        </label>
                        <select
                          id={`status-${request.id}`}
                          value={request.status}
                          disabled={isPending}
                          onChange={(event) =>
                            void mutate(
                              `/api/requests/${request.id}/status`,
                              'PATCH',
                              'Could not update request status.',
                              { status: event.target.value }
                            )
                          }
                          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-slate-100 focus:border-emerald-400 focus:outline-none"
                        >
                          {REQUEST_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          aria-label={`Delete ${request.title}`}
                          title="Delete request"
                          disabled={isPending}
                          onClick={() =>
                            void deleteRecord(
                              `/api/requests/${request.id}`,
                              'this request'
                            )
                          }
                          className="rounded-md p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : (
        <section aria-label="Changelog management">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-100">
              Published releases
            </h2>
            <button
              type="button"
              onClick={startNewChangelog}
              disabled={projects.length === 0 || isPending}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-400 px-3 py-2 font-mono text-sm font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" aria-hidden />
              New changelog
            </button>
          </div>

          {formOpen && (
            <form
              onSubmit={saveChangelog}
              className="mb-6 space-y-4 rounded-lg border border-slate-800/80 bg-panel p-4 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-slate-100">
                  {editingChangelogId ? 'Edit changelog' : 'Publish changelog'}
                </h3>
                <button
                  type="button"
                  aria-label="Close changelog form"
                  onClick={() => setFormOpen(false)}
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-slate-300">
                  <span>Project</span>
                  <select
                    required
                    value={changelogForm.projectId}
                    onChange={(event) =>
                      setChangelogForm((current) => ({
                        ...current,
                        projectId: event.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-emerald-400 focus:outline-none"
                  >
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1.5 text-sm text-slate-300">
                  <span>Version</span>
                  <input
                    required
                    value={changelogForm.version}
                    onChange={(event) =>
                      setChangelogForm((current) => ({
                        ...current,
                        version: event.target.value,
                      }))
                    }
                    placeholder="1.3.0"
                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                  />
                </label>
              </div>
              <label className="block space-y-1.5 text-sm text-slate-300">
                <span>Title</span>
                <input
                  required
                  value={changelogForm.title}
                  onChange={(event) =>
                    setChangelogForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label className="block space-y-1.5 text-sm text-slate-300">
                <span>Release notes (one per line)</span>
                <textarea
                  required
                  rows={4}
                  value={changelogForm.notes}
                  onChange={(event) =>
                    setChangelogForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  className="w-full resize-y rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-md bg-emerald-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-50"
                >
                  {isPending ? 'Saving…' : 'Save changelog'}
                </button>
              </div>
            </form>
          )}

          {projectChangelogs.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-800 p-8 text-center text-sm text-slate-400">
              No changelogs published for this project.
            </p>
          ) : (
            <ul className="space-y-3">
              {projectChangelogs.map((changelog) => (
                <li
                  key={changelog.id}
                  className="rounded-lg border border-slate-800/80 bg-panel p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-emerald-300">
                        v{changelog.version} ·{' '}
                        {formatDate(changelog.publishedAt)}
                      </p>
                      <h3 className="mt-1 font-semibold text-slate-100">
                        {changelog.title}
                      </h3>
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${changelog.title}`}
                        title="Edit changelog"
                        disabled={isPending}
                        onClick={() => editChangelog(changelog)}
                        className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 disabled:opacity-50"
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${changelog.title}`}
                        title="Delete changelog"
                        disabled={isPending}
                        onClick={() =>
                          void deleteRecord(
                            `/api/changelogs/${changelog.id}`,
                            'this changelog'
                          )
                        }
                        className="rounded-md p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
                    {changelog.notes.map((note, index) => (
                      <li key={`${changelog.id}-${index}`}>{note}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
