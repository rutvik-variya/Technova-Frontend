import type { AdminUsersMeta } from "@/types/admin-user.types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminUsersPaginationProps {
  meta: AdminUsersMeta;
  onPageChange: (page: number) => void;
}

export default function AdminUsersPagination({
  meta,
  onPageChange,
}: AdminUsersPaginationProps) {
  if (meta.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <p className="text-xs font-medium text-slate-500">
        Showing page <strong className="text-slate-900">{meta.page}</strong> of{" "}
        <strong className="text-slate-900">{meta.totalPages}</strong> (
        <strong className="text-slate-900">{meta.total}</strong> total users)
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrevious}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNext}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
        >
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
