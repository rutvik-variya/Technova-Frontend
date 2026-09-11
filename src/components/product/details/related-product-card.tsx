"use client";

import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

interface RelatedProductCardProps {
  product: Product;
}

export default function RelatedProductCard({
  product,
}: RelatedProductCardProps) {
  const primaryImage =
    product.productImages
      ?.slice()
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .find((image) => image.isPrimary)?.url || product.productImages?.[0]?.url;

  const price = Number(product.basePrice);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-slate-900">
          {product.name}
        </h3>

        <div className="mt-3">
          <p className="text-lg font-bold text-slate-900">
            ₹{price.toLocaleString("en-IN")}
          </p>

          {Number(product.maxPrice) > price && (
            <p className="mt-1 text-xs text-slate-500">
              Up to ₹{Number(product.maxPrice).toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
