"use client";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useWishlist } from "@/hooks/wishlist/use-wishlist";
import { Heart } from "lucide-react";

import { WishlistEmpty } from "./wishlist-empty";
import { WishlistError } from "./wishlist-error";
import { WishlistGrid } from "./wishlist-grid";
import { WishlistSkeleton } from "./wishlist-skeleton";
import { GuestWishlistContent } from "./guest-wishlist-content";

export function WishlistPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const user = currentUser?.data;

  const {
    data: wishlist,
    isLoading: isWishlistLoading,
    isFetching,
    isError,
    refetch,
  } = useWishlist();

  if (isUserLoading || (user && isWishlistLoading)) {
    return <WishlistSkeleton />;
  }

  if (!user) {
    return <GuestWishlistContent />;
  }

  if (isError) {
    return <WishlistError onRetry={() => refetch()} isRetrying={isFetching} />;
  }

  if (!wishlist?.length) {
    return <WishlistEmpty />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* TechNova Header */}
      <div className="mb-8 border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
            <Heart className="h-4 w-4 fill-current" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            My Wishlist
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for
          later
        </p>
      </div>

      <WishlistGrid wishlist={wishlist} />
    </section>
  );
}
