"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

import {
  useAdminOrderDetails,
  useAdminOrderTimeline,
} from "@/hooks/admin/useAdminOrders";
import OrderDetailsHeader from "@/components/admin/orders/OrderDetailsHeader";
import OrderStatusOverview from "@/components/admin/orders/OrderStatusOverview";
import OrderAddressCard from "@/components/admin/orders/OrderAddressCard";
import OrderItemsTable from "@/components/admin/orders/OrderItemsTable";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import OrderSummaryCard from "@/components/admin/orders/OrderSummaryCard";

export default function AdminOrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    isError,
    error,
    refetch,
  } = useAdminOrderDetails(orderId);

  const {
    data: timeline,
    isLoading: isTimelineLoading,
    isError: isTimelineError,
  } = useAdminOrderTimeline(orderId);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-6xl space-y-8 animate-pulse">
        <div className="h-8 w-64 rounded-xl bg-slate-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-28 rounded-3xl bg-slate-100" />
          <div className="h-28 rounded-3xl bg-slate-100" />
          <div className="h-28 rounded-3xl bg-slate-100" />
        </div>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Unable to load order details
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            {error instanceof Error
              ? error.message
              : "The requested order could not be found."}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to orders</span>
            </Link>

            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try again</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8">
      <OrderDetailsHeader
        orderNumber={order.orderNumber}
        createdAt={order.createdAt}
      />

      <OrderStatusOverview
        status={order.status}
        paymentStatus={order.paymentStatus}
        paymentMethod={order.paymentMethod}
      />

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_400px]">
        <div className="min-w-0 space-y-8">
          <OrderAddressCard address={order.address} />
          <OrderItemsTable items={order.items} />
          <OrderTimeline
            timeline={timeline ?? []}
            isLoading={isTimelineLoading}
            isError={isTimelineError}
          />
        </div>

        <div className="sticky top-6">
          <OrderSummaryCard
            subtotal={Number(order.subtotal)}
            discount={Number(order.discount)}
            shippingCharge={Number(order.shippingCharge)}
            tax={Number(order.tax)}
            grandTotal={Number(order.grandTotal)}
          />
        </div>
      </div>
    </main>
  );
}
