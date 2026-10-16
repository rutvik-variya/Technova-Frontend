"use client";

import { use } from "react";
import type { ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { Boxes, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

import AdminProductForm from "@/components/admin/products/admin-product-form";
import ProductImageManager from "@/components/admin/products/product-image-manager";
import ProductVariantManager from "@/components/admin/products/product-variant-manager";

import { useUpdateAdminProduct } from "@/hooks/admin/products/use-update-admin-product";
import { useCategories } from "@/hooks/categories/use-categories";
import { useAdminProductBySlug } from "@/hooks/admin/products/use-admin-product-by-slug";

import type { AdminProductFormValues } from "@/validations/admin-product.schema";

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

  // TechNova Loading Skeleton
  if (isProductPending || isCategoriesPending) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8 animate-pulse">
        <div className="flex items-center gap-2.5 border-b border-slate-200/80 pb-6">
          <div className="h-8 w-8 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-xl bg-slate-200" />
            <div className="h-4 w-64 rounded-lg bg-slate-100" />
          </div>
        </div>

        <div className="h-96 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-8" />
        <div className="h-64 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-8" />
      </main>
    );
  }

  // Product Query Error State
  if (isProductError || !adminProduct) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Unable to Load Product
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            {productError instanceof Error
              ? productError.message
              : "We couldn't retrieve the requested product details."}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </button>

            <button
              type="button"
              onClick={() => void refetchProduct()}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Categories Error State
  if (isCategoriesError) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Failed to Load Categories
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
            {categoriesError instanceof Error
              ? categoriesError.message
              : "Unable to retrieve categories needed for editing."}
          </p>

          <button
            type="button"
            onClick={() => void refetchCategories()}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry Categories</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <Boxes className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Edit Product
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Update the specifications, media assets, and SKU options for{" "}
          <strong className="text-slate-900">{adminProduct.name}</strong>
        </p>
      </div>

      {/* Main Form Section */}
      <AdminProductForm
        key={adminProduct.id}
        initialProduct={adminProduct}
        categories={categories}
        isSubmitting={updateProduct.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
      />

      {/* Image and Variant Managers */}
      <div className="space-y-8 pt-2">
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
    </main>
  );
}
