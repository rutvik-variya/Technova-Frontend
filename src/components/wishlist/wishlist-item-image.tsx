import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

import type { WishlistProduct } from "@/types/wishlist";
import { ROUTES } from "@/constants/routes";

interface WishlistItemImageProps {
  product: WishlistProduct;
}

export function WishlistItemImage({ product }: WishlistItemImageProps) {
  const imageUrl = product.productUrl ?? null;

  return (
    <Link href={`${ROUTES.PRODUCTS}/${product.slug}`} className="block">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Heart className="h-12 w-12 text-slate-300 transition-transform group-hover:scale-110" />
        )}
      </div>
    </Link>
  );
}
