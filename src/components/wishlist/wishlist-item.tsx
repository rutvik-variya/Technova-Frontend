import type { WishlistItem as WishlistItemType } from "@/types/wishlist";

import { WishlistItemImage } from "./wishlist-item-image";
import { WishlistItemDetails } from "./wishlist-item-details";

interface WishlistItemProps {
  item: WishlistItemType;
}

export function WishlistItem({ item }: WishlistItemProps) {
  return (
    <article className="rounded-2xl border bg-background p-4 transition hover:shadow-sm">
      <WishlistItemImage product={item.product} />

      <WishlistItemDetails item={item} />
    </article>
  );
}
