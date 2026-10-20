import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { AdminUserRole } from "@/types/admin-user.types";

interface AdminUserDetailsHeaderProps {
  name: string;
  email: string;
  role: AdminUserRole;
  createdAt: string;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export default function AdminUserDetailsHeader({
  name,
  email,
  role,
  createdAt,
}: AdminUserDetailsHeaderProps) {
  return (
    <div className="space-y-4 border-b border-slate-200/80 pb-6">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to users</span>
      </Link>

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 sm:flex-row sm:items-center sm:justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-xl font-black text-blue-600 shadow-xs">
            {name.trim().charAt(0).toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              {name}
            </h1>

            <p className="mt-0.5 text-xs font-medium text-slate-500">{email}</p>

            <p className="mt-1 text-[11px] font-semibold text-slate-400">
              Joined {formatDate(createdAt)}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-extrabold tracking-tight ${
            role === "ADMIN"
              ? "border-purple-200 bg-purple-50 text-purple-700"
              : "border-slate-200 bg-slate-100 text-slate-600"
          }`}
        >
          {role}
        </span>
      </div>
    </div>
  );
}
