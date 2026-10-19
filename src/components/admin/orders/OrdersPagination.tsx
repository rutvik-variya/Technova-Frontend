import type { AdminOrdersMeta } from "@/types/admin-order.types";

interface OrdersPaginationProps {
  meta: AdminOrdersMeta;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export default function OrdersPagination({
  meta,
  disabled = false,
  onPageChange,
}: OrdersPaginationProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        Page {meta.page} of {meta.totalPages}
        {" · "}
        {meta.total} total orders
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!meta.hasPrevious || disabled}
          onClick={() => onPageChange(meta.page - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!meta.hasNext || disabled}
          onClick={() => onPageChange(meta.page + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
