"use client";

import type { ReviewPagination } from "@/types/reviews";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewPaginationProps {
  pagination: ReviewPagination;
  onPageChange: (page: number) => void;
}

export default function ReviewPagination({
  pagination,
  onPageChange,
}: ReviewPaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
      <button
        type="button"
        disabled={!pagination.hasPrevious}
        onClick={() => onPageChange(pagination.page - 1)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 shadow-sm"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <span className="text-sm font-medium text-slate-600">
        Page <span className="font-bold text-slate-900">{pagination.page}</span>{" "}
        of{" "}
        <span className="font-bold text-slate-900">
          {pagination.totalPages}
        </span>
      </span>

      <button
        type="button"
        disabled={!pagination.hasNext}
        onClick={() => onPageChange(pagination.page + 1)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 shadow-sm"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
