"use client";

import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";

import type { WishlistItem as WishlistItemType } from "@/types/wishlist";
import { ROUTES } from "@/constants/routes";
import { useRemoveWishlist } from "@/hooks/wishlist/use-remove-wishlist";
import { useMoveWishlistToCart } from "@/hooks/wishlist/use-move-wishlist-to-cart";

interface WishlistItemDetailsProps {
  item: WishlistItemType;
}

export function WishlistItemDetails({ item }: WishlistItemDetailsProps) {
  const removeMutation = useRemoveWishlist();
  const moveMutation = useMoveWishlistToCart();
  const product = item.product;

  return (
    <div className="mt-4 flex flex-1 flex-col justify-between">
      <div>
        {product.brand && (
          <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            {product.brand}
          </span>
        )}

        <Link
          href={`${ROUTES.PRODUCTS}/${product.slug}`}
          className="mt-1 block"
        >
          <h2 className="line-clamp-2 text-sm font-bold text-slate-900 transition hover:text-blue-600 sm:text-base">
            {product.name}
          </h2>
        </Link>

        {product.category && (
          <p className="mt-1 text-xs font-medium text-slate-400">
            {product.category.name}
          </p>
        )}

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-base font-extrabold text-slate-900 sm:text-lg">
            ₹{Number(product.basePrice).toLocaleString("en-IN")}
          </span>

          {String(product.maxPrice) !== String(product.basePrice) && (
            <span className="text-xs font-semibold text-slate-400">
              – ₹{Number(product.maxPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => moveMutation.mutate(product.id)}
          disabled={moveMutation.isPending}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-2.5 px-3 text-xs font-bold text-white transition hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {moveMutation.isPending ? "Adding..." : "Add to Cart"}
        </button>

        <button
          type="button"
          onClick={() => removeMutation.mutate(product.id)}
          disabled={removeMutation.isPending || moveMutation.isPending}
          aria-label={`Remove ${product.name} from wishlist`}
          className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
