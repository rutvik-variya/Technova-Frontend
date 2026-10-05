import type { OrderItem } from "@/types/order";
import OrderItemCard from "@/components/orders/order-item";
import { ShoppingBag } from "lucide-react";

interface OrderItemsProps {
  items: OrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Ordered Items</h2>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
