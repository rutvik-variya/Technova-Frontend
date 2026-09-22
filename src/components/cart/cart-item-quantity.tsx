"use client";

import { Minus, Plus } from "lucide-react";

import { useUpdateCart } from "@/hooks/cart/use-update-cart";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

interface CartItemQuantityProps {
  itemId: string;
  variantId: string;
  quantity: number;
  stock: number;
}

export function CartItemQuantity({
  itemId,
  variantId,
  quantity,
  stock,
}: CartItemQuantityProps) {
  const updateCartMutation = useUpdateCart();

  const { data } = useCurrentUser();
  const user = data?.data;

  const isAuthenticated = Boolean(user);

  const isUpdating = updateCartMutation.isPending;

  const decreaseQuantity = () => {
    if (quantity <= 1 || isUpdating) {
      return;
    }

    updateCartMutation.mutate({
      itemId,
      variantId,
      quantity: quantity - 1,
      isAuthenticated,
    });
  };

  const increaseQuantity = () => {
    if (quantity >= stock || isUpdating) {
      return;
    }

    updateCartMutation.mutate({
      itemId,
      variantId,
      quantity: quantity + 1,
      isAuthenticated,
    });
  };

  return (
    <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-1">
      <button
        type="button"
        onClick={decreaseQuantity}
        disabled={quantity <= 1 || isUpdating}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <div className="flex h-7 min-w-8 items-center justify-center px-2 text-xs font-bold text-slate-900">
        {isUpdating ? "..." : quantity}
      </div>

      <button
        type="button"
        onClick={increaseQuantity}
        disabled={quantity >= stock || isUpdating}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
