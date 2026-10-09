import { AdminDashboard } from '@/components/AdminDashboard';
import { auth } from '@/auth';
import { getChangelogs, getFeatureRequests } from '@/lib/data';
import { getProjects } from '@/lib/projects';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const [projects, requests, changelogs] = await Promise.all([
    getProjects('', ''),
    getFeatureRequests(),
    getChangelogs(),
  ]);

  return (
    <AdminDashboard
      projects={projects}
      requests={requests}
      changelogs={changelogs}
    />
  );
}
