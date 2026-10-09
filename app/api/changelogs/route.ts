import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { createChangelog, getChangelogs } from '@/lib/data';
import { getProject } from '@/lib/projects';
import { changelogInputSchema } from '@/lib/validation';

export async function GET() {
  try {
    return Response.json(await getChangelogs(), { status: 200 });
  } catch (error) {
    console.error('Error fetching changelogs:', error);

    return Response.json(
      { error: 'Failed to fetch changelogs.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = changelogInputSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Invalid changelog data.', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    if (!(await getProject(parsed.data.projectId))) {
      return Response.json({ error: 'Project not found.' }, { status: 404 });
    }

    const id = await createChangelog(parsed.data);
    revalidatePath('/', 'layout');
    return Response.json({ id }, { status: 201 });
  } catch (error) {
    console.error('Error creating changelog:', error);

    return Response.json(
      { error: 'Failed to create changelog.' },
      { status: 500 }
    );
  }
}
