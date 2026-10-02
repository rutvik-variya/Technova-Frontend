"use client";

import type { CheckoutResponse } from "@/types/checkout";
import type { ShippingMethod } from "@/types/shipping";

interface CheckoutOrderSummaryProps {
  checkout?: CheckoutResponse;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
  couponDiscount: number;
  selectedShippingMethod: ShippingMethod | null;
}

export function CheckoutOrderSummary({
  checkout,
  isLoading,
  isFetching,
  isError,
  onRetry,
  couponDiscount,
  selectedShippingMethod,
}: CheckoutOrderSummaryProps) {
  // Skeleton Loader State
  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="animate-pulse space-y-5">
          <div className="flex items-center justify-between">
            <div className="h-6 w-32 rounded-lg bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-100" />
              </div>
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-100" />
              </div>
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex justify-between pt-1">
            <div className="h-6 w-20 rounded bg-gray-200" />
            <div className="h-6 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="w-full rounded-2xl border border-red-200 bg-red-50/70 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-red-900">
              Unable to prepare checkout
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-red-700">
              Please check your shipping address, cart items, and stock
              availability before trying again.
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-red-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-[0.98]"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty / No Checkout Data State
  if (!checkout) {
    return (
      <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900">Your order</h2>
        <p className="mt-2 text-sm text-gray-500">
          Select a shipping address to view order details and continue.
        </p>
      </div>
    );
  }

  const shippingCharge = selectedShippingMethod?.charge ?? 0;

  const total = Math.max(
    0,
    checkout.totals.subtotal - couponDiscount + shippingCharge,
  );

  return (
    <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {checkout.totals.totalItem}{" "}
            {checkout.totals.totalItem === 1 ? "item" : "items"}
          </span>
        </div>

        {isFetching && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-amber-500" />
            Updating...
          </span>
        )}
      </div>

      {/* Order Items */}
      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-1 my-2 scrollbar-thin">
        {checkout.items.map((item) => (
          <div
            key={item.id}
            className="py-3.5 flex items-start justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 leading-snug">
                {item.product.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                <span>
                  Qty:{" "}
                  <strong className="font-semibold text-gray-700">
                    {item.quantity}
                  </strong>
                </span>
                <span className="text-gray-300">•</span>
                <span className="font-mono text-gray-400">
                  SKU: {item.variant.sku}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-gray-900">
                ₹{Number(item.total).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4">
        {/* Price Breakdown */}
        <div className="space-y-2.5">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">
              ₹{checkout.totals.subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Coupon Discount */}
          {couponDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-green-700 font-medium">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Coupon discount
              </span>
              <span className="font-semibold text-green-600">
                -₹{couponDiscount.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">
              {!selectedShippingMethod ? (
                <span className="text-xs text-amber-600 font-normal bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  Select a method
                </span>
              ) : shippingCharge === 0 ? (
                <span className="text-green-600 font-semibold">Free</span>
              ) : (
                `₹${shippingCharge.toLocaleString("en-IN")}`
              )}
            </span>
          </div>
        </div>

        {/* Total Divider */}
        <div className="my-4 border-t border-dashed border-gray-200" />

        {/* Total */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-base font-semibold text-gray-900">Total</span>
            <p className="text-xs text-gray-500 font-normal">Including taxes</p>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}
