import type { AdminCouponPagination } from "@/types/admin-coupon.types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminCouponsPaginationProps {
  pagination: AdminCouponPagination;
  onPageChange: (page: number) => void;
}

export default function AdminCouponsPagination({
  pagination,
  onPageChange,
}: AdminCouponsPaginationProps) {
  const { page, total, totalPages, hasPrevious, hasNext } = pagination;

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <p className="text-xs font-medium text-slate-500">
        Showing page <strong className="text-slate-900">{page}</strong> of{" "}
        <strong className="text-slate-900">{totalPages}</strong> (
        <strong className="text-slate-900">{total}</strong> total coupons)
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPrevious}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
        >
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
