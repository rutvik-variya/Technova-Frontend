"use client";

import Link from "next/link";
import { WishlistGrid } from "./wishlist-grid";
import { WishlistSkeleton } from "./wishlist-skeleton";
import { Heart, ShoppingBag } from "lucide-react";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useWishlist } from "@/hooks/wishlist/use-wishlist";

import { ROUTES } from "@/constants/routes";

export function WishlistPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const user = currentUser?.data;

  const {
    data: wishlist,
    isLoading: isWishlistLoading,
    isError,
    refetch,
  } = useWishlist();

  if (isUserLoading || isWishlistLoading) {
    return <WishlistSkeleton />;
  }

  if (!user) {
    return (
      <section className="container py-12 sm:py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl border bg-background p-8 text-center sm:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Heart className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight">
            Your Wishlist
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Sign in to view and manage your wishlist.
          </p>

          <Link
            href={ROUTES.LOGIN}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <ShoppingBag className="h-4 w-4" />
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container py-10 sm:py-12">
        <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border bg-background p-6 text-center">
          <h2 className="text-lg font-semibold">Failed to load wishlist</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading your wishlist.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <section className="container py-12 sm:py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl border bg-background p-8 text-center sm:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Heart className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight">
            Your Wishlist is Empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Save products you love and find them here whenever you want.
          </p>

          <Link
            href={ROUTES.PRODUCTS}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-8 sm:py-10 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          My Wishlist
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      <WishlistGrid wishlist={wishlist} />
    </section>
  );
}
