"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import type { CartItem } from "@/types/cart";

import { CartItemQuantity } from "./cart-item-quantity";
import { useRemoveCartItem } from "@/hooks/cart/use-remove-cart-item";

interface CartItemDetailsProps {
  item: CartItem;
}

export function CartItemDetails({ item }: CartItemDetailsProps) {
  const removeMutation = useRemoveCartItem();
  const { product, variant } = item;
  const productPrice = Number(item.priceAtAdded);

  const handleRemove = () => {
    removeMutation.mutate(item.id);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col justify-between">
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 pr-2">
            {product.brand && (
              <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {product.brand}
              </span>
            )}

            <Link
              href={`${ROUTES.PRODUCTS}/${product.slug}`}
              className="mt-1 block line-clamp-2 text-sm font-bold text-slate-900 transition hover:text-blue-600 sm:text-base"
            >
              {product.name}
            </Link>
          </div>

          <p className="mt-1 shrink-0 text-base font-extrabold text-slate-900 sm:mt-0 sm:text-lg">
            ₹{productPrice.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Variant Specs Badges */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {variant.ram && (
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              RAM: {variant.ram}
            </span>
          )}
          {variant.storage && (
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              Storage: {variant.storage}
            </span>
          )}
          {variant.color && (
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              Color: {variant.color}
            </span>
          )}
        </div>
      </div>

      {/* Footer Controls: Quantity Adjuster + Remove Button */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <CartItemQuantity
          itemId={item.id}
          quantity={item.quantity}
          stock={variant.stock}
        />

        <button
          type="button"
          onClick={handleRemove}
          disabled={removeMutation.isPending}
          className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          {removeMutation.isPending ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
