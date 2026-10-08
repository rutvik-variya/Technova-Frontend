import type { AdminRecentOrder } from "@/types/admin";
import AdminOrderStatusBadge from "./AdminOrderStatusBadge";
import AdminPaymentStatusBadge from "./AdminPaymentStatusBadge";

interface AdminRecentOrdersProps {
  orders: AdminRecentOrder[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export default function AdminRecentOrders({ orders }: AdminRecentOrdersProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
        <p className="mt-0.5 text-xs text-slate-500 font-medium">
          Latest customer transactions across your store
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-xs font-medium text-slate-500">
            No recent orders recorded.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Payment</th>
                <th className="px-6 py-3.5">Total</th>
                <th className="px-6 py-3.5">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {order.orderNumber}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700">
                        {order.customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {order.customer.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {order.customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <AdminOrderStatusBadge status={order.status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <AdminPaymentStatusBadge status={order.paymentStatus} />
                      <span className="text-[10px] font-medium text-slate-400">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-900">
                    {formatCurrency(order.grandTotal)}
                  </td>

                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {formatDate(order.createdAt)}
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
