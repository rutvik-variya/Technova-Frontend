import type { AdminOrderItem } from "@/types/admin-order.types";
import { Package, Image as ImageIcon } from "lucide-react";

interface Props {
  items: AdminOrderItem[];
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

export default function OrderItemsTable({ items }: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
        <Package className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-bold text-slate-900">
          Order Items ({items.length})
        </h2>
      </div>

      {items.length === 0 ? (
        <p className="p-8 text-center text-xs font-medium text-slate-400">
          No items found for this order.
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center transition-colors hover:bg-slate-50/50"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-1">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="h-full w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">
                  {item.productName}
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-400">
                  {item.brand} · SKU:{" "}
                  <span className="font-mono">{item.sku}</span>
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs font-medium text-slate-400">
                  {formatCurrency(item.unitPrice)} each
                </p>
                <p className="mt-1 text-sm font-extrabold text-slate-900">
                  {formatCurrency(item.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
