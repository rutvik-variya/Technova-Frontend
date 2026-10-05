import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrderPaginationProps {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

export default function OrderPagination({
  page,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}: OrderPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:px-5">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevious}
        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <div className="text-xs font-semibold text-slate-600">
        Page <span className="text-slate-900 font-bold">{page}</span> of{" "}
        <span className="text-slate-900 font-bold">{totalPages}</span>
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
