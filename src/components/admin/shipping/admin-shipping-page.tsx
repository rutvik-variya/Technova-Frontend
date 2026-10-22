"use client";

import { useAdminShippingMethods } from "@/hooks/admin/use-admin-shipping-method";

import AdminShippingPageHeader from "@/components/admin/shipping/admin-shipping-page-header";
import AdminShippingList from "@/components/admin/shipping/admin-shipping-list";
import AdminShippingLoading from "@/components/admin/shipping/admin-shipping-loading";
import AdminShippingError from "@/components/admin/shipping/admin-shipping-error";
import AdminShippingEmpty from "@/components/admin/shipping/admin-shipping-empty";

export default function AdminShippingPage() {
  const {
    data: shippingMethods,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useAdminShippingMethods();

  if (isPending) {
    return <AdminShippingLoading />;
  }

  if (isError) {
    return (
      <AdminShippingError onRetry={() => refetch()} isRetrying={isFetching} />
    );
  }

  return (
    <main className="space-y-8">
      <AdminShippingPageHeader
        isRefreshing={isFetching}
        onRefresh={() => refetch()}
      />

      {!shippingMethods?.length ? (
        <AdminShippingEmpty />
      ) : (
        <AdminShippingList methods={shippingMethods} />
      )}
    </main>
  );
}
