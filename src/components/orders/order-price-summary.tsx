import type { OrderDetail } from "@/types/order";
import { Receipt } from "lucide-react";

interface OrderPriceSummaryProps {
  order: OrderDetail;
}

export default function OrderPriceSummary({ order }: OrderPriceSummaryProps) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Receipt className="h-4 w-4" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Price Summary</h2>
      </div>

      <div className="mt-4 space-y-3 text-xs font-medium">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-mono text-slate-900">
            ₹{order.subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {order.discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span className="font-mono">
              - ₹{order.discount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Shipping Fee</span>
          <span className="font-mono text-slate-900">
            {order.shippingCharge === 0 ? (
              <span className="text-emerald-600 font-semibold uppercase text-[10px]">
                Free
              </span>
            ) : (
              `₹${order.shippingCharge.toLocaleString("en-IN")}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Estimated Tax</span>
          <span className="font-mono text-slate-900">
            ₹{order.tax.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between border-t border-slate-200/80 pt-3 text-sm font-bold text-slate-900">
          <span>Grand Total</span>
          <span className="font-mono text-base text-slate-900">
            ₹{order.grandTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </section>
  );
}
