"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/admin/forms/form-input";
import FormTextarea from "@/components/admin/forms/form-textarea";
import FormSelect from "@/components/admin/forms/form-select";
import FormActions from "@/components/admin/forms/form-actions";

import {
  adminProductSchema,
  type AdminProductFormValues,
} from "@/validations/admin-product.schema";

import type { AdminProduct } from "@/types/admin-product";
import type { Category } from "@/types/category";

interface AdminProductFormProps {
  initialProduct?: AdminProduct;
  categories: Category[];
  isSubmitting: boolean;
  submitError?: string | null;
  onSubmit: (values: AdminProductFormValues) => void;
}

const defaultValues: AdminProductFormValues = {
  name: "",
  description: "",
  shortDescription: "",
  brand: "",
  categoryId: "",
  status: "DRAFT",
};

export default function AdminProductForm({
  initialProduct,
  categories,
  isSubmitting,
  submitError,
  onSubmit,
}: AdminProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminProductFormValues>({
    resolver: zodResolver(adminProductSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialProduct) {
      if (categories.length === 0) return;
      reset({
        name: initialProduct.name,
        description: initialProduct.description,
        shortDescription: initialProduct.shortDescription,
        brand: initialProduct.brand,
        categoryId: initialProduct.category?.id ?? "",
        status: initialProduct.status === "ACTIVE" ? "ACTIVE" : "DRAFT",
      });
    } else {
      reset(defaultValues);
    }
  }, [initialProduct, categories, reset]);

  const submitHandler: SubmitHandler<AdminProductFormValues> = (values) => {
    onSubmit(values);
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <FormInput<AdminProductFormValues>
            name="name"
            label="Product name"
            register={register}
            error={errors.name?.message}
            placeholder="Enter product name"
            required
            disabled={isSubmitting}
          />
        </div>

        <FormInput<AdminProductFormValues>
          name="brand"
          label="Brand"
          register={register}
          error={errors.brand?.message}
          placeholder="e.g. Samsung"
          required
          disabled={isSubmitting}
        />

        <FormSelect<AdminProductFormValues>
          name="categoryId"
          label="Category"
          register={register}
          options={categoryOptions}
          error={errors.categoryId?.message}
          placeholder="Select a category"
          required
          disabled={isSubmitting || categories.length === 0}
        />

        <FormSelect<AdminProductFormValues>
          name="status"
          label="Status"
          register={register}
          options={[
            { label: "Draft", value: "DRAFT" },
            { label: "Active", value: "ACTIVE" },
          ]}
          error={errors.status?.message}
          required
          disabled={isSubmitting}
        />

        <FormTextarea<AdminProductFormValues>
          name="shortDescription"
          label="Short description"
          register={register}
          error={errors.shortDescription?.message}
          placeholder="Brief product summary"
          rows={3}
          required
          disabled={isSubmitting}
        />

        <div className="md:col-span-2">
          <FormTextarea<AdminProductFormValues>
            name="description"
            label="Full description"
            register={register}
            error={errors.description?.message}
            placeholder="Enter the complete product description"
            rows={6}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-amber-700">
          No categories are available. Create a category before adding a
          product.
        </p>
      )}

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {submitError}
        </div>
      )}

      <FormActions
        submitLabel={initialProduct ? "Save changes" : "Create product"}
        isSubmitting={isSubmitting}
        cancelHref="/admin/products"
      />
    </form>
  );
}
