"use client";

import Link from "next/link";
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

  const handleCategoryDelete = (categoryId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (confirmed) {
      deleteCategoryMutation.mutate(categoryId);
    }
  };

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your TechNova product categories.
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add Category
        </Link>
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="animate-pulse text-sm text-gray-500">
            Loading categories...
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-medium text-red-700">Failed to load categories</p>

          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error ? error.message : "Something went wrong."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      )}

      {/* Delete Error */}
      {deleteCategoryMutation.isError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {deleteCategoryMutation.error instanceof Error
            ? deleteCategoryMutation.error.message
            : "Failed to delete category. Please try again."}
        </div>
      )}

      {/* Empty State */}
      {!isPending && !isError && categories.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="font-semibold text-gray-900">No categories found</h2>

          <p className="mt-2 text-sm text-gray-500">
            Create your first category to organize your products.
          </p>

          <Link
            href="/admin/categories/new"
            className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Create Category
          </Link>
        </div>
      )}

      {/* Categories Table */}
      {!isPending && !isError && categories.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-187.5 w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Slug</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  {/* Image and Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {category.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          No image
                        </div>
                      )}

                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="px-5 py-4 text-gray-600">{category.slug}</td>

                  {/* Description */}
                  <td className="max-w-xs px-5 py-4 text-gray-600">
                    <p className="line-clamp-2">
                      {category.description || "—"}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        disabled={deleteCategoryMutation.isPending}
                        onClick={() => handleCategoryDelete(category.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deleteCategoryMutation.isPending
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
