import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { deleteChangelog, updateChangelog } from '@/lib/data';
import { getProject } from '@/lib/projects';
import { changelogInputSchema } from '@/lib/validation';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const updated = await updateChangelog(id, parsed.data);
    if (!updated) {
      return Response.json({ error: 'Changelog not found.' }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    return Response.json({ id }, { status: 200 });
  } catch (error) {
    console.error('Error updating changelog:', error);

    return Response.json(
      { error: 'Failed to update changelog.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteChangelog(id);
    if (!deleted) {
      return Response.json({ error: 'Changelog not found.' }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting changelog:', error);

    return Response.json(
      { error: 'Failed to delete changelog.' },
      { status: 500 }
    );
  }
}
