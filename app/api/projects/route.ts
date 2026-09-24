import { sql } from '@/lib/db';

export async function GET() {
  try {
    const projects = await sql`
      SELECT
        id,
        name,
        icon,
        author,
        category,
        website,
        description
      FROM projects
      ORDER BY name ASC
    `;

    return Response.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);

    return Response.json(
      { error: 'Failed to fetch projects.' },
      { status: 500 }
    );
  }
}