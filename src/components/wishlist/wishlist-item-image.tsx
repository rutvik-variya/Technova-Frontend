import Link from "next/link";
import { Heart } from "lucide-react";

import type { WishlistProduct } from "@/types/wishlist";
import { ROUTES } from "@/constants/routes";

interface WishlistItemImageProps {
  product: WishlistProduct;
}

export function WishlistItemImage({ product }: WishlistItemImageProps) {
  return (
    <Link href={`${ROUTES.PRODUCTS}/${product.slug}`} className="block">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-muted">
        <Heart className="h-12 w-12 text-muted-foreground/40" />
      </div>
    </Link>
  );
}
