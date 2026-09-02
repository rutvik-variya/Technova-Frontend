import Image from "next/image";
import { Product } from "@/types/product";
import { Heart, ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        key={product.id}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
      >
        {/* Product Badge */}
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
            -15% OFF
          </span>
        </div>

        {/* Wishlist Quick Action */}
        <button
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-slate-600 backdrop-blur-sm transition hover:bg-white hover:text-red-500"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Product Image Placeholder */}
        <div className="relative aspect-square w-full bg-slate-100 flex items-center justify-center group-hover:scale-105 transition duration-300">
          {product.images?.[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              sizes="56px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-5xl">📦</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <span className="text-xs font-semibold text-slate-700">4.8</span>
            <span className="text-xs text-slate-400">(42)</span>
          </div>

          <h3 className="mt-2 text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
            {product.name}
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 line-through">
                ₹99,999
              </span>
              <p className="text-base font-extrabold text-slate-900">₹84,999</p>
            </div>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
              title="Add to Cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
