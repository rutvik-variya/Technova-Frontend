"use client";

import { useState } from "react";

import AdminOrderStatus from "@/components/admin/AdminOrderStatus";
import AdminRecentOrders from "@/components/admin/AdminRecentOrders";
import AdminSalesOverview from "@/components/admin/AdminSalesOverview";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";

import { useAdminDashboard } from "@/hooks/admin/use-admin-dashboard";
import { useAdminDashboardSales } from "@/hooks/admin/use-admin-dashboard-sales";

import type { AdminSalesPeriod } from "@/types/admin";

export default function AdminDashboardPage() {
  const [salesPeriod, setSalesPeriod] = useState<AdminSalesPeriod>("7d");

  const { data, isLoading, isError } = useAdminDashboard();

  const {
    data: salesData,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useAdminDashboardSales(salesPeriod);

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl border bg-white"
            />
          ))}
        </div>

        <div className="mt-6 h-125 animate-pulse rounded-xl border bg-white" />

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="h-80 animate-pulse rounded-xl border bg-white" />

          <div className="h-80 animate-pulse rounded-xl border bg-white xl:col-span-2" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Overview of your TechNova store.
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-700">
            Failed to load dashboard data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your TechNova store.
        </p>
      </div>

      {/* Statistics */}
      <AdminStatsGrid summary={data.data.summary} />

      {/* Sales Overview */}
      <div className="mt-6">
        {isSalesLoading ? (
          <div className="h-125 animate-pulse rounded-xl border bg-white" />
        ) : isSalesError || !salesData ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm font-medium text-red-700">
              Failed to load sales data.
            </p>
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

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <AdminOrderStatus orders={data.data.orders} />
        </div>

        <div className="xl:col-span-2">
          <AdminRecentOrders orders={data.data.recentOrders} />
        </div>
      </div>
    </div>
  );
}
