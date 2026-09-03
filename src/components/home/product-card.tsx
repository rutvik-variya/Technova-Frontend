"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Laptop } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage =
    product.productImages?.find((img) => img.isPrimary)?.url ||
    product.productImages?.[0]?.url;
  const displayPrice = product.productVariants?.[0]?.price || product.basePrice;

  const productVariants = product.productVariants ?? [];
  const isOutOfStock =
    productVariants.length > 0 && productVariants.every((v) => v.stock === 0);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(displayPrice));

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50">
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        {product.brand && (
          <span className="rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
            {product.brand}
          </span>
        )}
        {isOutOfStock && (
          <span className="rounded-md bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
            Sold Out
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-red-500 hover:shadow-sm"
        aria-label="Add to wishlist"
      >
        <Heart className="h-4 w-4" />
      </button>

      {/* Image Preview Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-slate-50 flex items-center justify-center p-6"
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-slate-300">
            <Laptop className="h-12 w-12" />
            <span className="text-xs font-medium text-slate-400">No Image</span>
          </div>
        )}
      </Link>

      {/* Content Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
          <span>{product.category?.name}</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 text-sm font-bold text-slate-900 line-clamp-1 transition-colors duration-200 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">
              Starting from
            </span>
            <p className="text-base font-black text-slate-900">
              {Number(displayPrice) > 0 ? formattedPrice : "Contact for Price"}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/products/${product.slug}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100"
              title="Quick View"
            >
              <Eye className="h-4 w-4" />
            </Link>

            <button
              disabled={isOutOfStock}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:hover:bg-blue-50 disabled:hover:text-blue-600"
              title="Add to Cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
