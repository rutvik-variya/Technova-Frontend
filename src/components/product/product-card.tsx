"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, Laptop, Loader2 } from "lucide-react";
import type { Product } from "@/types/product";
import { WishlistButton } from "./details/wishlist-button";
import { useAddToCart } from "@/hooks/cart/use-add-to-cart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCartMutation = useAddToCart();

  const primaryImage =
    product.productImages?.find((img) => img.isPrimary)?.url ??
    product.productImages?.[0]?.url ??
    null;

  const productVariants = product.productVariants ?? [];

  const availableVariant =
    productVariants.find((variant) => (variant.stock ?? 0) > 0) ??
    productVariants[0];

  const minVariantPrice =
    productVariants.length > 0
      ? Math.min(
          ...productVariants.map(
            (variant) => Number(variant.price) || Infinity,
          ),
        )
      : null;

  const rawPrice =
    minVariantPrice !== null && minVariantPrice !== Infinity
      ? minVariantPrice
      : Number(product.basePrice);

  const isOutOfStock =
    productVariants.length > 0 &&
    productVariants.every((variant) => (variant.stock ?? 0) <= 0);

  const canAddToCart =
    Boolean(availableVariant) && !isOutOfStock && !addToCartMutation.isPending;

  const formattedPrice =
    !Number.isNaN(rawPrice) && rawPrice > 0
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(rawPrice)
      : null;

  const handleAddToCart = () => {
    if (!canAddToCart || !availableVariant) {
      return;
    }

    const stock = availableVariant.stock ?? 0;

    addToCartMutation.mutate({
      isAuthenticated: false,
      payload: {
        productId: product.id,
        variantId: availableVariant.id,
        quantity: 1,
      },

      optimisticItem: {
        productId: product.id,
        variantId: availableVariant.id,
        quantity: 1,

        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          brand: product.brand ?? null,
          status: product.status ?? "",
          basePrice: String(product.basePrice ?? 0),
          maxPrice: String(product.maxPrice ?? 0),

          image: primaryImage,
        },

        variant: {
          id: availableVariant.id,
          productId: product.id,
          sku: availableVariant.sku ?? "",
          ram: availableVariant.ram ?? null,
          storage: availableVariant.storage ?? null,
          color: availableVariant.color ?? null,
          price: String(availableVariant.price ?? 0),
          comparePrice: "0",
          stock,
          isActive: availableVariant.isActive ?? true,
        },
      },
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.brand && (
            <span className="rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
              {product.brand}
            </span>
          )}

          {isOutOfStock && (
            <span className="rounded-md bg-red-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
              Sold Out
            </span>
          )}
        </div>

        <WishlistButton product={product} />

        <Link
          href={`/products/${product.slug}`}
          className="flex h-full w-full items-center justify-center p-6"
        >
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-slate-300">
              <Laptop className="h-12 w-12" />

              <span className="text-xs font-medium text-slate-400">
                No Image
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          <span>{product.category?.name}</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-1 text-sm font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
          <div>
            <span className="block text-[10px] font-medium text-slate-400">
              Starting from
            </span>

            <p className="text-base font-black text-slate-900">
              {formattedPrice ?? "Contact for Price"}
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

            {/* Add To Cart */}

            <button
              type="button"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-50 disabled:hover:text-blue-600"
              title={isOutOfStock ? "Out of Stock" : "Add to Cart"}
              aria-label={isOutOfStock ? "Out of stock" : "Add product to cart"}
            >
              {addToCartMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
