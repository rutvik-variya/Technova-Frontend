"use client";

import { useProductDetails } from "@/hooks/use-product-detail";
import ProductDetailsSkeleton from "./product-details-skeleton";
import ProductGallery from "./product-gallery";
import ProductInfo from "./product-info";
import ProductDescription from "./product-description";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ProductDetailsProps {
  slug: string;
}

export default function ProductDetails({ slug }: ProductDetailsProps) {
  const { data: product, isLoading, isError, refetch } = useProductDetails(slug);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !product) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Product Not Found
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            We couldn&apos;t load the requested product details. It may have been moved or removed.
          </p>
          <button
            onClick={() => refetch?.()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.productImages ?? []}
            productName={product.name}
          />
        </div>

        <div className="lg:col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>

      <ProductDescription description={product.description} />
    </section>
  );
}