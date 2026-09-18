"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useAddWishlist } from "@/hooks/wishlist/use-add-wishlist";
import { useRemoveWishlist } from "@/hooks/wishlist/use-remove-wishlist";
import { useWishlistStatus } from "@/hooks/wishlist/use-wishlist-status";
import { useWishlistStore } from "@/store/wishlist.store";

import type { Product } from "@/types/product";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  iconClassName?: string;
}

export function WishlistButton({
  product,
  className = "",
  iconClassName = "",
}: WishlistButtonProps) {
  const { data: currentUser } = useCurrentUser();
  const user = currentUser?.data;

  const addMutation = useAddWishlist();
  const removeMutation = useRemoveWishlist();

  const addGuestItem = useWishlistStore((state) => state.addItem);
  const removeGuestItem = useWishlistStore((state) => state.removeItem);

  const { isWishlisted, isLoading } = useWishlistStatus(product.id);

  const isPending = addMutation.isPending || removeMutation.isPending;

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent navigating if wrapped near links
    e.preventDefault();
    e.stopPropagation();

    if (isPending || isLoading) return;

    if (!user) {
      if (isWishlisted) {
        removeGuestItem(product.id);
        toast.success("Removed from wishlist");
      } else {
        const primaryImage =
          product.productImages?.find((image) => image.isPrimary) ??
          product.productImages?.[0];

        addGuestItem({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand ?? null,
          image: primaryImage?.url ?? null,
          basePrice: product.basePrice,
          maxPrice: product.maxPrice,
          categoryName: product.category?.name ?? null,
        });

        toast.success("Added to wishlist");
      }
      return;
    }

    if (isWishlisted) {
      removeMutation.mutate(product.id, {
        onSuccess: () => toast.success("Removed from wishlist"),
      });
      return;
    }

    addMutation.mutate(
      { productId: product.id },
      { onSuccess: () => toast.success("Added to wishlist") },
    );
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending || isLoading}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-600 backdrop-blur-md shadow-xs transition-all duration-200 hover:scale-110 hover:border-slate-300 hover:bg-white hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          isWishlisted ? "fill-red-500 text-red-500" : ""
        } ${iconClassName}`}
      />
    </button>
  );
}
