"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Address, CreateAddressPayload } from "@/types/address";
import { AddressFormValues, addressSchema } from "@/validations/address.schema";

interface AddressFormProps {
  address?: Address;
  isSubmitting?: boolean;
  onSubmit: (values: CreateAddressPayload) => void;
  onCancel?: () => void;
}

const inputClassName =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-black";

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
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            className={inputClassName}
            placeholder="Enter full name"
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
            placeholder="6-digit postal code"
          />
        </FormField>
      </div>

      <FormField label="Address" error={errors.addressLine1?.message}>
        <input
          {...register("addressLine1")}
          className={inputClassName}
          placeholder="House / Flat / Society"
        />
      </FormField>

      <FormField label="Address line 2" error={errors.addressLine2?.message}>
        <input
          {...register("addressLine2")}
          className={inputClassName}
          placeholder="Area / Street / Near..."
        />
      </FormField>

      <FormField label="Landmark" error={errors.landmark?.message}>
        <input
          {...register("landmark")}
          className={inputClassName}
          placeholder="Nearby landmark"
        />
      </FormField>

      <FormField label="Address type" error={errors.addressType?.message}>
        <select {...register("addressType")} className={inputClassName}>
          <option value="HOME">Home</option>
          <option value="WORK">Work</option>
          <option value="OTHER">Other</option>
        </select>
      </FormField>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" {...register("isDefault")} className="h-4 w-4" />
        Make this my default address
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : address
              ? "Update address"
              : "Add address"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
        )}
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
      <label className="text-sm font-medium text-gray-800">{label}</label>

      {children}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
