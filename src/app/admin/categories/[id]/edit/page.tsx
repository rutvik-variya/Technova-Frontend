"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";

import AdminCategoryForm from "@/components/admin/categories/admin-category-form";
import { useUpdateCategory } from "@/hooks/admin/categories/use-update-category";

import type { AdminCategoryFormValues } from "@/validations/admin-category.schema";
import { useCategory } from "@/hooks/admin/categories/use-category";

interface EditAdminCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default function EditAdminCategoryPage({
  params,
}: EditAdminCategoryPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: categoryResponse,
    isPending,
    isError,
    error,
    refetch,
  } = useCategory(id);

  const updateCategory = useUpdateCategory();

  const category = useMemo(
    () => categoryResponse?.data ?? null,
    [categoryResponse],
  );

  const handleSubmit = (values: AdminCategoryFormValues) => {
    updateCategory.mutate(
      {
        id,
        payload: {
          name: values.name,
          description: values.description || "",
          image: values.image || "",
        },
      },
      {
        onSuccess: () => {
          router.push("/admin/categories");
        },
      },
    );
  };

  const submitError = updateCategory.isError
    ? updateCategory.error instanceof Error
      ? updateCategory.error.message
      : "Unable to update category. Please try again."
    : null;

  if (isPending) {
    return <div className="p-6 text-sm text-gray-500">Loading category...</div>;
  }

  if (isError) {
    return (
      <div className="space-y-3 p-6">
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Unable to load category."}
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="space-y-4 p-6">
        <p className="text-sm text-gray-600">Category not found.</p>

        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Back to categories
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-gray-500">Admin / Categories / Edit</p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900">Edit category</h1>

        <p className="mt-2 text-sm text-gray-500">
          Update the category name, description, or image URL.
        </p>
      </div>

      <AdminCategoryForm
        initialCategory={category}
        isSubmitting={updateCategory.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
