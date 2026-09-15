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
    <div className="min-w-0 flex-1">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          {product.brand && (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </p>
          )}

          <Link
            href={`${ROUTES.PRODUCTS}/${product.slug}`}
            className="mt-1 block line-clamp-2 text-sm font-semibold transition hover:underline sm:text-base"
          >
            {product.name}
          </Link>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {variant.ram && <span>RAM: {variant.ram}</span>}

            {variant.storage && <span>Storage: {variant.storage}</span>}

            {variant.color && <span>Color: {variant.color}</span>}
          </div>
        </div>

        <p className="shrink-0 text-base font-semibold">
          ₹{productPrice.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <CartItemQuantity
          itemId={item.id}
          quantity={item.quantity}
          stock={variant.stock}
        />

        <button
          type="button"
          onClick={handleRemove}
          disabled={removeMutation.isPending}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />

          {removeMutation.isPending ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
