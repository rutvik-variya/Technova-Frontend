import type { CartItem as CartItemType } from "@/types/cart";

import { CartItemDetails } from "./cart-item-details";
import { CartItemImage } from "./cart-item-image";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  return (
    <article className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex gap-4">
        <CartItemImage src={item.product.image} alt={item.product.name} />

        <CartItemDetails item={item} />
      </div>
    </article>
  );
}
