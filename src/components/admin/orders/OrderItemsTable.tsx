import type { AdminOrderItem } from "@/types/admin-order.types";

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
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900">
          Order items ({items.length})
        </h2>
      </div>

      {items.length === 0 ? (
        <p className="p-6 text-sm text-gray-500">
          No items found for this order.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.productName}
                  className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                  No image
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{item.productName}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {item.brand} · SKU: {item.sku}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-gray-500">
                  {formatCurrency(item.unitPrice)} each
                </p>
                <p className="mt-1 font-semibold text-gray-900">
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
