import type { AdminDashboardOrders } from "@/types/admin";

interface AdminOrderStatusProps {
  orders: AdminDashboardOrders;
}

const orderStatuses = [
  { key: "pending", label: "Pending", color: "bg-amber-500" },
  { key: "confirmed", label: "Confirmed", color: "bg-blue-500" },
  { key: "processing", label: "Processing", color: "bg-purple-500" },
  { key: "shipped", label: "Shipped", color: "bg-indigo-500" },
  { key: "delivered", label: "Delivered", color: "bg-emerald-500" },
  { key: "cancelled", label: "Cancelled", color: "bg-rose-500" },
  { key: "returned", label: "Returned", color: "bg-orange-500" },
] as const;

export default function AdminOrderStatus({ orders }: AdminOrderStatusProps) {
  const totalCount = Object.values(orders).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Order Distribution</h2>
        <p className="mt-0.5 text-xs text-slate-500 font-medium">
          Breakdown by status
        </p>
      </div>

      <div className="space-y-3.5">
        {orderStatuses.map((status) => {
          const count = orders[status.key] || 0;
          const percentage =
            totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

          return (
            <div key={status.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">
                  {status.label}
                </span>
                <span className="font-bold text-slate-900">{count}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${status.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
