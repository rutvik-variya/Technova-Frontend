"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, ShoppingBag } from "lucide-react";
import type { AdminDashboardSales, AdminSalesPeriod } from "@/types/admin";

interface AdminSalesOverviewProps {
  sales: AdminDashboardSales;
  period: AdminSalesPeriod;
  onPeriodChange: (period: AdminSalesPeriod) => void;
  isLoading?: boolean;
}

const periodOptions: { value: AdminSalesPeriod; label: string }[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "1y", label: "1 Year" },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (value: string, period: AdminSalesPeriod) => {
  const date = new Date(value);
  if (period === "1y") {
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      year: "numeric",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

export default function AdminSalesOverview({
  sales,
  period,
  onPeriodChange,
  isLoading = false,
}: AdminSalesOverviewProps) {
  const chartData = sales.data.map((item) => ({
    ...item,
    dateLabel: formatDate(item.date, period),
  }));

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Sales Analytics</h2>
          <p className="mt-0.5 text-xs text-slate-500 font-medium">
            Monitor revenue trends and overall ordering performance
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200/50">
          {periodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onPeriodChange(option.value)}
              disabled={isLoading}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                period === option.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Highlight Strip */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Period Revenue</p>
            <p className="text-xl font-bold text-slate-900">
              {formatCurrency(sales.totalRevenue)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Orders</p>
            <p className="text-xl font-bold text-slate-900">
              {sales.totalOrders}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="mt-6 h-72 w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-xs font-medium text-slate-400">
              No sales data recorded for the selected timeframe.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="dateLabel"
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) =>
                  `₹${Number(val).toLocaleString("en-IN")}`
                }
              />
              <Tooltip
                cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  borderRadius: "16px",
                  color: "#fff",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(val) => [formatCurrency(Number(val)), "Revenue"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar
                dataKey="revenue"
                fill="#e11d48"
                radius={[8, 8, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Footer Note */}
      <div className="mt-4 border-t border-slate-100 pt-3">
        <div className="flex flex-col gap-1 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Data range: {formatDate(sales.startDate, period)} –{" "}
            {formatDate(sales.endDate, period)}
          </span>
          <span>Excludes cancelled & returned orders</span>
        </div>
      </div>
    </div>
  );
}
