"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
}

export default function ProductPagination({
  page,
  totalPages,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(nextPage));

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <span className="px-4 text-sm font-medium text-slate-600">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
