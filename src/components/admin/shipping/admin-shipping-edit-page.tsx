"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";
import { toast } from "sonner";

import AdminShippingForm from "@/components/admin/shipping/admin-shipping-form";
import AdminShippingLoading from "@/components/admin/shipping/admin-shipping-loading";
import AdminShippingError from "@/components/admin/shipping/admin-shipping-error";

import {
  useAdminShippingMethods,
  useUpdateAdminShippingMethod,
} from "@/hooks/admin/use-admin-shipping-method";

import type {
  AdminShippingUpdatePayload,
  ShippingMethodType,
} from "@/types/admin-shipping";

const VALID_METHODS: ShippingMethodType[] = ["STANDARD", "EXPRESS"];

export default function AdminShippingEditPage() {
  const params = useParams<{ method: string }>();
  const router = useRouter();

  const method = params.method?.toUpperCase();
  const isValidMethod = VALID_METHODS.includes(method as ShippingMethodType);

  const {
    data: shippingMethods,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useAdminShippingMethods();

  const updateShipping = useUpdateAdminShippingMethod();

  const shippingMethod = shippingMethods?.find(
    (item) => item.method === method,
  );

  const handleUpdate = async (values: AdminShippingUpdatePayload) => {
    if (!isValidMethod || !shippingMethod) {
      toast.error("Invalid shipping method.");
      return;
    }

    try {
      await updateShipping.mutateAsync({
        method: method as ShippingMethodType,
        payload: values,
      });

      toast.success("Shipping method updated successfully.");
      router.push("/admin/shipping");
    } catch {
      toast.error("Failed to update shipping method. Please try again.");
    }
  };

  if (!isValidMethod) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <h1 className="text-xl font-extrabold text-slate-900">
            Invalid Shipping Method
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-600">
            Please select either Standard Delivery or Express Delivery.
          </p>

          <div className="mt-6 flex justify-center">
            <BackToShipping />
          </div>
        </div>
      </main>
    );
  }

  if (isPending) {
    return <AdminShippingLoading />;
  }

  if (isError) {
    return (
      <AdminShippingError onRetry={() => refetch()} isRetrying={isFetching} />
    );
  }

  if (!shippingMethod) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center sm:p-12 shadow-xs">
          <h1 className="text-xl font-extrabold text-slate-900">
            Shipping Method Not Found
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            The requested shipping option does not exist.
          </p>
          <div className="mt-6 flex justify-center">
            <BackToShipping />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="mb-3">
          <BackToShipping />
        </div>

        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <Truck className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Edit Shipping Method
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Update pricing rules and delivery parameters for{" "}
          <strong className="text-slate-900">{shippingMethod.name}</strong>.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
        <AdminShippingForm
          key={shippingMethod.id}
          shippingMethod={shippingMethod}
          onSubmit={handleUpdate}
          isPending={updateShipping.isPending}
          cancelHref="/admin/shipping"
        />
      </div>
    </main>
  );
}

function BackToShipping() {
  return (
    <Link
      href="/admin/shipping"
      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      <span>Back to shipping methods</span>
    </Link>
  );
}
