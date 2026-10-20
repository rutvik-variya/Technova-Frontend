import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import type { AdminOrder } from "@/types/admin-order.types";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency, formatDate } from "@/app/admin/orders/utils";
import OrderStatusSelect from "./OrderStatusSelect";

interface OrdersTableProps {
  orders: AdminOrder[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-900">All Orders</h2>
        </div>
        <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
          {orders.length} on this page
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <h3 className="text-base font-bold text-slate-900">
            No orders found
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Try modifying your search query or filter parameters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Order Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-900">
                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px]">
                      {order.orderNumber}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">
                      {order.user.name}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                      {order.user.email}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <OrderStatusSelect
                      orderId={order.id}
                      orderNumber={order.orderNumber}
                      currentStatus={order.status}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <p className="mb-1 font-bold text-slate-700">
                      {order.paymentMethod}
                    </p>
                    <OrderStatusBadge status={order.paymentStatus} />
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-700">
                    {order.itemCount} items
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-extrabold text-slate-900">
                    {formatCurrency(order.grandTotal)}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-500 font-semibold">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-600/30 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                    >
                      <span>View details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
