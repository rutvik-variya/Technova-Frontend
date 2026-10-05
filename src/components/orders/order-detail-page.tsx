"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Package,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { useOrder } from "@/hooks/order/useOrder";
import OrderItems from "./order-items";
import OrderAddress from "./order-address";
import OrderPriceSummary from "./order-price-summary";
import CancelOrderButton from "./cancel-order-button";
import OrderDetailSkeleton from "./order-detail-skeleton";

interface OrderDetailPageProps {
  orderId: string;
}

// Helpers for badges
const getStatusBadge = (status: string) => {
  const normalized = status.toLowerCase();
  if (["completed", "delivered"].includes(normalized)) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
  }
  if (["processing", "shipped", "in_transit"].includes(normalized)) {
    return "bg-blue-50 text-blue-700 border-blue-200/80";
  }
  if (["pending", "payment_pending"].includes(normalized)) {
    return "bg-amber-50 text-amber-700 border-amber-200/80";
  }
  if (["cancelled", "failed", "refunded"].includes(normalized)) {
    return "bg-rose-50 text-rose-700 border-rose-200/80";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
};

const getPaymentBadge = (status: string) => {
  const normalized = status.toLowerCase();
  if (["paid", "completed", "success"].includes(normalized)) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
  }
  if (["pending", "unpaid"].includes(normalized)) {
    return "bg-amber-50 text-amber-700 border-amber-200/80";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
};

export default function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const { data: order, isLoading, isError, error } = useOrder(orderId);

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError) {
    return (
      <main className="min-h-[70vh] bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-rose-200/80 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mb-4">
            <XCircle className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">
            Unable to load order
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading the order details."}
          </p>
          <Link
            href="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-[70vh] bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-4">
            <Package className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">Order Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t find the requested order. It may have been removed
            or does not exist.
          </p>
          <Link
            href="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16 pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button Link */}
        <div className="mb-6">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Orders
          </Link>
        </div>

        {/* Page Title & Status Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Order Reference
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl font-mono mt-0.5">
              #{order.orderNumber}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${getStatusBadge(
                order.status,
              )}`}
            >
              <Clock className="h-3.5 w-3.5" />
              {order.status.replace("_", " ")}
            </span>

            {order.status === "PENDING" && (
              <CancelOrderButton orderId={order.id} />
            )}
          </div>
        </div>

        {/* Overview Information Section */}
        <section className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Payment & Fulfillment Overview
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <p className="text-xs font-semibold text-slate-500">
                Fulfillment Status
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getStatusBadge(
                    order.status,
                  )}`}
                >
                  {order.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <p className="text-xs font-semibold text-slate-500">
                Payment Status
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getPaymentBadge(
                    order.paymentStatus,
                  )}`}
                >
                  {order.paymentStatus.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <p className="text-xs font-semibold text-slate-500">
                Payment Method
              </p>
              <p className="mt-2 flex items-center gap-1.5 font-semibold text-slate-800 text-sm uppercase">
                <CreditCard className="h-4 w-4 text-slate-400" />
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </section>

        {/* 2-Column Responsive Layout for Main Order Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column (Items List - 2 cols on desktop) */}
          <div className="space-y-6 lg:col-span-2">
            <OrderItems items={order.items} />
          </div>

          {/* Right Column (Address & Price Summary - 1 col on desktop) */}
          <div className="space-y-6">
            <OrderAddress address={order.address} />
            <OrderPriceSummary order={order} />
          </div>
        </div>
      </div>
    </main>
  );
}
