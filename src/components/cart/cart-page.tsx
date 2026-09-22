"use client";

import { useCart } from "@/hooks/cart/use-cart";
import { useClearCart } from "@/hooks/cart/use-clear-cart";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

import { CartEmpty } from "./cart-empty";
import { CartItem } from "./cart-item";
import { CartSkeleton } from "./cart-skeleton";
import { CartSummary } from "./cart-summary";

import { AlertCircle, RefreshCw, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { data: cart, isLoading, isError, refetch } = useCart();

  const clearCartMutation = useClearCart();

  const { data: user } = useCurrentUser();

  const isAuthenticated = Boolean(user);

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/50 p-8 text-center sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Failed to Load Cart
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            We ran into an issue retrieving your shopping cart items. Please
            check your network or try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 flex flex-col gap-2 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <ShoppingBag className="h-4 w-4" />
            </span>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Shopping Cart
            </h1>
          </div>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {cart.totalItem} {cart.totalItem === 1 ? "item" : "items"} currently
            in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            clearCartMutation.mutate({
              isAuthenticated,
            })
          }
          disabled={clearCartMutation.isPending}
          className="inline-flex items-center gap-1.5 self-start rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <Trash2 className="h-3.5 w-3.5" />

          {clearCartMutation.isPending ? "Clearing..." : "Clear Cart"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-7 xl:col-span-8">
          {cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <CartSummary cart={cart} />
        </div>
      </div>
    </section>
  );
}
