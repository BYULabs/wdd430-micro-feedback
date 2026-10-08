import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { deleteFeatureRequest } from '@/lib/data';

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
    const deleted = await deleteFeatureRequest(id);

    if (!deleted) {
      return Response.json(
        { error: 'Feature request not found.' },
        { status: 404 }
      );
    }

    revalidatePath('/', 'layout');
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting feature request:', error);

    return Response.json(
      { error: 'Failed to delete feature request.' },
      { status: 500 }
    );
  }
}
