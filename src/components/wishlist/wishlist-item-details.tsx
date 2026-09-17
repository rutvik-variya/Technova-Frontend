import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";

import type { WishlistItem as WishlistItemType } from "@/types/wishlist";
import { ROUTES } from "@/constants/routes";
import { useRemoveWishlist } from "@/hooks/wishlist/use-remove-wishlist";

interface WishlistItemDetailsProps {
  item: WishlistItemType;
}

export function WishlistItemDetails({ item }: WishlistItemDetailsProps) {
  const removeMutation = useRemoveWishlist();

  const product = item.product;

  return (
    <div className="mt-4">
      {product.brand && (
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
      )}

      <Link href={`${ROUTES.PRODUCTS}/${product.slug}`} className="mt-1 block">
        <h2 className="line-clamp-2 text-base font-semibold transition hover:text-primary">
          {product.name}
        </h2>
      </Link>

      <div className="mt-2 flex items-center gap-2">
        <span className="font-bold">₹{product.basePrice}</span>

        {String(product.maxPrice) !== String(product.basePrice) && (
          <span className="text-sm text-muted-foreground">
            – ₹{product.maxPrice}
          </span>
        )}
      </div>

      {product.category && (
        <p className="mt-1 text-xs text-muted-foreground">
          {product.category.name}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <Link
          href={`${ROUTES.PRODUCTS}/${product.slug}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <ShoppingBag className="h-4 w-4" />
          View Product
        </Link>

        <button
          type="button"
          onClick={() => removeMutation.mutate(product.id)}
          disabled={removeMutation.isPending}
          aria-label={`Remove ${product.name} from wishlist`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border text-muted-foreground transition hover:border-destructive hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
