"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { useAdminProducts } from "@/hooks/admin/products/use-admin-products";
import { useDeleteAdminProduct } from "@/hooks/admin/products/use-delete-admin-product";

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const deleteProductMutation = useDeleteAdminProduct();

  const {
    data: productsData,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useAdminProducts({ page, limit });

  const products = productsData?.data?.products ?? [];
  const pagination = productsData?.data?.pagination;

  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const confirmDelete = () => {
    if (!productToDelete) return;
    deleteProductMutation.mutate(productToDelete.id, {
      onSuccess: () => setProductToDelete(null),
    });
  };

  return (
    <main className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Boxes className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Products
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage your TechNova inventory, pricing, variants, and product
            catalog
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Delete Error Banner */}
      {deleteProductMutation.isError && (
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
                {deleteProductMutation.error instanceof Error
                  ? deleteProductMutation.error.message
                  : "Failed to delete product. Please try again."}
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
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b border-slate-100 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-slate-200" />
                  <div className="space-y-1">
                    <div className="h-4 w-36 rounded-lg bg-slate-200" />
                    <div className="h-3 w-20 rounded-md bg-slate-100" />
                  </div>
                </div>
                <div className="h-4 w-20 rounded-lg bg-slate-100" />
                <div className="h-4 w-24 rounded-lg bg-slate-100" />
                <div className="h-4 w-16 rounded-lg bg-slate-200" />
                <div className="h-6 w-16 rounded-full bg-slate-200" />
                <div className="h-8 w-24 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Failed to Load Products
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            {error instanceof Error
              ? error.message
              : "Something went wrong while fetching product items."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isPending && !isError && products.length === 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <Boxes className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            No Products Found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
            Start building your TechNova store inventory by adding your first
            product.
          </p>

          <Link
            href="/admin/products/new"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Create Product</span>
          </Link>
        </div>
      )}

      {/* Table Data */}
      {!isPending && !isError && products.length > 0 && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-187.5 text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Base Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                  {products.map((product) => {
                    const image =
                      product.productImages?.find((item) => item.isPrimary) ??
                      product.productImages?.[0];

                    return (
                      <tr
                        key={product.id}
                        className="transition-colors hover:bg-slate-50/80"
                      >
                        {/* Image & Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-1">
                              {image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={image.url}
                                  alt={product.name}
                                  className="h-full w-full rounded-xl object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-slate-300">
                                  <ImageIcon className="h-5 w-5" />
                                </div>
                              )}
                            </div>

                            <div>
                              <span className="block text-sm font-bold text-slate-900">
                                {product.name}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-400">
                                {product.productVariants?.length ?? 0} variants
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Brand */}
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-700">
                            {product.brand}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                            {product.category?.name ?? "—"}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="whitespace-nowrap px-6 py-4 font-extrabold text-slate-900">
                          ₹{Number(product.basePrice).toLocaleString("en-IN")}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold tracking-tight ${
                              product.status === "ACTIVE"
                                ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
                                : "border-slate-200 bg-slate-100 text-slate-600"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/products/${product.slug}/edit`}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-600/30 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                setProductToDelete({
                                  id: product.id,
                                  name: product.name,
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
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 0 && (
              <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium text-slate-500">
                  Showing page{" "}
                  <strong className="text-slate-900">{pagination.page}</strong>{" "}
                  of{" "}
                  <strong className="text-slate-900">
                    {pagination.totalPages}
                  </strong>{" "}
                  ({pagination.total} total products)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!pagination.hasPrevious || isFetching}
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    disabled={!pagination.hasNext || isFetching}
                    onClick={() => setPage((current) => current + 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() =>
              !deleteProductMutation.isPending && setProductToDelete(null)
            }
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setProductToDelete(null)}
              disabled={deleteProductMutation.isPending}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 shadow-xs">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Delete Product
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Are you sure you want to delete{" "}
                <strong className="text-slate-900">
                  {productToDelete.name}
                </strong>
                ? All associated images and variants will be removed
                permanently.
              </p>

              <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  disabled={deleteProductMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 sm:w-1/2"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleteProductMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-xs font-bold text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                >
                  {deleteProductMutation.isPending ? (
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
