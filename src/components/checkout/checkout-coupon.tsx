"use client";

import { useState } from "react";
import { Loader2, Tag, X, CheckCircle2 } from "lucide-react";

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
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Coupon Applied
              </p>

              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded-lg bg-slate-900 px-2 py-0.5 text-xs font-bold text-white tracking-wide">
                  {appliedCoupon.code}
                </span>

                <span className="text-xs text-slate-500">
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
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRemoving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
            Remove
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
          <span className="text-xs font-semibold text-slate-600 sm:text-sm">
            Applied Savings
          </span>

          <span className="text-sm font-bold text-emerald-600 sm:text-base">
            -₹{discount.toLocaleString("en-IN")}
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Tag className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Apply Coupon
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Have a promo code? Enter it below to save.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
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
          className="h-11 flex-1 rounded-xl border border-slate-200 px-3.5 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
        />

        <button
          type="button"
          onClick={handleApply}
          disabled={!code.trim() || isApplying}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          {isApplying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
