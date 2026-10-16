"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderTree,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import { useCategories } from "@/hooks/categories/use-categories";
import { useDeleteCategory } from "@/hooks/admin/categories/use-delete-category";

export default function AdminCategoriesPage() {
  const {
    data: categoriesData,
    isPending,
    isError,
    error,
    refetch,
  } = useCategories();

  const deleteCategoryMutation = useDeleteCategory();
  const categories = categoriesData?.data ?? [];

  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const confirmDelete = () => {
    if (!categoryToDelete) return;
    deleteCategoryMutation.mutate(categoryToDelete.id, {
      onSuccess: () => setCategoryToDelete(null),
    });
  };

  return (
    <main className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <FolderTree className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Categories
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage your TechNova product categories and store navigation
            structure
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Category</span>
        </Link>
      </div>

      {/* Delete Mutation Error Banner */}
      {deleteCategoryMutation.isError && (
        <div
          role="alert"
          className="relative overflow-hidden rounded-2xl border border-rose-200 bg-rose-50/70 p-4 shadow-xs"
        >
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-800">
                Action Failed
              </h3>
              <p className="mt-1 text-xs font-semibold text-rose-700">
                {deleteCategoryMutation.error instanceof Error
                  ? deleteCategoryMutation.error.message
                  : "Failed to delete category. Please try again."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {isPending && (
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs animate-pulse">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded-xl bg-slate-200" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-3 border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-slate-200" />
                  <div className="h-4 w-32 rounded-lg bg-slate-200" />
                </div>
                <div className="h-4 w-24 rounded-lg bg-slate-100" />
                <div className="h-4 w-48 rounded-lg bg-slate-100" />
                <div className="h-8 w-20 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Query Error State */}
      {isError && (
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Failed to Load Categories
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            {error instanceof Error
              ? error.message
              : "Something went wrong while retrieving categories."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isPending && !isError && categories.length === 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <FolderTree className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            No Categories Found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
            Create your first category to start organizing product items across
            your TechNova catalog.
          </p>

          <Link
            href="/admin/categories/new"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Create Category</span>
          </Link>
        </div>
      )}

      {/* Table Data */}
      {!isPending && !isError && categories.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    {/* Image and Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-1">
                          {category.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-full w-full rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-300">
                              <ImageIcon className="h-5 w-5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="text-sm font-bold text-slate-900 block">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4">
                      <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] font-bold text-slate-600">
                        {category.slug}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-6 py-4 text-slate-500">
                      <p className="line-clamp-2 leading-relaxed">
                        {category.description || "—"}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-600/30 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setCategoryToDelete({
                              id: category.id,
                              name: category.name,
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-[0.98]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TechNova Style Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() =>
              !deleteCategoryMutation.isPending && setCategoryToDelete(null)
            }
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setCategoryToDelete(null)}
              disabled={deleteCategoryMutation.isPending}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 shadow-xs">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Delete Category
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Are you sure you want to delete{" "}
                <strong className="text-slate-900">
                  {categoryToDelete.name}
                </strong>
                ? This action will remove the category from catalog structure
                and cannot be undone.
              </p>

              <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setCategoryToDelete(null)}
                  disabled={deleteCategoryMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 sm:w-1/2"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleteCategoryMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-xs font-bold text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                >
                  {deleteCategoryMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
