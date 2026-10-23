"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";

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
  extraSection?: ReactNode;
  canSubmit?: boolean;
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
  extraSection,
  canSubmit = true,
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
    if (!canSubmit) return;
    onSubmit(values);
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <form
        id="admin-product-form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <FormInput<AdminProductFormValues>
              name="name"
              label="Product Name"
              register={register}
              error={errors.name?.message}
              placeholder="Enter full product name"
              required
              disabled={isSubmitting}
            />
          </div>

          <FormInput<AdminProductFormValues>
            name="brand"
            label="Brand"
            register={register}
            error={errors.brand?.message}
            placeholder="e.g. Apple, Samsung, Sony"
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
            label="Publication Status"
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
            label="Short Description"
            register={register}
            error={errors.shortDescription?.message}
            placeholder="Brief overview summary for product cards"
            rows={3}
            required
            disabled={isSubmitting}
          />

          <div className="md:col-span-2">
            <FormTextarea<AdminProductFormValues>
              name="description"
              label="Full Description"
              register={register}
              error={errors.description?.message}
              placeholder="Enter complete technical specifications and details"
              rows={6}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {categories.length === 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-800">
            No categories found. Create a category before publishing new products.
          </div>
        )}

        {submitError && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-xs font-semibold text-rose-700"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{submitError}</span>
          </div>
        )}
      </form>

      {extraSection}

      <FormActions
        submitLabel={initialProduct ? "Save Changes" : "Create Product"}
        isSubmitting={isSubmitting}
        cancelHref="/admin/products"
        canSubmit={canSubmit}
        formId="admin-product-form"
      />
    </div>
  );
}
