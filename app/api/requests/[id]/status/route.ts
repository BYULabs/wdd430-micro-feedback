import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { setFeatureRequestStatus } from '@/lib/data';
import { requestStatusSchema } from '@/lib/validation';

export async function PATCH(
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

  if (typeof body !== 'object' || body === null || !('status' in body)) {
    return Response.json({ error: 'A status is required.' }, { status: 400 });
  }

  const parsedStatus = requestStatusSchema.safeParse(body.status);
  if (!parsedStatus.success) {
    return Response.json({ error: 'Invalid request status.' }, { status: 400 });
  }

  try {
    const { id } = await params;
    const updated = await setFeatureRequestStatus(id, parsedStatus.data);

    if (!updated) {
      return Response.json(
        { error: 'Feature request not found.' },
        { status: 404 }
      );
    }

    revalidatePath('/', 'layout');
    return Response.json({ id, status: parsedStatus.data }, { status: 200 });
  } catch (error) {
    console.error('Error updating feature request status:', error);

    return Response.json(
      { error: 'Failed to update feature request status.' },
      { status: 500 }
    );
  }
}
