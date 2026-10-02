"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import type { Address, CreateAddressPayload } from "@/types/address";
import { AddressFormValues, addressSchema } from "@/validations/address.schema";

interface AddressFormProps {
  address?: Address;
  isSubmitting?: boolean;
  onSubmit: (values: CreateAddressPayload) => void;
  onCancel?: () => void;
}

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition duration-150 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:bg-slate-50 disabled:opacity-60";

export function AddressForm({
  address,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      country: "India",
      state: "",
      city: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      addressType: "HOME",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (address) {
      reset({
        fullName: address.fullName,
        phone: address.phone,
        country: address.country,
        state: address.state,
        city: address.city,
        postalCode: address.postalCode,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 ?? "",
        landmark: address.landmark ?? "",
        addressType:
          address.addressType === "OFFICE" ? "WORK" : address.addressType,
        isDefault: address.isDefault,
      });
    }
  }, [address, reset]);

  const submitHandler: SubmitHandler<AddressFormValues> = (values) => {
    onSubmit({
      ...values,
      addressLine2: values.addressLine2 || undefined,
      landmark: values.landmark || undefined,
      addressType:
        values.addressType === "WORK" ? "OFFICE" : values.addressType,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            className={inputClassName}
            placeholder="e.g. John Doe"
          />
        </FormField>

        <FormField label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            className={inputClassName}
            placeholder="10-digit phone number"
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Country" error={errors.country?.message}>
          <input {...register("country")} className={inputClassName} />
        </FormField>

        <FormField label="State" error={errors.state?.message}>
          <input
            {...register("state")}
            className={inputClassName}
            placeholder="Enter state"
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="City" error={errors.city?.message}>
          <input
            {...register("city")}
            className={inputClassName}
            placeholder="Enter city"
          />
        </FormField>

        <FormField label="Postal code" error={errors.postalCode?.message}>
          <input
            {...register("postalCode")}
            className={inputClassName}
            placeholder="6-digit PIN code"
          />
        </FormField>
      </div>

      <FormField label="Address" error={errors.addressLine1?.message}>
        <input
          {...register("addressLine1")}
          className={inputClassName}
          placeholder="Flat, House no., Building, Company"
        />
      </FormField>

      <FormField label="Address line 2" error={errors.addressLine2?.message}>
        <input
          {...register("addressLine2")}
          className={inputClassName}
          placeholder="Area, Street, Sector, Village"
        />
      </FormField>

      <FormField label="Landmark" error={errors.landmark?.message}>
        <input
          {...register("landmark")}
          className={inputClassName}
          placeholder="E.g. near Apollo Hospital"
        />
      </FormField>

      <FormField label="Address type" error={errors.addressType?.message}>
        <select {...register("addressType")} className={inputClassName}>
          <option value="HOME">Home</option>
          <option value="WORK">Work</option>
          <option value="OTHER">Other</option>
        </select>
      </FormField>

      <div className="pt-2">
        <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            {...register("isDefault")}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 accent-slate-900 focus:ring-slate-900"
          />
          Make this my default address
        </label>
      </div>

      <div className="flex flex-col-reverse gap-2.5 pt-3 sm:flex-row sm:justify-start">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-sm"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting
            ? "Saving..."
            : address
            ? "Update address"
            : "Add address"}
        </button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-700 sm:text-sm">
        {label}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}