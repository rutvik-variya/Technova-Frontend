"use client";

import { useEffect } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";

import FormInput from "@/components/admin/forms/form-input";
import FormSelect from "@/components/admin/forms/form-select";
import FormTextarea from "@/components/admin/forms/form-textarea";
import FormActions from "@/components/admin/forms/form-actions";

import {
  adminCouponSchema,
  type AdminCouponFormValues,
  type AdminCouponValidatedValues,
} from "@/validations/admin-coupon.schema";

import type {
  AdminCoupon,
  CreateAdminCouponPayload,
} from "@/types/admin-coupon.types";

interface AdminCouponFormProps {
  initialCoupon?: AdminCoupon;
  isSubmitting: boolean;
  submitError?: string | null;
  onSubmit: (payload: CreateAdminCouponPayload) => void;
}

const defaultValues: AdminCouponFormValues = {
  code: "",
  description: "",
  type: "PERCENTAGE",
  value: 10,
  minOrderAmount: 1000,
  maxOrderAmount: "",
  usageLimit: "",
  startDate: "",
  endDate: "",
  status: "ACTIVE",
};

const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toDateInput = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

export default function AdminCouponForm({
  initialCoupon,
  isSubmitting,
  submitError,
  onSubmit,
}: AdminCouponFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AdminCouponFormValues, unknown, AdminCouponValidatedValues>({
    resolver: zodResolver(adminCouponSchema),
    defaultValues,
  });

  const couponType = useWatch({ control, name: "type" });

  useEffect(() => {
    if (!initialCoupon) {
      reset(defaultValues);
      return;
    }

    reset({
      code: initialCoupon.code,
      description: initialCoupon.description ?? "",
      type: initialCoupon.type,
      value: Number(initialCoupon.value),
      minOrderAmount: Number(initialCoupon.minOrderAmount),
      maxOrderAmount:
        initialCoupon.maxOrderAmount == null
          ? ""
          : Number(initialCoupon.maxOrderAmount),
      usageLimit: initialCoupon.usageLimit ?? "",
      startDate: toDateInput(initialCoupon.startDate),
      endDate: toDateInput(initialCoupon.endDate),
      status: initialCoupon.status,
    });
  }, [initialCoupon, reset]);

  const submitHandler: SubmitHandler<AdminCouponValidatedValues> = (values) => {
    const payload: CreateAdminCouponPayload = {
      code: values.code,
      description: values.description || undefined,
      type: values.type,
      value: values.value,
      minOrderAmount: values.minOrderAmount,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
      ...(values.maxOrderAmount !== ""
        ? { maxOrderAmount: Number(values.maxOrderAmount) }
        : {}),
      ...(values.usageLimit !== ""
        ? { usageLimit: Number(values.usageLimit) }
        : {}),
    };

    onSubmit(payload);
  };

  const today = getTodayDate();

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput<AdminCouponFormValues>
          name="code"
          label="Coupon Code"
          register={register}
          error={errors.code?.message}
          placeholder="e.g. SAVE20"
          required
          disabled={isSubmitting}
        />

        <FormSelect<AdminCouponFormValues>
          name="type"
          label="Discount Type"
          register={register}
          options={[
            { label: "Percentage", value: "PERCENTAGE" },
            { label: "Fixed Amount", value: "FIXED" },
          ]}
          error={errors.type?.message}
          required
          disabled={isSubmitting}
        />

        <FormInput<AdminCouponFormValues>
          name="value"
          label="Discount Value"
          type="number"
          register={register}
          error={errors.value?.message}
          required
          disabled={isSubmitting}
        />

        <FormInput<AdminCouponFormValues>
          name="minOrderAmount"
          label="Minimum Order Amount (₹)"
          type="number"
          register={register}
          error={errors.minOrderAmount?.message}
          required
          disabled={isSubmitting}
        />

        <FormInput<AdminCouponFormValues>
          name="maxOrderAmount"
          label={
            couponType === "PERCENTAGE"
              ? "Maximum Discount Cap (₹)"
              : "Maximum Order Amount (₹)"
          }
          type="number"
          register={register}
          error={errors.maxOrderAmount?.message}
          required={couponType === "PERCENTAGE"}
          disabled={isSubmitting}
        />

        <FormInput<AdminCouponFormValues>
          name="usageLimit"
          label="Usage Limit"
          type="number"
          register={register}
          error={errors.usageLimit?.message}
          placeholder="Leave empty for unlimited"
          disabled={isSubmitting}
        />

        <FormInput<AdminCouponFormValues>
          name="startDate"
          label="Start Date"
          type="date"
          register={register}
          error={errors.startDate?.message}
          min={today}
          required
          disabled={isSubmitting}
        />

        <FormInput<AdminCouponFormValues>
          name="endDate"
          label="End Date"
          type="date"
          register={register}
          error={errors.endDate?.message}
          min={today}
          required
          disabled={isSubmitting}
        />

        <FormSelect<AdminCouponFormValues>
          name="status"
          label="Status"
          register={register}
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
          ]}
          error={errors.status?.message}
          required
          disabled={isSubmitting}
        />

        <div className="md:col-span-2">
          <FormTextarea<AdminCouponFormValues>
            name="description"
            label="Description"
            register={register}
            error={errors.description?.message}
            placeholder="Describe the promo campaign or discount details"
            rows={3}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-xs font-semibold text-rose-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{submitError}</span>
        </div>
      )}

      <FormActions
        submitLabel={initialCoupon ? "Save Changes" : "Create Coupon"}
        isSubmitting={isSubmitting}
        cancelHref="/admin/coupons"
      />
    </form>
  );
}
