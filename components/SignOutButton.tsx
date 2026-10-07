import { LogOut } from 'lucide-react';
import { Button } from '@/components/Button';
import { signOut } from '@/auth';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <Button type="submit" variant="secondary" size="md">
        <LogOut className="h-4 w-4" aria-hidden />
        Sign Out
      </Button>
    </form>
  );
}
