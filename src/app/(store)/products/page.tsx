"use client";

import { useSearchParams } from "next/navigation";
import ProductCardSkeleton from "@/components/product/product-card-skeleton";
import ProductGrid from "@/components/product/product-grid";
import ProductPagination from "@/components/product/product-pagination";
import { useProducts } from "@/hooks/use-product";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  // Filters
  const search = searchParams.get("search") ?? undefined;
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const brand = searchParams.get("brand") ?? undefined;

  // Price filters
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const minPrice =
    minPriceParam !== null && minPriceParam !== ""
      ? Number(minPriceParam)
      : undefined;

  const maxPrice =
    maxPriceParam !== null && maxPriceParam !== ""
      ? Number(maxPriceParam)
      : undefined;

  // Pagination
  const pageParam = searchParams.get("page");

  const page =
    pageParam && !Number.isNaN(Number(pageParam))
      ? Math.max(1, Number(pageParam))
      : 1;

  const limit = 10;

  // Sorting
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const sortOrderParam = searchParams.get("sortOrder");

  const sortOrder =
    sortOrderParam === "asc" || sortOrderParam === "desc"
      ? sortOrderParam
      : undefined;

  const { data, isLoading, isError } = useProducts({
    page,
    limit,
    search,
    categoryId,
    brand,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  });

  // Loading
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

  // Error
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
  const pagination = data?.pagination;

  // Empty state
  if (!data || !products.length) {
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
        <h1 className="text-[22px] font-bold text-slate-900">All Products</h1>

        <p className="mt-2 text-sm text-slate-500">
          Explore our latest technology products.
        </p>
      </div>

      <ProductGrid products={products} />

      {pagination && (
        <ProductPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
        />
      )}
    </main>
  );
}
