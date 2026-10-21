import Link from "next/link";
import { Pencil, Trash2, TicketPercent, Plus } from "lucide-react";

import type { AdminCoupon } from "@/types/admin-coupon.types";

interface AdminCouponsTableProps {
  coupons: AdminCoupon[];
  isDeactivating: boolean;
  onDeactivate: (coupon: AdminCoupon) => void;
}

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value));

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function AdminCouponsTable({
  coupons,
  isDeactivating,
  onDeactivate,
}: AdminCouponsTableProps) {
  if (coupons.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center sm:p-12 shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
          <TicketPercent className="h-7 w-7" />
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
          No Coupons Found
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
          Create your first promotional voucher code to start offering discounts
          to shoppers.
        </p>

        <Link
          href="/admin/coupons/new"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Create Coupon</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <TicketPercent className="h-4 w-4 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-900">All Coupons</h2>
        </div>
        <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
          {coupons.length} coupons on page
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Coupon Code</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Min. Order</th>
              <th className="px-6 py-4">Usage</th>
              <th className="px-6 py-4">Validity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
            {coupons.map((coupon) => (
              <tr
                key={coupon.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                {/* Code & Description */}
                <td className="px-6 py-4">
                  <span className="inline-block rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-extrabold text-slate-900">
                    {coupon.code}
                  </span>
                  <p className="mt-1 max-w-50 truncate text-[11px] font-semibold text-slate-400">
                    {coupon.description || "No description provided"}
                  </p>
                </td>

                {/* Value / Max Discount */}
                <td className="px-6 py-4 font-extrabold text-slate-900">
                  {coupon.type === "PERCENTAGE"
                    ? `${Number(coupon.value)}% OFF`
                    : formatCurrency(coupon.value)}

                  {coupon.type === "PERCENTAGE" &&
                    coupon.maxOrderAmount != null && (
                      <p className="mt-0.5 text-[10px] font-semibold text-slate-400">
                        Cap: {formatCurrency(coupon.maxOrderAmount)}
                      </p>
                    )}
                </td>

                {/* Min Order */}
                <td className="px-6 py-4 font-bold text-slate-700">
                  {formatCurrency(coupon.minOrderAmount)}
                </td>

                {/* Usage Count */}
                <td className="px-6 py-4 font-bold text-slate-700">
                  {coupon.usedCount}
                  <span className="font-semibold text-slate-400">
                    {coupon.usageLimit != null
                      ? ` / ${coupon.usageLimit}`
                      : " / Unlimited"}
                  </span>
                </td>

                {/* Validity Period */}
                <td className="px-6 py-4 font-semibold text-slate-600">
                  <div>{formatDate(coupon.startDate)}</div>
                  <div className="text-[10px] text-slate-400">
                    to {formatDate(coupon.endDate)}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold tracking-tight ${
                      coupon.status === "ACTIVE"
                        ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-100 text-slate-600"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/coupons/${coupon.id}/edit`}
                      aria-label={`Edit ${coupon.code}`}
                      title="Edit coupon"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-600/30 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Link>

                    {coupon.status === "ACTIVE" && (
                      <button
                        type="button"
                        disabled={isDeactivating}
                        onClick={() => onDeactivate(coupon)}
                        aria-label={`Deactivate ${coupon.code}`}
                        title="Deactivate coupon"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Deactivate</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
