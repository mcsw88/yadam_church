import { createClient } from '@/lib/supabase/server';
import { AdminLogoutButton } from './AdminLogoutButton';

export async function AdminHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <span className="text-sm font-medium text-gray-700">관리자</span>
      <div className="flex items-center gap-3">
        {user && (
          <span className="text-sm text-gray-500 hidden sm:block">
            {user.email}
          </span>
        )}
        <AdminLogoutButton />
      </div>
    </header>
  );
}
