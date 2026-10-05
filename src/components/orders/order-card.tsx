import Link from "next/link";
import { ArrowRight, Calendar, CreditCard, ShoppingBag } from "lucide-react";
import type { OrderListItem } from "@/types/order";

interface OrderCardProps {
  order: OrderListItem;
}

// Status style mappings for Technova palette
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

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Order Number
            </p>
            <h2 className="font-mono text-base font-bold text-slate-900">
              #{order.orderNumber}
            </h2>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize transition-all ${getStatusBadge(
              order.status,
            )}`}
          >
            {order.status.replace("_", " ")}
          </span>

          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize transition-all ${getPaymentBadge(
              order.paymentStatus,
            )}`}
          >
            {order.paymentStatus.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Grid Content Details */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
        <div>
          <p className="text-xs font-medium text-slate-400">Items</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            {order.itemCount} {order.itemCount === 1 ? "Item" : "Items"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400">Payment Method</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-800 uppercase">
            <CreditCard className="h-3.5 w-3.5 text-slate-400" />
            {order.paymentMethod}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400">Subtotal</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            ₹{order.subtotal.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400">Total Amount</p>
          <p className="mt-1 text-base font-bold text-slate-900">
            ₹{order.grandTotal.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Footer Navigation Link */}
      <div className="mt-5 flex items-center justify-end border-t border-slate-100 pt-4">
        <Link
          href={`/orders/${order.id}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-200/80 transition-all active:scale-95"
        >
          View Order Details
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
