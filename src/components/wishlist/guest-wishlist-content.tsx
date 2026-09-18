"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight, Info } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { useWishlistStore } from "@/store/wishlist.store";

export function GuestWishlistContent() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clear = useWishlistStore((state) => state.clear);

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center sm:p-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-slate-200 text-rose-500 shadow-sm">
            <Heart className="h-8 w-8 fill-current" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Your Wishlist is Empty
          </h1>

          <p className="mt-2 max-w-md text-sm font-medium text-slate-500 leading-relaxed">
            Save products you love and find them here whenever you are ready to
            build your ideal TechNova setup.
          </p>

          <Link
            href={ROUTES.PRODUCTS}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.99]"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <Heart className="h-4 w-4 fill-current" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              My Wishlist
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {items.length} {items.length === 1 ? "item" : "items"} saved on this
            device
          </p>
        </div>

        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear Wishlist
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.productId}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-blue-600/30 hover:shadow-lg hover:shadow-slate-200/50 flex flex-col justify-between"
          >
            <div>
              <Link href={`${ROUTES.PRODUCTS}/${item.slug}`} className="block">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Heart className="h-12 w-12 text-slate-300" />
                  )}
                </div>
              </Link>

              <div className="mt-4">
                {item.brand && (
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {item.brand}
                  </span>
                )}

                <Link
                  href={`${ROUTES.PRODUCTS}/${item.slug}`}
                  className="mt-1 block"
                >
                  <h2 className="line-clamp-2 text-sm font-bold text-slate-900 transition hover:text-blue-600 sm:text-base">
                    {item.name}
                  </h2>
                </Link>

                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-slate-900 sm:text-lg">
                    ₹{Number(item.basePrice).toLocaleString("en-IN")}
                  </span>

                  {String(item.maxPrice) !== String(item.basePrice) && (
                    <span className="text-xs font-semibold text-slate-400">
                      – ₹{Number(item.maxPrice).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {item.categoryName && (
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {item.categoryName}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-3">
              <Link
                href={`${ROUTES.PRODUCTS}/${item.slug}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-2.5 px-3 text-xs font-bold text-white transition hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 active:scale-[0.98]"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                View Product
              </Link>

              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                aria-label={`Remove ${item.name} from wishlist`}
                className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
