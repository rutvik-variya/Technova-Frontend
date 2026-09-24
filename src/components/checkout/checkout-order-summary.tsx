"use client";

import type { CheckoutResponse } from "@/types/checkout";

interface CheckoutOrderSummaryProps {
  checkout?: CheckoutResponse;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
  couponDiscount: number;
}

export function CheckoutOrderSummary({
  checkout,
  isLoading,
  isFetching,
  isError,
  onRetry,
  couponDiscount,
}: CheckoutOrderSummaryProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 rounded bg-gray-200" />

          <div className="h-16 rounded bg-gray-100" />

          <div className="h-16 rounded bg-gray-100" />

          <div className="h-px bg-gray-200" />

          <div className="h-6 w-40 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-900">
          Unable to prepare checkout
        </h2>

        <p className="mt-2 text-sm text-red-700">
          Please check your address, cart, and stock before trying again.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!checkout) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Your order</h2>

        <p className="mt-2 text-sm text-gray-500">
          Select a shipping address to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your order</h2>

        {isFetching && (
          <span className="text-xs text-gray-500">Updating...</span>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {checkout.items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {item.product.name}
              </p>

              <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>

              <p className="mt-1 text-xs text-gray-500">
                SKU: {item.variant.sku}
              </p>
            </div>

            <p className="shrink-0 text-sm font-medium text-gray-900">
              ₹{Number(item.total).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <div className="my-6 h-px bg-gray-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Items</span>

        <span className="text-sm font-medium text-gray-900">
          {checkout.totals.totalItem}
        </span>
      </div>

      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>

          <span className="text-sm font-medium text-gray-900">
            ₹{checkout.totals.subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Coupon discount</span>

            <span className="text-sm font-medium text-green-600">
              -₹{couponDiscount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        <div className="h-px bg-gray-200" />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">Total</span>

          <span className="text-lg font-semibold text-gray-900">
            ₹
            {(checkout.totals.subtotal - couponDiscount).toLocaleString(
              "en-IN",
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
