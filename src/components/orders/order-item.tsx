import Image from "next/image";
import type { OrderItem as OrderItemType } from "@/types/order";
import { Package } from "lucide-react";

interface OrderItemProps {
  item: OrderItemType;
}

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex flex-col gap-4 py-5 last:pb-0 sm:flex-row sm:items-center">
      {/* Product Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 p-1">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.productName}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
            <Package className="h-6 w-6" />
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-slate-900 leading-snug">
          {item.productName}
        </h3>

        {item.brand && (
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            {item.brand}
          </p>
        )}

        {item.sku && (
          <p className="mt-1 font-mono text-[11px] text-slate-400">
            SKU: {item.sku}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-4 text-xs font-medium text-slate-600">
          <span>
            Qty: <strong className="text-slate-900">{item.quantity}</strong>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            Unit Price:{" "}
            <strong className="text-slate-900">
              ₹{item.unitPrice.toLocaleString("en-IN")}
            </strong>
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0 sm:text-right">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Total
        </p>
        <p className="mt-0.5 font-mono text-base font-bold text-slate-900">
          ₹{item.totalPrice.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
