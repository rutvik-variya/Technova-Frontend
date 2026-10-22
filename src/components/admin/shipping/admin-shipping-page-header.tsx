"use client";

import { RefreshCw, Truck } from "lucide-react";

interface AdminShippingPageHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export default function AdminShippingPageHeader({
  isRefreshing,
  onRefresh,
}: AdminShippingPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <Truck className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Shipping Methods
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Manage delivery charges, free-shipping thresholds, and availability.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
      >
        <RefreshCw
          className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
        />
        <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
      </button>
    </div>
  );
}
