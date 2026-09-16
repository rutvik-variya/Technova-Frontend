import type { CartItem as CartItemType } from "@/types/cart";
import { CartItemImage } from "./cart-item-image";
import { CartItemDetails } from "./cart-item-details";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-blue-600/30 hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex gap-4 sm:gap-6">
        <CartItemImage src={item.product.image} alt={item.product.name} />
        <CartItemDetails item={item} />
      </div>
    </article>
  );
}
