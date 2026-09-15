"use client";

import { CartEmpty } from "./cart-empty";
import { CartSkeleton } from "./cart-skeleton";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { useCart } from "@/hooks/cart/use-cart";
import { useClearCart } from "@/hooks/cart/use-clear-cart";

export function CartPage() {
  const { data: cart, isLoading, isError, refetch } = useCart();
  const clearCartMutation = useClearCart();
  if (isLoading) {
    return <CartSkeleton />;
  }

  if (isError) {
    return (
      <section className="container py-10">
        <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border bg-background p-6 text-center">
          <h2 className="text-lg font-semibold">Failed to load cart</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading your cart.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!cart || cart.data.cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <section className="container py-8 sm:py-10 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Shopping Cart
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {cart.data.totalItem} {cart.data.totalItem === 1 ? "item" : "items"}{" "}
          in your cart
        </p>
      </div>

      {/* Cart Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        {/* Cart Items */}
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => clearCartMutation.mutate()}
              disabled={clearCartMutation.isPending}
              className="text-sm font-medium text-muted-foreground transition hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
            >
              {clearCartMutation.isPending ? "Clearing..." : "Clear Cart"}
            </button>
          </div>

          {cart.data.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <CartSummary cart={cart.data} />
      </div>
    </section>
  );
}
