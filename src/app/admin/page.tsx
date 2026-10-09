"use client";

import { useState } from "react";
import { AlertCircle, LayoutDashboard, RefreshCw } from "lucide-react";

import AdminOrderStatus from "@/components/admin/AdminOrderStatus";
import AdminRecentOrders from "@/components/admin/AdminRecentOrders";
import AdminSalesOverview from "@/components/admin/AdminSalesOverview";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";

import { useAdminDashboard } from "@/hooks/admin/use-admin-dashboard";
import { useAdminDashboardSales } from "@/hooks/admin/use-admin-dashboard-sales";

import type { AdminSalesPeriod } from "@/types/admin";

export default function AdminDashboardPage() {
  const [salesPeriod, setSalesPeriod] = useState<AdminSalesPeriod>("7d");

  const {
    data,
    isLoading,
    isError,
    refetch: refetchDashboard,
  } = useAdminDashboard();

  const {
    data: salesData,
    isLoading: isSalesLoading,
    isError: isSalesError,
    refetch: refetchSales,
  } = useAdminDashboardSales(salesPeriod);

  // TechNova Style Unified Skeleton Loading State
  if (isLoading) {
    return (
      <main className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-6">
          <div className="h-8 w-8 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-xl bg-slate-200" />
            <div className="h-4 w-64 rounded-lg bg-slate-100" />
          </div>
        </div>

        {/* Stats Grid Skeleton (4 Cards) */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-5"
            />
          ))}
        </div>

        {/* Sales Overview Skeleton */}
        <div className="h-96 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-6" />

        {/* Status & Recent Orders Grid Skeleton */}
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="h-80 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-6 xl:col-span-1" />
          <div className="h-80 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-6 xl:col-span-2" />
        </div>
      </main>
    );
  }

  // TechNova Style Error State
  if (isError || !data) {
    return (
      <main className="space-y-8">
        <div className="border-b border-slate-200/80 pb-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <LayoutDashboard className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Overview of your TechNova store analytics and metrics
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Failed to Load Dashboard Data
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            We ran into an issue retrieving your admin metrics. Please check
            your network or try reloading.
          </p>

          <button
            type="button"
            onClick={() => refetchDashboard()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <LayoutDashboard className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Overview of your TechNova store analytics and metrics
        </p>
      </div>

      {/* Statistics Grid */}
      <AdminStatsGrid summary={data.data.summary} />

      {/* Sales Overview */}
      <div>
        {isSalesLoading ? (
          <div className="h-96 animate-pulse rounded-3xl border border-slate-200/80 bg-slate-100/70 p-6" />
        ) : isSalesError || !salesData ? (
          <div className="relative overflow-hidden rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-center shadow-xs">
            <p className="text-xs font-extrabold uppercase tracking-wider text-rose-800">
              Sales Data Issue
            </p>
            <p className="mt-1 text-sm font-medium text-rose-700">
              Failed to load sales chart analytics.
            </p>
            <button
              type="button"
              onClick={() => refetchSales()}
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-700 shadow-xs transition hover:bg-rose-50 active:scale-[0.98]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Sales Data
            </button>
          </div>
        ) : (
          <AdminSalesOverview
            sales={salesData.data}
            period={salesPeriod}
            onPeriodChange={setSalesPeriod}
            isLoading={isSalesLoading}
          />
        )}
      </div>

      {/* Status & Recent Orders Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <AdminOrderStatus orders={data.data.orders} />
        </div>

        <div className="xl:col-span-2">
          <AdminRecentOrders orders={data.data.recentOrders} />
        </div>
      </div>
    </main>
  );
}
