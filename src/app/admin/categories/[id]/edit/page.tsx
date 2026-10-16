"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FolderTree, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

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
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8 animate-pulse">
        <div className="h-8 w-48 rounded-xl bg-slate-200" />
        <div className="h-96 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-8" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Unable to Load Category
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            {error instanceof Error
              ? error.message
              : "Failed to fetch category details."}
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="mx-auto w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center sm:p-12 shadow-xs">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Category Not Found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
            The requested category could not be located in your database.
          </p>

          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <FolderTree className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Edit Category
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Update the category name, description, or image URL
        </p>
      </div>

      <AdminCategoryForm
        initialCategory={category}
        isSubmitting={updateCategory.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
