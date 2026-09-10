"use client";

import { Heart } from "lucide-react";

import { useToggleWishlist } from "@/hooks/use-toggle-wishlist";

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const wishlistMutation = useToggleWishlist();

  const handleWishlist = () => {
    if (wishlistMutation.isPending) {
      return;
    }

    wishlistMutation.mutate({
      productId,
    });
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={wishlistMutation.isPending}
      aria-label="Add to wishlist"
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Heart className="h-5 w-5" />

      {wishlistMutation.isPending ? "Adding..." : "Add to Wishlist"}
    </button>
  );
}
