"use client";

import { useRouter } from "next/navigation";
import { Truck, Clock, IndianRupee, Pencil, PackageCheck } from "lucide-react";

import type { AdminShippingMethod } from "@/types/admin-shipping";

interface AdminShippingCardProps {
  method: AdminShippingMethod;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function AdminShippingCard({ method }: AdminShippingCardProps) {
  const router = useRouter();

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6">
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <Truck className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              {method.name}
            </h2>
            <p className="mt-0.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              {method.method}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold tracking-tight ${
            method.isActive
              ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-slate-100 text-slate-600"
          }`}
        >
          {method.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <IndianRupee className="h-4 w-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Base Charge
            </span>
          </div>
          <p className="mt-2 text-lg font-extrabold text-slate-900">
            {formatCurrency(method.baseCharge)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <PackageCheck className="h-4 w-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Free Shipping Above
            </span>
          </div>
          <p className="mt-2 text-lg font-extrabold text-slate-900">
            {formatCurrency(method.freeShippingAbove)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:col-span-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-4 w-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Estimated Delivery Time
            </span>
          </div>
          <p className="mt-2 text-lg font-extrabold text-slate-900">
            {method.estimatedDays} {method.estimatedDays === 1 ? "day" : "days"}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 p-6">
        <button
          type="button"
          onClick={() => router.push(`/admin/shipping/${method.method}`)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Pencil className="h-4 w-4" />
          <span>Edit Shipping Method</span>
        </button>
      </div>
    </article>
  );
}
