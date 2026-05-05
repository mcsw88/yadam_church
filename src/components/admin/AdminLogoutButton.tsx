'use client';

import { logout } from '@/app/admin/actions/auth';

export function AdminLogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100"
      >
        로그아웃
      </button>
    </form>
  );
}
