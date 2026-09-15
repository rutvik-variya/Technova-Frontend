import type { Cart } from "@/types/cart";

interface CartSummaryProps {
  cart: Cart;
}

const formatPrice = (price: string | number) => {
  return Number(price).toLocaleString("en-IN");
};

export function CartSummary({ cart }: CartSummaryProps) {
  return (
    <aside className="rounded-xl border bg-card p-5 sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Items</span>

          <span className="font-medium">{cart.totalItem}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>

          <span className="font-medium">₹{formatPrice(cart.subtotal)}</span>
        </div>
      </div>

      <div className="my-5 border-t" />

      <div className="flex items-center justify-between">
        <span className="font-semibold">Total</span>

        <span className="text-xl font-bold">₹{formatPrice(cart.subtotal)}</span>
      </div>

      {/* Checkout will be enabled in Step 12 */}
      <button
        type="button"
        disabled
        className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground opacity-50"
      >
        Proceed to Checkout
      </button>
    </aside>
  );
}
