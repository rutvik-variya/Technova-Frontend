import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

import AdminStatsCard from "./AdminStatsCard";
import type { AdminDashboardSummary } from "@/types/admin";

interface AdminStatsGridProps {
  summary: AdminDashboardSummary;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function AdminStatsGrid({ summary }: AdminStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AdminStatsCard
        title="Total Users"
        value={summary.totalUsers}
        icon={Users}
        description="Registered customers"
      />

      <AdminStatsCard
        title="Total Products"
        value={summary.totalProducts}
        icon={Package}
        description="Products in store"
      />

      <AdminStatsCard
        title="Total Orders"
        value={summary.totalOrders}
        icon={ShoppingCart}
        description="Orders placed"
      />

      <AdminStatsCard
        title="Total Revenue"
        value={formatCurrency(summary.totalRevenue)}
        icon={DollarSign}
        description="Total order revenue"
      />
    </div>
  );
}
