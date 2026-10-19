"use client";

import { useEffect, useState } from "react";

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

  // The service returns the nested listing result.
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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track customer orders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {isFetching ? "Refreshing..." : "Refresh"}
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
        <>
          <OrdersTable orders={orders} />

          {meta && meta.totalPages > 0 && (
            <OrdersPagination
              meta={meta}
              disabled={isFetching}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
