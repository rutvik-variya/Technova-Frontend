import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function CartEmpty() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center sm:p-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-slate-200 text-blue-600 shadow-sm">
          <ShoppingBag className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-md text-sm font-medium text-slate-500 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet. Discover
          our latest tech gear and find your next setup upgrade.
        </p>

        <Link
          href={ROUTES.PRODUCTS}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.99]"
        >
          <span>Explore Products</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
