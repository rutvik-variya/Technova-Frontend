import Link from "next/link";
import { Users } from "lucide-react";

import type { AdminUser } from "@/types/admin-user.types";
import AdminUserRoleSelect from "./AdminUserRoleSelect";

interface AdminUsersTableProps {
  users: AdminUser[];
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export default function AdminUsersTable({ users }: AdminUsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-xs">
        <h3 className="text-base font-bold text-slate-900">No users found</h3>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Registered TechNova users will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
        <Users className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-bold text-slate-900">
          All Registered Users
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-187.5 text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">User Profile</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4">Registered Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-xs font-black text-blue-600">
                      {user.name.trim().charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {user.name}
                      </div>
                      <div className="text-[11px] font-medium text-slate-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <AdminUserRoleSelect
                    userId={user.id}
                    userName={user.name}
                    currentRole={user.role}
                  />
                </td>

                <td className="px-6 py-4 font-bold text-slate-700">
                  {user.orderCount} orders
                </td>

                <td className="px-6 py-4 text-slate-500 font-semibold">
                  {formatDate(user.createdAt)}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-600/30 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                  >
                    <span>View details</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
