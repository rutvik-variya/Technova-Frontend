"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface WishlistErrorProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function WishlistError({
  onRetry,
  isRetrying = false,
}: WishlistErrorProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/50 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
          Failed to Load Wishlist
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
          Something went wrong while retrieving your saved items. Please check
          your connection and try again.
        </p>

        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
          />
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>
      </div>
    </section>
  );
}
