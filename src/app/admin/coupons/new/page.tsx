"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TicketPercent } from "lucide-react";
import { toast } from "sonner";

import AdminCouponForm from "@/components/admin/coupons/AdminCouponForm";
import { useCreateAdminCoupon } from "@/hooks/admin/useAdminCoupons";
import type { CreateAdminCouponPayload } from "@/types/admin-coupon.types";

export default function NewAdminCouponPage() {
  const router = useRouter();
  const createCoupon = useCreateAdminCoupon();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (payload: CreateAdminCouponPayload) => {
    setSubmitError(null);
    try {
      await createCoupon.mutateAsync(payload);
      toast.success("Coupon created successfully!");
      router.push("/admin/coupons");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create coupon. Please try again.",
      );
    }
  };

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
            Create Coupon
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Configure discount values, eligibility minimums, usage limits, and
          active dates
        </p>
      </div>

      <AdminCouponForm
        isSubmitting={createCoupon.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
