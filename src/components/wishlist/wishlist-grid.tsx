import type { WishlistResponse } from "@/types/wishlist";
import { WishlistItem } from "./wishlist-item";

interface WishlistGridProps {
  wishlist: WishlistResponse;
}

export function WishlistGrid({ wishlist }: WishlistGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wishlist.map((item) => (
        <WishlistItem key={item.product.id} item={item} />
      ))}
    </div>
  );
}
