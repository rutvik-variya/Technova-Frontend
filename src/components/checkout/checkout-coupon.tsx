"use client";

import { useState } from "react";
import { Loader2, Tag, X } from "lucide-react";

import { useApplyCoupon } from "@/hooks/coupon/use-apply-coupon";
import { useRemoveCoupon } from "@/hooks/coupon/use-remove-coupon";

interface AppliedCoupon {
  id: string;
  code: string;
  type: "FIXED" | "PERCENTAGE";
}

interface CheckoutCouponProps {
  appliedCoupon: AppliedCoupon | null;
  discount: number;
  onCouponApplied: (data: {
    coupon: AppliedCoupon;
    discount: number;
    total: number;
  }) => void;
  onCouponRemoved: () => void;
}

export default function CheckoutCoupon({
  appliedCoupon,
  discount,
  onCouponApplied,
  onCouponRemoved,
}: CheckoutCouponProps) {
  const [code, setCode] = useState("");

  const applyCouponMutation = useApplyCoupon();
  const removeCouponMutation = useRemoveCoupon();

  const handleApply = () => {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      return;
    }

    applyCouponMutation.mutate(
      {
        code: trimmedCode,
      },
      {
        onSuccess: (response) => {
          onCouponApplied({
            coupon: response.data.coupon,
            discount: response.data.discount,
            total: response.data.total,
          });

          setCode("");
        },
      },
    );
  };

  const handleRemove = () => {
    removeCouponMutation.mutate(undefined, {
      onSuccess: () => {
        onCouponRemoved();
      },
    });
  };

  const isApplying = applyCouponMutation.isPending;
  const isRemoving = removeCouponMutation.isPending;

  if (appliedCoupon) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <Tag className="size-5 text-gray-700" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Coupon applied
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-900">
                  {appliedCoupon.code}
                </span>

                <span className="text-xs text-gray-500">
                  {appliedCoupon.type === "PERCENTAGE"
                    ? "Percentage discount"
                    : "Fixed discount"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            disabled={isRemoving}
            className="flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRemoving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <X className="size-4" />
            )}
            Remove
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-sm text-gray-600">Coupon discount</span>

          <span className="text-sm font-semibold text-green-600">
            -₹{discount.toLocaleString("en-IN")}
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
          <Tag className="size-5 text-gray-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">Apply coupon</h2>

          <p className="mt-1 text-sm text-gray-500">
            Have a coupon code? Apply it here.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleApply();
            }
          }}
          placeholder="Enter coupon code"
          disabled={isApplying}
          className="h-11 flex-1 rounded-lg border border-gray-300 px-3 text-sm uppercase outline-none transition placeholder:normal-case focus:border-gray-900"
        />

        <button
          type="button"
          onClick={handleApply}
          disabled={!code.trim() || isApplying}
          className="flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isApplying ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Applying...
            </>
          ) : (
            "Apply"
          )}
        </button>
      </div>
    </section>
  );
}
