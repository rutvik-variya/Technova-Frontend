"use client";

import { useRouter } from "next/navigation";

import AdminCategoryForm from "@/components/admin/categories/admin-category-form";
import { useCreateCategory } from "@/hooks/admin/categories/use-create-category";

import type { AdminCategoryFormValues } from "@/validations/admin-category.schema";

export default function NewAdminCategoryPage() {
  const router = useRouter();
  const createCategory = useCreateCategory();

  const handleSubmit = (values: AdminCategoryFormValues) => {
    createCategory.mutate(values, {
      onSuccess: () => {
        router.push("/admin/categories");
      },
    });
  };

  const submitError = createCategory.isError
    ? createCategory.error instanceof Error
      ? createCategory.error.message
      : "Unable to create category. Please try again."
    : null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-gray-500">Admin / Categories</p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900">Add category</h1>

        <p className="mt-2 text-sm text-gray-500">
          Enter the details for your new product category.
        </p>
      </div>

      <AdminCategoryForm
        isSubmitting={createCategory.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
