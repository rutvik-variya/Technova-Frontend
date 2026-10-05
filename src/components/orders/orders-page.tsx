"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { useOrders } from "@/hooks/order/useOrders";
import OrderListSkeleton from "./order-list-skeleton";
import OrderError from "./order-error";
import OrderEmpty from "./order-empty";
import OrderCard from "./order-card";
import OrderPagination from "./order-pagination";

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useOrders({
    page,
    limit: 10,
  });

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16 pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/10">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  My Orders
                </h1>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Track shipment status and view purchase history
                </p>
              </div>
            </div>
          </div>

          {!isLoading && !isError && data?.meta && (
            <div className="inline-flex items-center self-start rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm sm:self-auto">
              Total Orders:{" "}
              <span className="ml-1 text-slate-900 font-bold">
                {data.data.length}
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && <OrderListSkeleton />}

        {/* Error State */}
        {isError && (
          <OrderError
            message={error instanceof Error ? error.message : undefined}
          />
        )}

        {/* Empty State */}
        {!isLoading && !isError && data?.data.length === 0 && <OrderEmpty />}

        {/* Content & List */}
        {!isLoading && !isError && data?.data && data.data.length > 0 && (
          <>
            <div className="space-y-4">
              {data.data.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {data.meta && (
              <div className="mt-8">
                <OrderPagination
                  page={data.meta.page}
                  totalPages={data.meta.totalPages}
                  hasNext={data.meta.hasNext}
                  hasPrevious={data.meta.hasPrevious}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
