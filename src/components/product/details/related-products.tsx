"use client";

import { useRelatedProducts } from "@/hooks/products/use-related-products";
import RelatedProductCard from "./related-product-card";
import RelatedProductsSkeleton from "./related-products-skeleton";
import { Sparkles } from "lucide-react";

interface RelatedProductsProps {
  slug: string;
}

export default function RelatedProducts({ slug }: RelatedProductsProps) {
  const { data: products, isLoading, isError } = useRelatedProducts(slug);

  if (isLoading) {
    return <RelatedProductsSkeleton />;
  }

  if (isError || !products || products.data.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-slate-200/80 pt-12 sm:mt-20 sm:pt-16">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start gap-1 sm:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Curated For You</span>
        </div>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Related Products
        </h2>
        <p className="text-sm font-medium text-slate-500 sm:text-base">
          Explore complementary items and top choices picked just for this
          setup.
        </p>
      </div>

      {/* Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.data.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
