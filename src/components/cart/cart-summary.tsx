import { ROUTES } from "@/constants/routes";
import type { Cart } from "@/types/cart";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
interface CartSummaryProps {
  cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = Number(cart.subtotal);

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-3.5">
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-slate-500">Total Items</span>
          <span className="font-bold text-slate-900">{cart.totalItem}</span>
        </div>

        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-bold text-slate-900">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-slate-500">Shipping estimate</span>
          <span className="font-bold text-emerald-600">
            Calculated at checkout
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-slate-100" />

      <div className="flex items-baseline justify-between">
        <span className="text-base font-bold text-slate-900">Total</span>
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>
      </div>

      <Link
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        href={ROUTES.CHECKOUT}
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-500 border border-slate-100">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>Secure & encrypted checkout process</span>
      </div>
    </aside>
  );
}
