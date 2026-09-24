export const REQUEST_STATUSES = [
  'Under Review',
  'Planned',
  'In Progress',
  'Completed',
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const REQUEST_CATEGORIES = [
  'Integrations',
  'UI & Dashboard',
  'API & Webhooks',
  'Security',
  'Other',
] as const;

export type RequestCategory = (typeof REQUEST_CATEGORIES)[number];

export const PROJECT_CATEGORIES = [
  'SaaS',
  'Developer Tools',
  'AI & Automation',
  'Productivity',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  id: string;
  name: string;
  /** Two-letter monogram rendered in the project avatar tile. */
  icon: string;
  author: string;
  category: ProjectCategory;
  website: string;
  description: string;
}

export interface FeatureRequest {
  id: string;
  projectId: string;
  title: string;
  description: string;
  votes: number;
  status: RequestStatus;
  category: RequestCategory;
  /** ISO 8601 timestamp; formatted for display with `formatRelativeTime`. */
  createdAt: string;
}

export interface Changelog {
  id: string;
  projectId: string;
  version: string;
  title: string;
  notes: string[];
  /** ISO 8601 timestamp; formatted for display with `formatDate`. */
  publishedAt: string;
}

/** Feature request joined with its project's name for feed display. */
export interface FeatureRequestWithProject extends FeatureRequest {
  projectName: string;
}

/** Changelog joined with its project's name for feed display. */
export interface ChangelogWithProject extends Changelog {
  projectName: string;
}

/** Aggregate counts shown in the landing page hero. */
export interface PlatformStats {
  projects: number;
  openRequests: number;
  votes: number;
  releases: number;
}

/** Payload for `POST /api/requests`. */
export interface CreateRequestInput {
  projectId: string;
  title: string;
  description: string;
  category: RequestCategory;
}

/** Payload for `POST /api/changelogs` and `PUT /api/changelogs/:id`. */
export interface ChangelogInput {
  projectId: string;
  version: string;
  title: string;
  notes: string[];
}

/** Field-keyed validation errors returned by Server Actions to the form UI. */
export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export interface FormState<T> {
  ok: boolean;
  errors?: FieldErrors<T>;
  message?: string;
}
