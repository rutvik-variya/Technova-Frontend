"use client";

import { useRouter } from "next/navigation";
import { FolderTree } from "lucide-react";

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
    <main className="mx-auto w-full max-w-4xl space-y-8">
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <FolderTree className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Add Category
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Enter the details for your new product category
        </p>
      </div>

      <AdminCategoryForm
        isSubmitting={createCategory.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
