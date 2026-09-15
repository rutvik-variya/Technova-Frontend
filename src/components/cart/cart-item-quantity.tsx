"use client";

import { useUpdateCart } from "@/hooks/cart/use-update-cart";
import { Minus, Plus } from "lucide-react";

interface CartItemQuantityProps {
  itemId: string;
  quantity: number;
  stock: number;
}

export function CartItemQuantity({
  itemId,
  quantity,
  stock,
}: CartItemQuantityProps) {
  const updateCartMutation = useUpdateCart();

  const isUpdating = updateCartMutation.isPending;

  const decreaseQuantity = () => {
    if (quantity <= 1 || isUpdating) {
      return;
    }

    updateCartMutation.mutate({
      itemId,
      payload: {
        quantity: quantity - 1,
      },
    });
  };

  const increaseQuantity = () => {
    if (quantity >= stock || isUpdating) {
      return;
    }

    updateCartMutation.mutate({
      itemId,
      payload: {
        quantity: quantity + 1,
      },
    });
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={decreaseQuantity}
        disabled={quantity <= 1 || isUpdating}
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center rounded-l-lg border bg-background transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="flex h-9 min-w-10 items-center justify-center border-y bg-background px-3 text-sm font-medium">
        {isUpdating ? "..." : quantity}
      </div>

      <button
        type="button"
        onClick={increaseQuantity}
        disabled={quantity >= stock || isUpdating}
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center rounded-r-lg border bg-background transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
