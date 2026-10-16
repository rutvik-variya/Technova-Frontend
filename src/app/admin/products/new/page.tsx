"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Boxes, CheckCircle2, ArrowRight } from "lucide-react";

import AdminProductForm from "@/components/admin/products/admin-product-form";
import ProductImageManager from "@/components/admin/products/product-image-manager";
import ProductVariantManager from "@/components/admin/products/product-variant-manager";

import { useCreateAdminProduct } from "@/hooks/admin/products/use-create-admin-product";
import { useCategories } from "@/hooks/categories/use-categories";

import type { AdminProduct } from "@/types/admin-product";
import type { AdminProductFormValues } from "@/validations/admin-product.schema";

export default function NewAdminProductPage() {
  const router = useRouter();

  const [createdProduct, setCreatedProduct] = useState<AdminProduct | null>(
    null,
  );

  const categoriesQuery = useCategories();
  const createProduct = useCreateAdminProduct();

  const categories = categoriesQuery.data?.data ?? [];

  const handleSubmit = async (values: AdminProductFormValues) => {
    try {
      const product = await createProduct.mutateAsync(values);

      if (!product?.id) {
        throw new Error(
          "Product creation succeeded, but the returned product ID is missing.",
        );
      }

      setCreatedProduct(product);
    } catch (error) {
      console.error("Create product failed:", error);
    }
  };

  if (categoriesQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-8 animate-pulse">
        <div className="h-8 w-48 rounded-xl bg-slate-200" />
        <div className="h-96 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-8" />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <Boxes className="h-4 w-4" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {createdProduct ? "Manage Product Assets" : "Add Product"}
          </h1>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {createdProduct
            ? `Upload media gallery and configure options for ${createdProduct.name}.`
            : "Define product core details, then add media and SKU variants."}
        </p>
      </div>

      {!createdProduct ? (
        <AdminProductForm
          categories={categories}
          isSubmitting={createProduct.isPending}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="space-y-8">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-800 shadow-xs">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <p className="text-xs font-extrabold">
                Product Created: {createdProduct.name}
              </p>
              <p className="mt-0.5 text-xs font-medium text-emerald-700">
                Next, add images and configure variants below.
              </p>
            </div>
          </div>

          <ProductImageManager
            productId={createdProduct.id}
            images={createdProduct.productImages ?? []}
          />

          <ProductVariantManager
            productId={createdProduct.id}
            productSlug={createdProduct.slug}
            variants={createdProduct.productVariants ?? []}
          />

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <span>Done — Back to Products</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
