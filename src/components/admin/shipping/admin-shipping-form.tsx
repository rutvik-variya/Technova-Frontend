"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/admin/forms/form-input";
import FormActions from "@/components/admin/forms/form-actions";

import {
  adminShippingSchema,
  type AdminShippingFormValues,
} from "@/validations/admin-shipping.schema";

import type {
  AdminShippingMethod,
  AdminShippingUpdatePayload,
} from "@/types/admin-shipping";

interface AdminShippingFormProps {
  shippingMethod: AdminShippingMethod;
  onSubmit: (values: AdminShippingUpdatePayload) => Promise<void>;
  isPending: boolean;
  cancelHref: string;
}

export default function AdminShippingForm({
  shippingMethod,
  onSubmit,
  isPending,
  cancelHref,
}: AdminShippingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AdminShippingFormValues>({
    resolver: zodResolver(adminShippingSchema),
    defaultValues: {
      name: shippingMethod.name,
      baseCharge: shippingMethod.baseCharge,
      freeShippingAbove: shippingMethod.freeShippingAbove,
      estimatedDays: shippingMethod.estimatedDays,
      isActive: shippingMethod.isActive,
    },
  });

  useEffect(() => {
    reset({
      name: shippingMethod.name,
      baseCharge: shippingMethod.baseCharge,
      freeShippingAbove: shippingMethod.freeShippingAbove,
      estimatedDays: shippingMethod.estimatedDays,
      isActive: shippingMethod.isActive,
    });
  }, [shippingMethod, reset]);

  const submitForm = async (values: AdminShippingFormValues) => {
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormInput<AdminShippingFormValues>
            label="Shipping Method Name"
            name="name"
            register={register}
            error={errors.name?.message}
            placeholder="e.g. Standard Delivery"
            required
            disabled={isPending}
          />
        </div>

        <FormInput<AdminShippingFormValues>
          label="Base Charge (₹)"
          name="baseCharge"
          type="number"
          min="0"
          register={register}
          error={errors.baseCharge?.message}
          required
          disabled={isPending}
          {...{}}
        />

        <FormInput<AdminShippingFormValues>
          label="Free Shipping Above (₹)"
          name="freeShippingAbove"
          type="number"
          min="0"
          register={register}
          error={errors.freeShippingAbove?.message}
          required
          disabled={isPending}
        />

        <FormInput<AdminShippingFormValues>
          label="Estimated Delivery (Days)"
          name="estimatedDays"
          type="number"
          min="1"
          register={register}
          error={errors.estimatedDays?.message}
          required
          disabled={isPending}
        />

        <div className="flex flex-col justify-center gap-3">
          <span className="block text-xs font-bold text-slate-700">
            Shipping Status
          </span>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              {...register("isActive")}
              disabled={isPending}
              className="h-4 w-4 rounded border-slate-300 accent-blue-600"
            />
            <span>Active — available for checkout</span>
          </label>

          {errors.isActive?.message && (
            <p className="text-xs font-semibold text-rose-600">
              {errors.isActive.message}
            </p>
          )}
        </div>
      </div>

      <FormActions
        submitLabel="Save Changes"
        isSubmitting={isPending}
        cancelHref={cancelHref}
      />

      {!isDirty && (
        <p className="text-xs text-slate-500">
          Make a change to enable saving.
        </p>
      )}
    </form>
  );
}
