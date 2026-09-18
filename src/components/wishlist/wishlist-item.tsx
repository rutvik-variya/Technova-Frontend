import type { WishlistItem as WishlistItemType } from "@/types/wishlist";
import { WishlistItemImage } from "./wishlist-item-image";
import { WishlistItemDetails } from "./wishlist-item-details";

interface WishlistItemProps {
  item: WishlistItemType;
}

export function WishlistItem({ item }: WishlistItemProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-blue-600/30 hover:shadow-lg hover:shadow-slate-200/50 flex flex-col justify-between">
      <div>
        <WishlistItemImage product={item.product} />
        <WishlistItemDetails item={item} />
      </div>
    </article>
  );
}
