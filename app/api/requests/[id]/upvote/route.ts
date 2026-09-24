import { sql } from '@/lib/db';

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [updatedRequest] = await sql`
      UPDATE feature_requests
      SET votes = votes + 1
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
        { status: 400 }
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