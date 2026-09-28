"use client";

import { useShippingMethods } from "@/hooks/shipping/use-shipping-methods";
import type { ShippingMethod } from "@/types/shipping";

interface CheckoutShippingSectionProps {
  subtotal: number;
  selectedMethodId?: string;
  onShippingSelect: (method: ShippingMethod) => void;
}

export function CheckoutShippingSection({
  subtotal,
  selectedMethodId,
  onShippingSelect,
}: CheckoutShippingSectionProps) {
  const {
    data: methods,
    isLoading,
    isError,
    refetch,
  } = useShippingMethods(subtotal);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Shipping Method</h2>

      <p className="mt-1 text-sm text-gray-500">
        Choose your preferred delivery option.
      </p>

      {isLoading && (
        <div className="mt-5 space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="mt-4">
          <p className="text-sm text-red-600">
            Unable to load shipping methods.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-lg border px-4 py-2 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && methods?.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">
          No shipping methods are available.
        </p>
      )}

      {!isLoading && !isError && methods && methods.length > 0 && (
        <div className="mt-5 space-y-3">
          {methods.map((method) => {
            const selected = selectedMethodId === method.id;

            return (
              <label
                key={method.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 transition ${
                  selected
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping-method"
                    value={method.id}
                    checked={selected}
                    onChange={() => onShippingSelect(method)}
                    className="mt-1 h-4 w-4 accent-black"
                  />

                  <div>
                    <p className="text-sm font-semibold">{method.name}</p>

                    <p className="mt-1 text-sm text-gray-500">
                      Estimated delivery: {method.estimatedDays} days
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-sm font-semibold">
                  {method.charge === 0
                    ? "Free"
                    : `₹${method.charge.toLocaleString("en-IN")}`}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </section>
  );
}
