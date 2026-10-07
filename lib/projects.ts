import { sql } from '@/lib/db';
import type {
  Changelog,
  FeatureRequest,
  Project,
  ProjectCategory,
  RequestCategory,
  RequestStatus,
} from '@/types';

export interface ProjectWithStats extends Project {
  requestCount: number;
  totalVotes: number;
}

interface ProjectRow {
  id: string;
  name: string;
  icon: string;
  author: string;
  category: string;
  website: string;
  description: string;
  request_count: number;
  total_votes: number;
}

function toProject(row: ProjectRow): ProjectWithStats {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    author: row.author,
    category: row.category as ProjectCategory,
    website: row.website,
    description: row.description,
    requestCount: row.request_count,
    totalVotes: row.total_votes,
  };
}

export async function getProjects(
  search: string,
  category: string,
): Promise<ProjectWithStats[]> {
  const pattern = `%${search}%`;
  const rows = (await sql`
    SELECT p.*,
      COUNT(r.id)::int AS request_count,
      COALESCE(SUM(r.votes), 0)::int AS total_votes
    FROM projects p
    LEFT JOIN feature_requests r ON r.project_id = p.id
    WHERE (${search} = '' OR p.name ILIKE ${pattern} OR p.description ILIKE ${pattern} OR p.author ILIKE ${pattern})
      AND (${category} = '' OR p.category = ${category})
    GROUP BY p.id
    ORDER BY p.name
  `) as ProjectRow[];
  return rows.map(toProject);
}

export async function getProject(id: string): Promise<ProjectWithStats | null> {
  const rows = (await sql`
    SELECT p.*,
      COUNT(r.id)::int AS request_count,
      COALESCE(SUM(r.votes), 0)::int AS total_votes
    FROM projects p
    LEFT JOIN feature_requests r ON r.project_id = p.id
    WHERE p.id = ${id}
    GROUP BY p.id
  `) as ProjectRow[];
  return rows[0] ? toProject(rows[0]) : null;
}

export async function getProjectRequests(
  projectId: string,
): Promise<FeatureRequest[]> {
  const rows = (await sql`
    SELECT id, project_id, title, description, votes, status, category, created_at
    FROM feature_requests
    WHERE project_id = ${projectId}
    ORDER BY votes DESC
  `) as {
    id: string;
    project_id: string;
    title: string;
    description: string;
    votes: number;
    status: string;
    category: string;
    created_at: string | Date;
  }[];
  return rows.map((r) => ({
    id: r.id,
    projectId: r.project_id,
    title: r.title,
    description: r.description,
    votes: r.votes,
    status: r.status as RequestStatus,
    category: r.category as RequestCategory,
    createdAt: new Date(r.created_at).toISOString(),
  }));
}

export async function getProjectChangelogs(
  projectId: string,
): Promise<Changelog[]> {
  const rows = (await sql`
    SELECT id, project_id, version, title, notes, published_at
    FROM changelogs
    WHERE project_id = ${projectId}
    ORDER BY published_at DESC
  `) as {
    id: string;
    project_id: string;
    version: string;
    title: string;
    notes: string[];
    published_at: string | Date;
  }[];
  return rows.map((c) => ({
    id: c.id,
    projectId: c.project_id,
    version: c.version,
    title: c.title,
    notes: c.notes,
    publishedAt: new Date(c.published_at).toISOString(),
  }));
}
