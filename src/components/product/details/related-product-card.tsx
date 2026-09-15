"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/30 hover:shadow-xl hover:shadow-slate-200/50 sm:p-4"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-colors duration-300 group-hover:bg-blue-50/20 sm:p-4">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-semibold text-slate-400">
            No image available
          </div>
        )}

        {/* Brand Tag (Desktop / Tablet) */}
        {product.brand && (
          <span className="absolute left-2.5 top-2.5 rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 backdrop-blur-md sm:left-3 sm:top-3">
            {product.brand}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="mt-3 flex flex-1 flex-col justify-between px-1">
        <div>
          <h3 className="line-clamp-2 min-h-9 text-xs font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600 sm:min-h-10 sm:text-sm">
            {product.name}
          </h3>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              ₹{price.toLocaleString("en-IN")}
            </span>

            {Number(product.maxPrice) > price && (
              <p className="text-[10px] font-medium text-slate-400 sm:text-xs">
                Up to ₹{Number(product.maxPrice).toLocaleString("en-IN")}
              </p>
            )}
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-100 transition-colors duration-200 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
