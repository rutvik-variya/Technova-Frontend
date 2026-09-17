import type { WishlistResponse } from "@/types/wishlist";

import { WishlistItem } from "./wishlist-item";

interface WishlistGridProps {
  wishlist: WishlistResponse;
}

export function WishlistGrid({ wishlist }: WishlistGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wishlist.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
}
