"use client";

import { useEffect } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, AlertCircle } from "lucide-react";

import FormInput from "@/components/admin/forms/form-input";
import FormTextarea from "@/components/admin/forms/form-textarea";
import FormActions from "@/components/admin/forms/form-actions";

import {
  adminCategorySchema,
  type AdminCategoryFormValues,
} from "@/validations/admin-category.schema";

import type { Category } from "@/types/category";

interface AdminCategoryFormProps {
  initialCategory?: Category;
  isSubmitting: boolean;
  submitError?: string | null;
  onSubmit: (values: AdminCategoryFormValues) => void;
}

const defaultValues: AdminCategoryFormValues = {
  name: "",
  description: "",
  image: "",
};

export default function AdminCategoryForm({
  initialCategory,
  isSubmitting,
  submitError,
  onSubmit,
}: AdminCategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AdminCategoryFormValues>({
    resolver: zodResolver(adminCategorySchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialCategory) {
      reset({
        name: initialCategory.name,
        description: initialCategory.description ?? "",
        image: initialCategory.image ?? "",
      });
    } else {
      reset(defaultValues);
    }
  }, [initialCategory, reset]);

  const imageUrl = useWatch({ control, name: "image" });

  const submitHandler: SubmitHandler<AdminCategoryFormValues> = (values) => {
    onSubmit({
      name: values.name.trim(),
      description: values.description?.trim() ?? "",
      image: values.image?.trim() ?? "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="space-y-5">
        <FormInput<AdminCategoryFormValues>
          name="name"
          label="Category Name"
          register={register}
          error={errors.name?.message}
          placeholder="e.g. Gaming Laptops"
          required
          disabled={isSubmitting}
        />

        <FormTextarea<AdminCategoryFormValues>
          name="description"
          label="Description"
          register={register}
          error={errors.description?.message}
          placeholder="Describe this category (optional)"
          rows={4}
          disabled={isSubmitting}
        />

        <FormInput<AdminCategoryFormValues>
          name="image"
          label="Image URL"
          register={register}
          error={errors.image?.message}
          placeholder="https://example.com/category-image.jpg"
          disabled={isSubmitting}
        />

        <p className="-mt-3 text-[11px] font-medium text-slate-400">
          Enter a publicly accessible image URL. File uploads are not used.
        </p>

        {imageUrl?.trim() && !errors.image && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-slate-700">Image Preview</p>

            <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl.trim()}
                alt="Category preview"
                className="max-h-56 max-w-full rounded-xl object-contain"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
                onLoad={(event) => {
                  event.currentTarget.style.visibility = "visible";
                }}
              />
            </div>
          </div>
        )}
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
        submitLabel={initialCategory ? "Save Changes" : "Create Category"}
        isSubmitting={isSubmitting}
        cancelHref="/admin/categories"
      />
    </form>
  );
}
