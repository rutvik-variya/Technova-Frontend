"use client";

import Link from "next/link";
import { useFeaturedProducts } from "@/hooks/use-featured-products";
import Section from "../ui/section";
import Container from "../layout/container";
import Heading from "../ui/heading";
import { ProductCard } from "./product-card";
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react";

export default function FeaturedProduct() {
  const { data, isLoading, isError, refetch } = useFeaturedProducts();
  const featuredProducts = data?.data || [];

  return (
    <Section className="bg-slate-50/50 py-12 lg:py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-8">
          <Heading
            title="Featured Best-Sellers"
            description="Top rated devices and high-performance hardware loved by our customers."
            className="mb-0"
          />
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-all hover:gap-2.5 hover:text-blue-700"
          >
            <span>View All Products</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-xs"
              >
                <div className="aspect-square w-full animate-pulse rounded-xl bg-slate-100" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">
              Failed to load featured products
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Could not load product recommendations right now.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Try Again
            </button>
          </div>
        )}

        {/* Loaded Data Grid */}
        {!isLoading &&
          !isError &&
          (featuredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
              No featured products available at the moment.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ))}
      </Container>
    </Section>
  );
}
