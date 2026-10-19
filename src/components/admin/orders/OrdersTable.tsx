import Link from "next/link";

import type { AdminOrder } from "@/types/admin-order.types";

import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency, formatDate } from "@/app/admin/orders/utils";
import OrderStatusSelect from "./OrderStatusSelect";

interface OrdersTableProps {
  orders: AdminOrder[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
        <h2 className="font-semibold text-gray-900">All Orders</h2>
        <span className="text-sm text-gray-500">
          {orders.length} on this page
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <h3 className="font-semibold text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-262.5 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Order status</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Items</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                    {order.orderNumber}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {order.user.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.user.email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <OrderStatusSelect
                      orderId={order.id}
                      orderNumber={order.orderNumber}
                      currentStatus={order.status}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <p className="mb-1 font-medium text-gray-800">
                      {order.paymentMethod}
                    </p>
                    <OrderStatusBadge status={order.paymentStatus} />
                  </td>

                  <td className="px-5 py-4">{order.itemCount}</td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                    {formatCurrency(order.grandTotal)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600"
                    >
                      View
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
