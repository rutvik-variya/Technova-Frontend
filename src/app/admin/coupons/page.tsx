"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Plus,
  RefreshCw,
  TicketPercent,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import AdminCouponsTable from "@/components/admin/coupons/AdminCouponsTable";
import AdminCouponsPagination from "@/components/admin/coupons/AdminCouponsPagination";
import {
  useAdminCoupons,
  useDeactivateAdminCoupon,
} from "@/hooks/admin/useAdminCoupons";

import type {
  AdminCoupon,
  AdminCouponListParams,
} from "@/types/admin-coupon.types";

export default function AdminCouponsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const params: AdminCouponListParams = { page, limit };

  const couponsQuery = useAdminCoupons(params);
  const deactivateCoupon = useDeactivateAdminCoupon();

  const coupons = couponsQuery.data?.coupons ?? [];
  const pagination = couponsQuery.data?.pagination;

  const [couponToDeactivate, setCouponToDeactivate] =
    useState<AdminCoupon | null>(null);
  const [deactivateError, setDeactivateError] = useState<string | null>(null);

  const handleDeactivate = async () => {
    if (!couponToDeactivate) return;

    setDeactivateError(null);

    try {
      await deactivateCoupon.mutateAsync(couponToDeactivate.id);
      setCouponToDeactivate(null);

      if (coupons.length === 1 && page > 1) {
        setPage((current) => current - 1);
      }
    } catch (error) {
      setDeactivateError(
        error instanceof Error
          ? error.message
          : "Failed to deactivate coupon. Please try again.",
      );
    }
  };

  return (
    <main className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <TicketPercent className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Coupons Management
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Create, configure, and manage promotional discount vouchers for your
            store
          </p>
        </div>

        <Link
          href="/admin/coupons/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Create Coupon</span>
        </Link>
      </div>

      {/* Loading Skeleton */}
      {couponsQuery.isPending && (
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs animate-pulse">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded-xl bg-slate-200" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b border-slate-100 py-3"
              >
                <div className="space-y-1">
                  <div className="h-4 w-32 rounded-lg bg-slate-200" />
                  <div className="h-3 w-48 rounded-md bg-slate-100" />
                </div>
                <div className="h-4 w-16 rounded-lg bg-slate-200" />
                <div className="h-4 w-20 rounded-lg bg-slate-100" />
                <div className="h-4 w-24 rounded-lg bg-slate-100" />
                <div className="h-6 w-16 rounded-full bg-slate-200" />
                <div className="h-8 w-20 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {couponsQuery.isError && (
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Could Not Load Coupons
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            Check your network connection and try again.
          </p>

          <button
            type="button"
            onClick={() => couponsQuery.refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Main Content Table & Pagination */}
      {!couponsQuery.isPending && !couponsQuery.isError && (
        <div className="space-y-4">
          <AdminCouponsTable
            coupons={coupons}
            isDeactivating={deactivateCoupon.isPending}
            onDeactivate={(coupon) => {
              setDeactivateError(null);
              setCouponToDeactivate(coupon);
            }}
          />

          {pagination && (
            <AdminCouponsPagination
              pagination={pagination}
              onPageChange={setPage}
            />
          )}
        </div>
      )}

      {/* Deactivate Modal */}
      {couponToDeactivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget &&
                !deactivateCoupon.isPending
              ) {
                setCouponToDeactivate(null);
                setDeactivateError(null);
              }
            }}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deactivate-coupon-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => {
                setCouponToDeactivate(null);
                setDeactivateError(null);
                deactivateCoupon.reset();
              }}
              disabled={deactivateCoupon.isPending}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 shadow-xs">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <h3
                id="deactivate-coupon-title"
                className="text-lg font-bold text-slate-900"
              >
                Deactivate Coupon?
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Are you sure you want to deactivate{" "}
                <strong className="text-slate-900">
                  {couponToDeactivate.code}
                </strong>
                ? The coupon will remain recorded in your system with an
                INACTIVE status.
              </p>

              {deactivateError && (
                <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs font-semibold text-rose-700 w-full">
                  {deactivateError}
                </div>
              )}

              <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  disabled={deactivateCoupon.isPending}
                  onClick={() => {
                    setCouponToDeactivate(null);
                    setDeactivateError(null);
                    deactivateCoupon.reset();
                  }}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 sm:w-1/2"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deactivateCoupon.isPending}
                  onClick={handleDeactivate}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-xs font-bold text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                >
                  {deactivateCoupon.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deactivating...</span>
                    </>
                  ) : (
                    <span>Confirm Deactivation</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
