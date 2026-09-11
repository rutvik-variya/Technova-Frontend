"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

import ProductCardSkeleton from "@/components/product/product-card-skeleton";
import ProductGrid from "@/components/product/product-grid";
import ProductPagination from "@/components/product/product-pagination";
import ProductSearch from "@/components/product/search/product-search";
import ProductFilters from "@/components/product/filters/product-filters";
import ProductSort from "@/components/product/sorting/product-sort";
import { useProducts } from "@/hooks/products/use-product";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? undefined;
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const brand = searchParams.get("brand") ?? undefined;
  const minPriceValue = searchParams.get("minPrice");
  const maxPriceValue = searchParams.get("maxPrice");
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | undefined;

  const minPrice = minPriceValue ? Number(minPriceValue) : undefined;
  const maxPrice = maxPriceValue ? Number(maxPriceValue) : undefined;

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 5,
    search,
    categoryId,
    brand,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  });

  const products = data?.products ?? [];

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased">
      {/* Hero Header */}
      <section className="border-b border-slate-200/80 bg-white py-10 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
                TechNova Store
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Explore Next-Gen Tech
              </h1>
              <p className="mt-2 text-base text-slate-500">
                Discover performance gear, premium computing, and modern
                accessories built for creators and tech enthusiasts.
              </p>
            </div>

            <div className="w-full md:w-auto md:min-w-95">
              <ProductSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle Header */}
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 active:scale-95"
          >
            <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
            Filters
            {(categoryId || brand || minPrice || maxPrice) && (
              <span className="ml-1 flex h-2 w-2 rounded-full bg-indigo-600" />
            )}
          </button>

          <ProductSort />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <ProductFilters
            mobileOpen={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />

          {/* Product Listing Section */}
          <section className="min-w-0">
            {/* Desktop Toolbar */}
            <div className="mb-6 hidden items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-5 py-3.5 shadow-xs lg:flex">
              <p className="text-sm font-medium text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {products.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {data?.pagination.total ?? 0}
                </span>{" "}
                products
              </p>
              <ProductSort />
            </div>

            {/* Skeleton Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-12 text-center backdrop-blur-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  ⚠️
                </div>
                <h2 className="mt-4 text-lg font-bold text-rose-900">
                  Unable to load catalog
                </h2>
                <p className="mt-1 text-sm text-rose-600">
                  We encountered an issue retrieving products. Please refresh or
                  try again.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && products.length === 0 && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-16 text-center shadow-xs">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  🔍
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">
                  No matching products found
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Try broadening your search query or removing selected filters.
                </p>
              </div>
            )}

            {/* Products Grid & Pagination */}
            {!isLoading && !isError && products.length > 0 && (
              <>
                <ProductGrid products={products} />

                {data && (
                  <ProductPagination
                    page={data.pagination.page}
                    totalPages={data.pagination.totalPages}
                  />
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
