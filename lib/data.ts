import { sql } from '@/lib/db';
import type {
  ChangelogWithProject,
  ChangelogInput,
  FeatureRequestWithProject,
  PlatformStats,
  RequestCategory,
  RequestStatus,
  UserWithPassword,
} from '@/types';

interface FeatureRequestRow {
  id: string;
  project_id: string;
  project_name: string;
  title: string;
  description: string;
  votes: number;
  status: RequestStatus;
  category: RequestCategory;
  created_at: Date | string;
}

interface ChangelogRow {
  id: string;
  project_id: string;
  project_name: string;
  version: string;
  title: string;
  notes: string[];
  published_at: Date | string;
}

interface UserRow {
  id: string;
  email: string;
  name: string;
  password_hash: string;
}

const toIsoString = (value: Date | string) => new Date(value).toISOString();

/** Feature requests across all projects, most-voted first. */
export async function getFeatureRequests(): Promise<
  FeatureRequestWithProject[]
> {
  const rows = (await sql`
    SELECT r.id, r.project_id, p.name AS project_name, r.title,
           r.description, r.votes, r.status, r.category, r.created_at
    FROM feature_requests r
    JOIN projects p ON p.id = r.project_id
    ORDER BY r.votes DESC, r.created_at DESC
  `) as FeatureRequestRow[];

  return rows.map((row) => ({
    id: row.id,
    projectId: row.project_id,
    projectName: row.project_name,
    title: row.title,
    description: row.description,
    votes: row.votes,
    status: row.status,
    category: row.category,
    createdAt: toIsoString(row.created_at),
  }));
}

/** Published changelogs across all projects, newest first. */
export async function getChangelogs(): Promise<ChangelogWithProject[]> {
  const rows = (await sql`
    SELECT c.id, c.project_id, p.name AS project_name, c.version, c.title,
           c.notes, c.published_at
    FROM changelogs c
    JOIN projects p ON p.id = c.project_id
    ORDER BY c.published_at DESC
  `) as ChangelogRow[];

  return rows.map((row) => ({
    id: row.id,
    projectId: row.project_id,
    projectName: row.project_name,
    version: row.version,
    title: row.title,
    notes: row.notes,
    publishedAt: toIsoString(row.published_at),
  }));
}

export async function setFeatureRequestStatus(
  id: string,
  status: RequestStatus
): Promise<boolean> {
  const updated = await sql`
    UPDATE feature_requests
    SET status = ${status}
    WHERE id = ${id}
    RETURNING id
  `;

  return updated.length > 0;
}

export async function deleteFeatureRequest(id: string): Promise<boolean> {
  const deleted = await sql`
    DELETE FROM feature_requests
    WHERE id = ${id}
    RETURNING id
  `;

  return deleted.length > 0;
}

export async function createChangelog(input: ChangelogInput): Promise<string> {
  const id = `cl-${crypto.randomUUID()}`;

  await sql`
    INSERT INTO changelogs (id, project_id, version, title, notes)
    VALUES (
      ${id},
      ${input.projectId},
      ${input.version},
      ${input.title},
      ${input.notes}
    )
  `;

  return id;
}

export async function updateChangelog(
  id: string,
  input: ChangelogInput
): Promise<boolean> {
  const updated = await sql`
    UPDATE changelogs
    SET
      project_id = ${input.projectId},
      version = ${input.version},
      title = ${input.title},
      notes = ${input.notes}
    WHERE id = ${id}
    RETURNING id
  `;

  return updated.length > 0;
}

export async function deleteChangelog(id: string): Promise<boolean> {
  const deleted = await sql`
    DELETE FROM changelogs
    WHERE id = ${id}
    RETURNING id
  `;

  return deleted.length > 0;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const [row] = (await sql`
    SELECT
      (SELECT COUNT(*) FROM projects)::int AS projects,
      (SELECT COUNT(*) FROM feature_requests
         WHERE status <> 'Completed')::int AS open_requests,
      (SELECT COALESCE(SUM(votes), 0) FROM feature_requests)::int AS votes,
      (SELECT COUNT(*) FROM changelogs)::int AS releases
  `) as {
    projects: number;
    open_requests: number;
    votes: number;
    releases: number;
  }[];

  return {
    projects: row.projects,
    openRequests: row.open_requests,
    votes: row.votes,
    releases: row.releases,
  };
}

/** Looks up a user for sign-in; includes the password hash, so server-only. */
export async function getUserByEmail(
  email: string
): Promise<UserWithPassword | null> {
  const [row] = (await sql`
    SELECT id, email, name, password_hash
    FROM users
    WHERE email = ${email.toLowerCase()}
  `) as UserRow[];

  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    passwordHash: row.password_hash,
  };
}
