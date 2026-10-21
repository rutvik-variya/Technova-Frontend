"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, TicketPercent, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import AdminCouponForm from "@/components/admin/coupons/AdminCouponForm";
import {
  useAdminCouponById,
  useUpdateAdminCoupon,
} from "@/hooks/admin/useAdminCoupons";

import type { UpdateAdminCouponPayload } from "@/types/admin-coupon.types";

export default function EditAdminCouponPage() {
  const params = useParams<{ couponId: string }>();
  const couponId = params.couponId;
  const router = useRouter();

  const couponQuery = useAdminCouponById(couponId);
  const updateCoupon = useUpdateAdminCoupon();

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (payload: UpdateAdminCouponPayload) => {
    setSubmitError(null);

    try {
      await updateCoupon.mutateAsync({ couponId, payload });
      toast.success("Coupon updated successfully!");
      router.push("/admin/coupons");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to update coupon. Please try again.",
      );
    }
  };

  if (couponQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-4xl animate-pulse space-y-8">
        <div className="flex items-center gap-2.5 border-b border-slate-200/80 pb-6">
          <div className="h-8 w-8 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-xl bg-slate-200" />
            <div className="h-4 w-64 rounded-lg bg-slate-100" />
          </div>
        </div>

        <div className="h-96 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-8" />
      </main>
    );
  }

  if (couponQuery.isError || !couponQuery.data) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h1 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Could Not Load Coupon
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            The coupon details could not be retrieved. The voucher may not exist
            or the request failed.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/admin/coupons"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Coupons</span>
            </Link>

            <button
              type="button"
              onClick={() => couponQuery.refetch()}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <Link
          href="/admin/coupons"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Coupons</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <TicketPercent className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Edit Coupon
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Update the settings and rules for{" "}
          <strong className="text-slate-900">{couponQuery.data.code}</strong>
        </p>
      </div>

      <AdminCouponForm
        initialCoupon={couponQuery.data}
        isSubmitting={updateCoupon.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
