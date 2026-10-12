"use client";

import { useRouter } from "next/navigation";

import AdminProductForm from "@/components/admin/products/admin-product-form";
import { useCreateAdminProduct } from "@/hooks/admin/products/use-create-admin-product";
import { useCategories } from "@/hooks/categories/use-categories";

import type { AdminProductFormValues } from "@/validations/admin-product.schema";

export default function NewAdminProductPage() {
  const router = useRouter();

  const {
    data: categoriesResponse,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const categories = categoriesResponse?.data ?? [];
  
  const createProduct = useCreateAdminProduct();

  const handleSubmit = (values: AdminProductFormValues) => {
    createProduct.mutate(values, {
      onSuccess: () => {
        router.push("/admin/products");
      },
    });
  };

  const submitError = createProduct.isError
    ? createProduct.error instanceof Error
      ? createProduct.error.message
      : "Unable to create product. Please try again."
    : null;

  if (isCategoriesPending) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading categories...</div>
    );
  }

  if (isCategoriesError) {
    return (
      <div className="space-y-3 p-6">
        <p className="text-sm text-red-600">
          {categoriesError instanceof Error
            ? categoriesError.message
            : "Unable to load categories."}
        </p>

        <button
          type="button"
          onClick={() => void refetchCategories()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-gray-500">Admin / Products</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Add product</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter the basic details for your new product.
        </p>
      </div>

      <AdminProductForm
        categories={categories}
        isSubmitting={createProduct.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
