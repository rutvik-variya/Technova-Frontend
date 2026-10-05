"use client";

import { Truck, AlertCircle, RefreshCw } from "lucide-react";
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
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all sm:p-6 md:p-7">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold tracking-wider text-slate-700">
          02
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Shipping Method
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Choose your preferred delivery velocity and carrier options.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-red-200/80 bg-red-50/50 p-5 text-red-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <p className="text-sm font-medium">Unable to load shipping methods.</p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:underline"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && methods?.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs font-medium text-slate-500 sm:text-sm">
          No shipping methods are currently available for this area.
        </p>
      )}

      {!isLoading && !isError && methods && methods.length > 0 && (
        <div className="mt-6 space-y-3">
          {methods.map((method) => {
            const selected = selectedMethodId === method.id;

            return (
              <label
                key={method.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                  selected
                    ? "border-slate-900 bg-slate-900/2 ring-1 ring-slate-900 shadow-xs"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="radio"
                    name="shipping-method"
                    value={method.id}
                    checked={selected}
                    onChange={() => onShippingSelect(method)}
                    className="h-4 w-4 accent-slate-900 focus:ring-slate-900"
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-900 sm:text-base">
                      {method.name}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <Truck className="h-3.5 w-3.5 text-slate-400" />
                      <span>Estimated delivery: {method.estimatedDays} days</span>
                    </div>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-900 sm:text-sm">
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