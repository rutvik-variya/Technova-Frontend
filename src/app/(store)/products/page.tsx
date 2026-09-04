"use client";

import ProductCardSkeleton from "@/components/product/product-card-skeleton";
import ProductGrid from "@/components/product/product-grid";
import { useProducts } from "@/hooks/use-product";

export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts({
    page: 1,
    limit: 12,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-9 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-5 w-72 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Unable to load products
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Something went wrong while loading products.
        </p>
      </main>
    );
  }

  const products = data?.products ?? [];

  if (!products.length) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-slate-900">No products found</h1>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">All Products</h1>

        <p className="mt-2 text-sm text-slate-500">
          Explore our latest technology products.
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}
