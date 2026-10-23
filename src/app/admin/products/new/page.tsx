"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { AlertCircle, Boxes, ArrowRight } from "lucide-react";

import AdminProductForm from "@/components/admin/products/admin-product-form";
import ProductDraftAssets from "@/components/admin/products/product-draft-assets";

import { useCreateAdminProduct } from "@/hooks/admin/products/use-create-admin-product";
import { useUploadProductImages } from "@/hooks/admin/products/use-upload-product-images";
import { useCreateProductVariant } from "@/hooks/admin/products/use-create-product-variant";
import { useCategories } from "@/hooks/categories/use-categories";

import type { AdminProduct, CreateVariantPayload } from "@/types/admin-product";
import type { AdminProductFormValues } from "@/validations/admin-product.schema";
import { getApiError } from "@/lib/api-error";

export default function NewAdminProductPage() {
  const router = useRouter();

  const [createdProduct, setCreatedProduct] = useState<AdminProduct | null>(
    null,
  );
  const [images, setImages] = useState<File[]>([]);
  const [variants, setVariants] = useState<CreateVariantPayload[]>([]);
  const [creationError, setCreationError] = useState<string | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);

  const categoriesQuery = useCategories();
  const createProduct = useCreateAdminProduct();
  const uploadImages = useUploadProductImages();
  const createVariant = useCreateProductVariant();

  const categories = categoriesQuery.data?.data ?? [];

  const handleSubmit = async (values: AdminProductFormValues) => {
    if (!images.length || !variants.length) return;

    setCreationError(null);
    setIsSettingUp(true);
    let productWasCreated = false;

    try {
      const product = await createProduct.mutateAsync(values);

      if (!product?.id) {
        throw new Error(
          "Product creation succeeded, but the returned product ID is missing.",
        );
      }

      productWasCreated = true;
      setCreatedProduct(product);
      await uploadImages.mutateAsync({
        productId: product.id,
        files: images,
        showToasts: false,
      });
      for (const payload of variants) {
        await createVariant.mutateAsync({
          productId: product.id,
          payload,
          showToasts: false,
        });
      }

      toast.success("Product created with images and variants.");
      router.push("/admin/products");
    } catch (error) {
      const message = getApiError(error).message;
      const errorMessage = productWasCreated
        ? `The product was created, but its images or variants could not all be saved. ${message}`
        : message;
      setCreationError(errorMessage);
      if (!productWasCreated) toast.error(errorMessage);
    } finally {
      setIsSettingUp(false);
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

      {createdProduct && creationError ? (
        <div
          role="alert"
          className="space-y-4 rounded-3xl border border-rose-200 bg-rose-50/70 p-6"
        >
          <div className="flex items-start gap-3 text-rose-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h2 className="text-sm font-extrabold">
                Product created, but setup was incomplete
              </h2>
              <p className="mt-1 text-xs font-medium">{creationError}</p>
            </div>
          </div>
          <Link
            href={`/admin/products/${createdProduct.id}/edit`}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
          >
            Continue setup in Edit Product
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <AdminProductForm
          categories={categories}
          isSubmitting={isSettingUp || createProduct.isPending}
          onSubmit={handleSubmit}
          canSubmit={images.length > 0 && variants.length > 0}
          extraSection={
            <>
              <ProductDraftAssets
                images={images}
                onImagesChange={setImages}
                variants={variants}
                onVariantsChange={setVariants}
              />
              {creationError && (
                <p role="alert" className="text-xs font-semibold text-rose-700">
                  {creationError}
                </p>
              )}
            </>
          }
        />
      )}

      {createdProduct && !creationError && isSettingUp && (
        <p className="text-xs font-medium text-slate-500">
          Saving images and variants for {createdProduct.name}...
        </p>
      )}
    </main>
  );
}
