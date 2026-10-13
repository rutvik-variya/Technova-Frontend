"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  FolderOpen,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { useCategories } from "@/hooks/categories/use-categories";
import { useDeleteCategory } from "@/hooks/admin/categories/use-delete-category";

export default function AdminCategoriesPage() {
  const {
    data: categoriesResponse,
    isLoading,
    isError,
    refetch,
  } = useCategories();

  const deleteCategory = useDeleteCategory();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const categories = categoriesResponse?.data ?? [];

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) return;

    setDeletingId(id);
    setDeleteError("");

    try {
      await deleteCategory.mutateAsync(id);
    } catch {
      setDeleteError(`Failed to delete "${name}". Please try again.`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your TechNova product categories.
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      {/* Delete error */}
      {deleteError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{deleteError}</span>
          <button
            type="button"
            onClick={() => setDeleteError("")}
            className="font-medium underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Loader2 className="animate-spin" size={20} />
            Loading categories...
          </div>
        </div>
      )}

      {/* Error state */}
      {!isLoading && isError && (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-center">
          <p className="font-medium text-gray-900">Unable to load categories</p>
          <p className="mt-1 text-sm text-gray-500">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && categories.length === 0 && (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 text-center">
          <div className="rounded-full bg-gray-100 p-4">
            <FolderOpen size={28} className="text-gray-500" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            No categories yet
          </h2>

          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Create your first category to organize your products.
          </p>

          <Link
            href="/admin/categories/new"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
          >
            <Plus size={17} />
            Create Category
          </Link>
        </div>
      )}

      {/* Categories table */}
      {!isLoading && !isError && categories.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">All Categories</h2>
              <p className="mt-1 text-sm text-gray-500">
                {categories.length}{" "}
                {categories.length === 1 ? "category" : "categories"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-190 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr key={category.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                          {category.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={category.image}
                              alt={category.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <FolderOpen size={20} className="text-gray-400" />
                          )}
                        </div>

                        <span className="font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600">
                        {category.slug}
                      </span>
                    </td>

                    <td className="max-w-xs px-5 py-4 text-gray-500">
                      <p className="truncate">
                        {category.description || "No description"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          aria-label={`Edit ${category.name}`}
                          title="Edit category"
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(category.id, category.name)
                          }
                          disabled={deletingId === category.id}
                          aria-label={`Delete ${category.name}`}
                          title="Delete category"
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === category.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t border-gray-200 px-5 py-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
            >
              Manage products
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
