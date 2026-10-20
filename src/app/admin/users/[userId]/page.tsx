"use client";

import { useParams } from "next/navigation";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useAdminUserById } from "@/hooks/admin/useAdminUsers";

import AdminUserDetailsHeader from "@/components/admin/users/details/AdminUserDetailsHeader";
import AdminUserStatCard from "@/components/admin/users/details/AdminUserStatCard";
import AdminUserInformation from "@/components/admin/users/details/AdminUserInformation";

export default function AdminUserDetailsPage() {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const {
    data: user,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useAdminUserById(userId);

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-6xl space-y-8 animate-pulse">
        <div className="h-8 w-48 rounded-xl bg-slate-200" />
        <div className="h-36 rounded-3xl bg-slate-100" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-3xl bg-slate-100" />
          ))}
        </div>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h1 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Unable to Load User
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            The user details could not be loaded. The user may not exist, or the
            request may have failed.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to users</span>
            </Link>

            <button
              type="button"
              onClick={() => refetch()}
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

  const statistics = [
    {
      title: "Total Orders",
      value: user.statistics.orderCount,
      description: "Orders placed by this user",
    },
    {
      title: "Reviews",
      value: user.statistics.reviewCount,
      description: "Reviews submitted",
    },
    {
      title: "Addresses",
      value: user.statistics.addressCount,
      description: "Saved delivery addresses",
    },
    {
      title: "Coupon Usage",
      value: user.statistics.couponUsageCount,
      description: "Coupon uses recorded",
    },
  ];

  return (
    <main className="space-y-8">
      <AdminUserDetailsHeader
        name={user.name}
        email={user.email}
        role={user.role}
        createdAt={user.createdAt}
      />

      {isFetching && (
        <p className="text-xs font-bold text-blue-600" role="status">
          Refreshing user details...
        </p>
      )}

      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          User Statistics
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((statistic) => (
            <AdminUserStatCard
              key={statistic.title}
              title={statistic.title}
              value={statistic.value}
              description={statistic.description}
            />
          ))}
        </div>
      </section>

      <AdminUserInformation user={user} />
    </main>
  );
}
