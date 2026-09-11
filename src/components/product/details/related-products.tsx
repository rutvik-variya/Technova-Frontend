"use client";

import { useRelatedProducts } from "@/hooks/products/use-related-products";
import RelatedProductCard from "./related-product-card";
import RelatedProductsSkeleton from "./related-products-skeleton";

interface RelatedProductsProps {
  slug: string;
}

export default function RelatedProducts({ slug }: RelatedProductsProps) {
  const { data: products, isLoading, isError } = useRelatedProducts(slug);

  if (isLoading) {
    return <RelatedProductsSkeleton />;
  }

  if (isError) {
    return null;
  }

  if (!products || products.data.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>

        <p className="mt-1 text-sm text-slate-500">
          You may also like these products
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.data.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
