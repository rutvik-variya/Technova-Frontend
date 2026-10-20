"use client";

import { useState } from "react";
import { Users, RefreshCw } from "lucide-react";

import AdminUsersTable from "@/components/admin/users/AdminUsersTable";
import AdminUsersPagination from "@/components/admin/users/AdminUsersPagination";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, refetch, isFetching } = useAdminUsers({
    page,
    limit: PAGE_SIZE,
  });

  const users = data?.users ?? [];
  const meta = data?.meta;

  return (
    <main className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Users className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Users Management
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            View, track, and manage registered TechNova user profiles and
            permissions
          </p>
        </div>

        {meta && (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-3 shadow-xs">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Total Users
              </p>
              <p className="text-lg font-extrabold text-slate-900">
                {meta.total}
              </p>
            </div>
          </div>
        )}
      </div>

      {isPending ? (
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs animate-pulse">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded-xl bg-slate-200" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b border-slate-100 py-3"
              >
                <div className="h-4 w-48 rounded-lg bg-slate-200" />
                <div className="h-6 w-20 rounded-full bg-slate-100" />
                <div className="h-4 w-12 rounded-lg bg-slate-100" />
                <div className="h-4 w-28 rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <p className="text-base font-extrabold text-rose-800">
            Failed to load users.
          </p>
          <p className="mt-1 text-xs font-semibold text-rose-600">
            Please check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {isFetching && (
            <p className="text-xs font-bold text-blue-600" role="status">
              Updating users list...
            </p>
          )}

          <AdminUsersTable users={users} />

          {meta && <AdminUsersPagination meta={meta} onPageChange={setPage} />}
        </div>
      )}
    </main>
  );
}
