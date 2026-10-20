"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, RefreshCw } from "lucide-react";

import { useAdminOrders } from "@/hooks/admin/useAdminOrders";
import type {
  AdminOrdersParams,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "@/types/admin-order.types";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrdersLoading from "@/components/admin/orders/OrdersLoading";
import OrdersError from "@/components/admin/orders/OrdersError";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import OrdersPagination from "@/components/admin/orders/OrdersPagination";

export default function AdminOrdersPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const params: AdminOrdersParams = {
    page,
    limit,
    ...(search ? { search } : {}),
    ...(status ? { status: status as OrderStatus } : {}),
    ...(paymentStatus ? { paymentStatus: paymentStatus as PaymentStatus } : {}),
    ...(paymentMethod ? { paymentMethod: paymentMethod as PaymentMethod } : {}),
  };

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminOrders(params);

  const orders = data?.data ?? [];
  const meta = data?.meta;

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setPaymentStatus("");
    setPaymentMethod("");
    setPage(1);
  };

  return (
    <main className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <ShoppingCart className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Orders Management
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Monitor, track, and manage all incoming customer orders and statuses
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          <span>{isFetching ? "Refreshing..." : "Refresh Orders"}</span>
        </button>
      </div>

      <OrderFilters
        searchInput={searchInput}
        status={status}
        paymentStatus={paymentStatus}
        paymentMethod={paymentMethod}
        onSearchChange={setSearchInput}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onPaymentStatusChange={(value) => {
          setPaymentStatus(value);
          setPage(1);
        }}
        onPaymentMethodChange={(value) => {
          setPaymentMethod(value);
          setPage(1);
        }}
        onReset={resetFilters}
      />

      {isLoading && <OrdersLoading />}

      {isError && !isLoading && (
        <OrdersError
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."
          }
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (
        <div className="space-y-4">
          <OrdersTable orders={orders} />

          {meta && meta.totalPages > 0 && (
            <OrdersPagination
              meta={meta}
              disabled={isFetching}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </main>
  );
}
