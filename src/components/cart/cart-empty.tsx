import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export function CartEmpty() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20">
      <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-7 w-7 text-muted-foreground" />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          You haven&apos;t added any products to your cart yet. Explore our
          products and find something you love.
        </p>

        <Link
          href={ROUTES.PRODUCTS}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
