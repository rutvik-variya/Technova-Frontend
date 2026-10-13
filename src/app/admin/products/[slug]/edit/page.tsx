"use client";

import { use } from "react";
import type { ComponentProps } from "react";
import { useRouter } from "next/navigation";

import AdminProductForm from "@/components/admin/products/admin-product-form";
import { useUpdateAdminProduct } from "@/hooks/admin/products/use-update-admin-product";
import { useCategories } from "@/hooks/categories/use-categories";

import type { AdminProductFormValues } from "@/validations/admin-product.schema";
import { useAdminProductBySlug } from "@/hooks/admin/products/use-admin-product-by-slug";
import ProductImageManager from "@/components/admin/products/product-image-manager";
import ProductVariantManager from "@/components/admin/products/product-variant-manager";

interface EditAdminProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditAdminProductPage({
  params,
}: EditAdminProductPageProps) {
  const { slug } = use(params);
  const router = useRouter();

  const {
    data: productResponse,
    isPending: isProductPending,
    isError: isProductError,
    error: productError,
    refetch: refetchProduct,
  } = useAdminProductBySlug(slug);

  const {
    data: categoriesResponse,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const updateProduct = useUpdateAdminProduct();

  type AdminProduct = NonNullable<
    ComponentProps<typeof AdminProductForm>["initialProduct"]
  >;
  const adminProduct = productResponse?.data as AdminProduct | undefined;
  const categories = categoriesResponse?.data ?? [];

  const handleSubmit = (values: AdminProductFormValues) => {
    if (!adminProduct) return;

    updateProduct.mutate(
      {
        id: adminProduct.id,
        payload: values,
      },
      {
        onSuccess: () => {
          router.push("/admin/products");
        },
      },
    );
  };

  const submitError = updateProduct.isError
    ? updateProduct.error instanceof Error
      ? updateProduct.error.message
      : "Unable to update product. Please try again."
    : null;

  if (isProductPending || isCategoriesPending) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (isProductError || !adminProduct) {
    return (
      <div className="space-y-3 p-6">
        <p className="text-sm text-red-600">
          {productError instanceof Error
            ? productError.message
            : "Unable to load product."}
        </p>
        <button
          type="button"
          onClick={() => void refetchProduct()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Retry
        </button>
      </div>
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
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Edit product</h1>
        <p className="mt-2 text-sm text-gray-500">
          Update the details for {adminProduct.name}.
        </p>
      </div>

      <AdminProductForm
        key={adminProduct.id}
        initialProduct={adminProduct}
        categories={categories}
        isSubmitting={updateProduct.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />

      {adminProduct && (
        <div className="mt-8 space-y-6">
          <ProductImageManager
            productId={adminProduct.id}
            images={adminProduct.productImages ?? []}
          />

          <ProductVariantManager
            productId={adminProduct.id}
            productSlug={slug}
            variants={adminProduct.productVariants ?? []}
          />
        </div>
      )}
    </div>
  );
}
