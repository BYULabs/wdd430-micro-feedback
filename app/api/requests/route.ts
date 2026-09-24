import { sql } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    if (projectId && status && search) {
      const searchTerm = `%${search}%`;

      const requests = await sql`
        SELECT
          id,
          project_id AS "projectId",
          title,
          description,
          votes,
          status,
          category,
          created_at AS "createdAt"
        FROM feature_requests
        WHERE project_id = ${projectId}
          AND status = ${status}
          AND (
            title ILIKE ${searchTerm}
            OR description ILIKE ${searchTerm}
          )
        ORDER BY created_at DESC
      `;

      return Response.json(requests, { status: 200 });
    }

    if (projectId && status) {
      const requests = await sql`
        SELECT
          id,
          project_id AS "projectId",
          title,
          description,
          votes,
          status,
          category,
          created_at AS "createdAt"
        FROM feature_requests
        WHERE project_id = ${projectId}
          AND status = ${status}
        ORDER BY created_at DESC
      `;

      return Response.json(requests, { status: 200 });
    }

    if (projectId && search) {
      const searchTerm = `%${search}%`;

      const requests = await sql`
        SELECT
          id,
          project_id AS "projectId",
          title,
          description,
          votes,
          status,
          category,
          created_at AS "createdAt"
        FROM feature_requests
        WHERE project_id = ${projectId}
          AND (
            title ILIKE ${searchTerm}
            OR description ILIKE ${searchTerm}
          )
        ORDER BY created_at DESC
      `;

      return Response.json(requests, { status: 200 });
    }

    if (status && search) {
      const searchTerm = `%${search}%`;

      const requests = await sql`
        SELECT
          id,
          project_id AS "projectId",
          title,
          description,
          votes,
          status,
          category,
          created_at AS "createdAt"
        FROM feature_requests
        WHERE status = ${status}
          AND (
            title ILIKE ${searchTerm}
            OR description ILIKE ${searchTerm}
          )
        ORDER BY created_at DESC
      `;

      return Response.json(requests, { status: 200 });
    }

    if (projectId) {
      const requests = await sql`
        SELECT
          id,
          project_id AS "projectId",
          title,
          description,
          votes,
          status,
          category,
          created_at AS "createdAt"
        FROM feature_requests
        WHERE project_id = ${projectId}
        ORDER BY created_at DESC
      `;

      return Response.json(requests, { status: 200 });
    }

    if (status) {
      const requests = await sql`
        SELECT
          id,
          project_id AS "projectId",
          title,
          description,
          votes,
          status,
          category,
          created_at AS "createdAt"
        FROM feature_requests
        WHERE status = ${status}
        ORDER BY created_at DESC
      `;

      return Response.json(requests, { status: 200 });
    }

    if (search) {
      const searchTerm = `%${search}%`;

      const requests = await sql`
        SELECT
          id,
          project_id AS "projectId",
          title,
          description,
          votes,
          status,
          category,
          created_at AS "createdAt"
        FROM feature_requests
        WHERE
          title ILIKE ${searchTerm}
          OR description ILIKE ${searchTerm}
        ORDER BY created_at DESC
      `;

      return Response.json(requests, { status: 200 });
    }

    const requests = await sql`
      SELECT
        id,
        project_id AS "projectId",
        title,
        description,
        votes,
        status,
        category,
        created_at AS "createdAt"
      FROM feature_requests
      ORDER BY created_at DESC
    `;

    return Response.json(requests, { status: 200 });
  } catch (error) {
    console.error('Error fetching feature requests:', error);

    return Response.json(
      { error: 'Failed to fetch feature requests.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { projectId, title, description, category } = body;

    if (
      typeof projectId !== 'string' ||
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      typeof category !== 'string'
    ) {
      return Response.json(
        {
          error:
            'projectId, title, description, and category are required.',
        },
        { status: 400 }
      );
    }

    const trimmedProjectId = projectId.trim();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedCategory = category.trim();

    if (
      !trimmedProjectId ||
      !trimmedTitle ||
      !trimmedDescription ||
      !trimmedCategory
    ) {
      return Response.json(
        {
          error:
            'projectId, title, description, and category cannot be empty.',
        },
        { status: 400 }
      );
    }

    const project = await sql`
      SELECT id
      FROM projects
      WHERE id = ${trimmedProjectId}
    `;

    if (project.length === 0) {
      return Response.json(
        { error: 'Project not found.' },
        { status: 400 }
      );
    }

    const validCategories = [
      'Integrations',
      'UI & Dashboard',
      'API & Webhooks',
      'Security',
      'Other',
    ];

    if (!validCategories.includes(trimmedCategory)) {
      return Response.json(
        { error: 'Invalid category.' },
        { status: 400 }
      );
    }

    const id = `req-${Date.now().toString(36)}`;

    const [newRequest] = await sql`
      INSERT INTO feature_requests (
        id,
        project_id,
        title,
        description,
        votes,
        status,
        category
      )
      VALUES (
        ${id},
        ${trimmedProjectId},
        ${trimmedTitle},
        ${trimmedDescription},
        1,
        'Under Review',
        ${trimmedCategory}
      )
      RETURNING
        id,
        project_id AS "projectId",
        title,
        description,
        votes,
        status,
        category,
        created_at AS "createdAt"
    `;

    return Response.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating feature request:', error);

    return Response.json(
      { error: 'Failed to create feature request.' },
      { status: 500 }
    );
  }
}