import { sql } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('delta' in body) ||
    (body.delta !== 1 && body.delta !== -1)
  ) {
    return Response.json({ error: 'delta must be 1 or -1.' }, { status: 400 });
  }

  try {
    const { id } = await params;

    const [updatedRequest] = await sql`
      UPDATE feature_requests
      SET votes = GREATEST(0, votes + ${body.delta})
      WHERE id = ${id}
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

    if (!updatedRequest) {
      return Response.json(
        { error: 'Feature request not found.' },
        { status: 404 }
      );
    }

    return Response.json(updatedRequest, { status: 200 });
  } catch (error) {
    console.error('Error upvoting feature request:', error);

    return Response.json(
      { error: 'Failed to upvote feature request.' },
      { status: 500 }
    );
  }
}
